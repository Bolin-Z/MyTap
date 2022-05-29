class SHAPEMODULE {
    constructor(canvas, ctx, FPS) {
        /* const value */
        const DIRECTION = [
            'l2r', 'r2l', 'u2d', 'd2u'
        ];

        /* auxiliary function */
        function randomInRange(l,r) {
            return (r > l) ? l + Math.floor(Math.random() * (r - l)) : undefined;
        }

        function randomColor(alpha) {
            return 'rgba(' + randomInRange(0,256) + ',' + randomInRange(0,256) + ',' + randomInRange(0,256) + ',' + alpha + ')' ;
        }

        function setInRange(x,l,r){
            if(x < l) x = l;
            if(x > r) x = r;
            return (l <= r) ? x : undefined;
        }

        class AnimationInterface {
            #basicAnimation;
            #activeAnimation = [];
            constructor(basicAnimation){
                this.#basicAnimation = basicAnimation;
            }
            active(){
                this.#activeAnimation.push(new this.#basicAnimation());
            }
        
            process(){
                if(this.#activeAnimation.length !== 0){
                    this.#activeAnimation.forEach((basicAnimation)=>{
                        basicAnimation.process();
                    });
                    for(let i = this.#activeAnimation.length;i > 0;i--){
                        if(this.#activeAnimation[0].isFinish()){
                            this.#activeAnimation.shift();
                        }
                    }
                }
            }
        }

        class BasicAnimationInterface {
            ElementaryAnimationClass;
            ElementaryAnimationContainer = [];
            #finish;
            constructor(){this.#finish = false;}
            process(){
                this.#finish = true;
                this.ElementaryAnimationContainer.forEach((e)=>{
                    e.process();
                    if(!e.isFinish()){
                        this.#finish = false;
                    }
                });
            }
            isFinish(){ return this.#finish;}
            defineElementaryAnimation(){console.log('ElementaryAnimationClass is not defined');}
        }

        class ElementaryAnimationInterface {
            constructor(){}
            process(){console.log('Method process is not defined!');}
            isFinish(){console.log('Method isFinish is not defined!');}
            render(){console.log('Method rendor is not defined');}
        }

        /* Definition of Interact Animation */

        class RandomCircle extends BasicAnimationInterface {
            constructor() {
                super();
                this.defineElementaryAnimation();

                /* Generate Animation */
                let circleNumber = randomInRange(5,16);
                for(let i = 0;i < circleNumber;i++) {
                    this.ElementaryAnimationContainer.push(new this.ElementaryAnimationClass());
                }
            }

            defineElementaryAnimation() {
                this.ElementaryAnimationClass = class extends ElementaryAnimationInterface {
                    #counter; #cx; #cy; #rmax; #r; #spanvr; #shrinkvr; #color;
                    constructor() {
                        super();

                        this.#counter = FPS;
                        this.#cx = Math.round((randomInRange(10,91) / 100) * canvas.width);
                        this.#cy = Math.round((randomInRange(10,91) / 100) * canvas.height);
                        this.#rmax = Math.round((randomInRange(5,11) / 100) * Math.min(canvas.width, canvas.height));
                        this.#r = randomInRange(0,this.#rmax);
                        this.#color = randomColor(1);
                        this.#spanvr = Math.ceil((this.#rmax - this.#r) / (FPS / 4));
                        this.#shrinkvr = Math.ceil((this.#rmax) / (FPS / 4));
                    }

                    process() {
                        if(this.#counter > 0) {
                            if(this.#counter >= ((FPS * 3) / 4)) {
                                this.#r += this.#spanvr;
                                this.#r = (this.#r > this.#rmax) ? this.#rmax : this.#r;
                            } else if(this.#counter <= ((FPS) / 4)) {
                                this.#r -= this.#shrinkvr;
                                this.#r = (this.#r < 0) ? 0 : this.#r;
                            }
                            this.#counter--;
                            this.render();
                        }
                    }
                    isFinish() { return (this.#counter === 0); }

                    render() {
                        ctx.save();
                        ctx.fillStyle = this.#color;
                        ctx.beginPath();
                        ctx.arc(this.#cx,this.#cy,this.#r,0,Math.PI * 2,true);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        }

        class MiddleCircle extends BasicAnimationInterface {
            constructor() {
                super();
                this.defineElementaryAnimation();

                /* Generate Animation */
                this.ElementaryAnimationContainer.push(new this.ElementaryAnimationClass());
            }

            defineElementaryAnimation() {
                this.ElementaryAnimationClass = class extends ElementaryAnimationInterface {
                    #counter; #cx; #cy; #r; #color; #v; #initAngle; #curAngle; #anticlockwise;
                    constructor() {
                        super();
                        
                        this.#counter = FPS;
                        this.#cx = Math.round(canvas.width / 2);
                        this.#cy = Math.round(canvas.height / 2);
                        this.#r = Math.round((randomInRange(10,36) / 100) * Math.min(canvas.width,canvas.height));

                        this.#color = randomColor(1);
                        this.#anticlockwise = (randomInRange(0,2) === 0);

                        this.#initAngle = randomInRange(0,360) * (Math.PI / 180);
                        this.#curAngle = randomInRange(0,360);
                        this.#v = ((360 - this.#curAngle) / (FPS/2)) * (Math.PI / 180);
                        this.#curAngle = this.#curAngle * (Math.PI / 180);
                    }

                    process() {
                        if(this.#counter > 0){
                            this.#curAngle += this.#v;
                            if(this.#curAngle > 2 * Math.PI){
                                this.#curAngle = 2 * Math.PI;
                            }
                            this.#counter--;
                            this.render();
                        }
                    }

                    isFinish() { return (this.#counter === 0); }

                    render() {
                        ctx.save();
                        ctx.fillStyle = this.#color;
                        ctx.beginPath();
                        if(this.#curAngle === 2 * Math.PI) {
                            ctx.arc(this.#cx,this.#cy,this.#r,0,this.#curAngle,true);
                        } else {
                            let endAngle = (this.#anticlockwise) ? (this.#initAngle - this.#curAngle) : (this.#initAngle + this.#curAngle);
                            ctx.arc(this.#cx, this.#cy, this.#r, this.#initAngle, endAngle, this.#anticlockwise);
                            ctx.lineTo(this.#cx,this.#cy);
                        }
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        }

        class Strips extends BasicAnimationInterface {
            constructor() {
                super();
                this.defineElementaryAnimation();

                /* Generate Animation */
                let containerSize = Math.round((randomInRange(20,61) / 100) * Math.min(canvas.height,canvas.width));
                let containerX = Math.round((canvas.width - containerSize) / 2);
                let containerY = Math.round((canvas.height - containerSize) / 2);

                let dir = DIRECTION[randomInRange(0,DIRECTION.length)];
                let color = randomColor(1);

                let stripsNumber = randomInRange(3,11);
                let stripsFirst = (randomInRange(0,2) === 0);
                let gapSize = (stripsFirst) ? 
                    Math.round(containerSize / (2 * stripsNumber - 1)) :
                    Math.round(containerSize / (2 * stripsNumber + 1)) ;

                switch(dir) {
                    case 'l2r' :
                    case 'r2l' : {
                        let offsetY = (stripsFirst) ? 0 : gapSize;
                        for(let i = 0;i < stripsNumber;i++){
                            this.ElementaryAnimationContainer.push(new this.ElementaryAnimationClass(
                                containerX,
                                containerY + offsetY,
                                containerSize,
                                gapSize,
                                dir,
                                color
                            ));
                            offsetY += (gapSize + gapSize);
                        }
                    } break;
                    case 'u2d' :
                    case 'd2u' : {
                        let offsetX = (stripsFirst) ? 0 : gapSize;
                        for(let i = 0;i < stripsNumber;i++){
                            this.ElementaryAnimationContainer.push(new this.ElementaryAnimationClass(
                                containerX + offsetX,
                                containerY,
                                gapSize,
                                containerSize,
                                dir,
                                color
                            ));
                            offsetX += (gapSize + gapSize);
                        }
                    } break;
                }
            }

            defineElementaryAnimation() {
                this.ElementaryAnimationClass = class extends ElementaryAnimationInterface {
                    #counter; #lx; #rx; #uy; #dy; #maxWidth; #maxHeight; #direction; #color; #v;
                    constructor(x,y,maxWidth,maxHeight,direction,color){
                        super();

                        this.#counter = FPS;
                        this.#maxWidth = maxWidth; this.#maxHeight = maxHeight;
                        this.#direction = direction; this.#color = color;

                        /* Math.ceil(100 / (FPS / 2)) = 4*/
                        this.#v = randomInRange(4, 11);
                        switch(this.#direction) {
                            case 'l2r' : {
                                this.#lx = x; this.#rx = x;
                                this.#uy = y; this.#dy = y + this.#maxHeight;
                                this.#v = Math.round((this.#v / 100) * this.#maxWidth);
                            } break;
                            case 'r2l' : {
                                this.#lx = x + this.#maxWidth; this.#rx = x + this.#maxWidth;
                                this.#uy = y; this.#dy = y + this.#maxHeight;
                                this.#v = Math.round((this.#v / 100) * this.#maxWidth);
                            } break;
                            case 'u2d' : {
                                this.#lx = x; this.#rx = x + this.#maxWidth;
                                this.#uy = y; this.#dy = y;
                                this.#v = Math.round((this.#v / 100) * this.#maxHeight);
                            } break;
                            case 'd2u' : {
                                this.#lx = x; this.#rx = x + this.#maxWidth;
                                this.#uy = y + this.#maxHeight; this.#dy = y + this.#maxHeight;
                                this.#v = Math.round((this.#v / 100) * this.#maxHeight);
                            } break;
                        }
                    }

                    process() {
                        if(this.#counter > 0){
                            switch(this.#direction){
                                case 'l2r' : {
                                    if(this.#counter > (FPS / 2)) {
                                        this.#rx = setInRange(this.#rx + this.#v, this.#rx, this.#lx + this.#maxWidth);
                                    } else {
                                        this.#lx = setInRange(this.#lx + this.#v, this.#lx, this.#rx);
                                    }
                                } break;
                                case 'r2l' : {
                                    if(this.#counter > (FPS / 2)) {
                                        this.#lx = setInRange(this.#lx - this.#v, this.#rx - this.#maxWidth, this.#lx);
                                    } else {
                                        this.#rx = setInRange(this.#rx - this.#v, this.#lx, this.#rx);
                                    }
                                } break;
                                case 'u2d' : {
                                    if(this.#counter > (FPS / 2)) {
                                        this.#dy = setInRange(this.#dy + this.#v, this.#dy, this.#uy + this.#maxHeight);
                                    } else {
                                        this.#uy = setInRange(this.#uy + this.#v, this.#uy, this.#dy);
                                    }
                                } break;
                                case 'd2u' : {
                                    if(this.#counter > (FPS / 2)) {
                                        this.#uy = setInRange(this.#uy - this.#v, this.#dy - this.#maxHeight, this.#uy);
                                    } else {
                                        this.#dy = setInRange(this.#dy - this.#v, this.#uy, this.#dy);
                                    }
                                } break;
                            }
                            this.#counter--;
                            this.render();
                        }
                    }

                    isFinish() { return (this.#counter === 0);}

                    render() {
                        ctx.save();
                        ctx.fillStyle = this.#color;
                        ctx.beginPath()
                        ctx.moveTo(this.#lx,this.#uy);
                        ctx.lineTo(this.#rx,this.#uy);
                        ctx.lineTo(this.#rx,this.#dy);
                        ctx.lineTo(this.#lx,this.#dy);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }
        }

        class SpinSquare extends BasicAnimationInterface {
            constructor() {
                super();
                this.defineElementaryAnimation();

                /* Generate Animation */
                this.ElementaryAnimationContainer.push(new this.ElementaryAnimationClass());
            }

            defineElementaryAnimation() {
                this.ElementaryAnimationClass = class extends ElementaryAnimationInterface {
                    #counter; #cx; #cy; #curSize; #maxSize; #sizeSpeed; #curAngle; #angleSpeed; #clockWise; #color; #lineWidth;
                    constructor() {
                        super();

                        this.#counter = FPS;
                        this.#cx = canvas.width / 2;
                        this.#cy = canvas.height / 2;

                        this.#color = randomColor(0.6);
                        this.#lineWidth = randomInRange(10,26);

                        this.#curSize = Math.round((randomInRange(1,21) / 100) * Math.min(canvas.width, canvas.height));
                        this.#maxSize = Math.round((randomInRange(60,121) / 100) * Math.min(canvas.width, canvas.height));
                        this.#sizeSpeed = Math.round((this.#maxSize - this.#curSize) / FPS);

                        this.#curAngle = 0;
                        this.#angleSpeed = (randomInRange(1,9) * Math.PI / 2) / FPS;
                        this.#clockWise = (randomInRange(0,2) === 0);
                    }

                    process() {
                        if(this.#counter > 0) {
                            this.#curSize += this.#sizeSpeed;
                            this.#curAngle = (this.#clockWise) ? (this.#curAngle + this.#angleSpeed) : (this.#curAngle - this.#angleSpeed);
                            this.#counter--;
                            this.render();
                        }
                    }

                    isFinish() { return (this.#counter === 0);}

                    render() {
                        ctx.save();
                        ctx.strokeStyle = this.#color;
                        ctx.lineWidth = this.#lineWidth;
                        ctx.translate(this.#cx,this.#cy);
                        ctx.rotate(this.#curAngle);
                        ctx.beginPath();
                        let t = this.#curSize / 2;
                        ctx.moveTo(-t,t);
                        ctx.lineTo(t,t);
                        ctx.lineTo(t,-t);
                        ctx.lineTo(-t,-t);
                        ctx.closePath();
                        ctx.stroke();
                        ctx.restore();
                    }
                }
            }
        }

        class Shapes {
            #shapeAnimation = [];
            constructor(){
                this.#shapeAnimation.push(new AnimationInterface(RandomCircle));
                this.#shapeAnimation.push(new AnimationInterface(MiddleCircle));
                this.#shapeAnimation.push(new AnimationInterface(Strips));
                this.#shapeAnimation.push(new AnimationInterface(SpinSquare));
            }

            active(){
                let s = randomInRange(0,this.#shapeAnimation.length);
                this.#shapeAnimation[s].active();
            }

            process(){
                this.#shapeAnimation.forEach((e)=>{
                    e.process();
                });
            }
        }

        this.Shapes = Shapes;
    }
}