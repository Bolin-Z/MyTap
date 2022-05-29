class SHAPEMODULE {
    constructor(canvas, ctx, FPS){
        /* const value */
        
        /* auxiliary function */
        function randomInRange(l,r){
            return (r > l) ? l + Math.floor(Math.random() * (r - l)) : undefined;
        }

        function randomColor(){
            return 'rgb(' + randomInRange(0,256) + ',' + randomInRange(0,256) + ',' + randomInRange(0,256) + ')';
        }

        class randomCircles {
            #circle; 
            #activeAnimation = [];
            constructor(){
                this.#circle = class randomCircleAnimation{
                    #counter; #cx; #cy; #rmax; #r; #spanvr; #shrinkvr; #color;
                    constructor(){
                        this.#counter = FPS;
                        this.#cx = Math.round((randomInRange(10,91) / 100) * canvas.width);
                        this.#cy = Math.round((randomInRange(10,91) / 100) * canvas.height);
                        this.#rmax = Math.round((randomInRange(5,11) / 100) * Math.min(canvas.width, canvas.height));
                        this.#r = randomInRange(0,this.#rmax);
                        this.#color = randomColor();
                        this.#spanvr = Math.ceil((this.#rmax - this.#r) / (FPS / 4));
                        this.#shrinkvr = Math.ceil((this.#rmax) / (FPS / 4));
                    }
                    
                    process(){
                        if(this.#counter > 0){
                            if(this.#counter >= ((FPS * 3) / 4)){
                                this.#r += this.#spanvr;
                                this.#r = (this.#r > this.#rmax) ? this.#rmax : this.#r;
                            } else if(this.#counter <= ((FPS) / 4)){
                                this.#r -= this.#shrinkvr;
                                this.#r = (this.#r < 0) ? 0 : this.#r;
                            }
                            this.#counter--;
                            this.#render();
                        }
                    }

                    isFinish(){
                        return (this.#counter === 0)
                    }

                    #render(){
                        ctx.save();
                        ctx.fillStyle = this.#color;
                        ctx.beginPath();
                        ctx.arc(this.#cx,this.#cy,this.#r,0,Math.PI * 2,true);
                        ctx.fill();
                        ctx.restore();
                    }
                }
            }

            active(){
                let circleNumber = randomInRange(5,16);
                let newAnimation = [];
                for(let i = 0;i < circleNumber;i++){
                    newAnimation.push(new this.#circle());
                }
                this.#activeAnimation.push({
                    circlesAnimation : newAnimation,
                    finish : false
                });
            }

            process(){
                if(this.#activeAnimation.length !== 0){
                    this.#activeAnimation.forEach((e)=>{
                        let finish = true;
                        e.circlesAnimation.forEach((x)=>{
                            x.process();
                            if(!x.isFinish()){
                                finish = false;
                            }
                        })
                        e.finish = finish;
                    });
                    let i = this.#activeAnimation.length;
                    while(i){
                        if(this.#activeAnimation[0].finish){
                            this.#activeAnimation.shift();
                        }
                        i--;
                    }
                }
            }
        }

        class middleCircle{
            #basicAnimation; 
            #activeAnimation = [];
            constructor(){
                this.#basicAnimation = class basicMiddleCircle {''
                    #counter; #cx; #cy; #r; #color; #v; #initAngle; #curAngle; #anticlockwise;
                    constructor(){
                        this.#counter = FPS;
                        this.#cx = Math.round(canvas.width / 2);
                        this.#cy = Math.round(canvas.height / 2);
                        this.#r = Math.round((randomInRange(10,36) / 100) * Math.min(canvas.width,canvas.height));

                        this.#color = randomColor();
                        this.#anticlockwise = (randomInRange(0,2) === 0);

                        this.#initAngle = randomInRange(0,360) * (Math.PI / 180);
                        this.#curAngle = randomInRange(0,360);
                        this.#v = ((360 - this.#curAngle) / (FPS/2)) * (Math.PI / 180);
                        this.#curAngle = this.#curAngle * (Math.PI / 180);
                    }

                    process(){
                        if(this.#counter > 0){
                            this.#curAngle += this.#v;
                            if(this.#curAngle > 2 * Math.PI){
                                this.#curAngle = 2 * Math.PI;
                            }
                            this.#counter--;
                            this.#render();
                        }
                    }

                    isFinish(){
                        return (this.#counter === 0);
                    }

                    #render(){
                        ctx.save();
                        ctx.fillStyle = this.#color;
                        ctx.beginPath();
                        if(this.#curAngle === 2 * Math.PI){
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

            active(){
                this.#activeAnimation.push(new this.#basicAnimation());
            }

            process(){
                if(this.#activeAnimation.length !== 0){
                    this.#activeAnimation.forEach((e)=>{
                        e.process();
                    });
                    let i = this.#activeAnimation.length;
                    while(i){
                        if(this.#activeAnimation[0].isFinish()){
                            this.#activeAnimation.shift();
                        }
                        i--;
                    }
                }
            }
        }

        class strips{
            #basicAnimation;
            #activeAnimation = [];
            constructor(){
                this.#basicAnimation = class basicAnimation {
                    #singleStrip;
                    #finish;
                    #stripsContainer=[];
                    #direction = ['l2r', 'r2l', 'u2d', 'd2u'];
                    constructor(){
                        this.#singleStrip = class singleStrip {
                            #counter;
                            #lx; #rx; #uy; #dy; #maxWidth; #maxHeight; 
                            #direction; #color; #v;
                            constructor(x,y,maxWidth,maxHeight,direction,color){
                                this.#counter = FPS;

                                this.#maxWidth = maxWidth; this.#maxHeight = maxHeight;
                                this.#direction = direction; this.#color = color;
                                /* Math.ceil(100 / (FPS / 2)) = 4*/
                                this.#v = randomInRange(4, 11);
                                switch(this.#direction){
                                    case 'l2r' : {
                                        this.#lx = x; 
                                        this.#uy = y;
                                        this.#rx = x;
                                        this.#dy = y + this.#maxHeight;
                                        this.#v = Math.round((this.#v / 100) * this.#maxWidth);
                                        break;
                                    }
                                    case 'r2l' : {
                                        this.#lx = x + this.#maxWidth; 
                                        this.#uy = y;
                                        this.#rx = x + this.#maxWidth;
                                        this.#dy = y + this.#maxHeight;
                                        this.#v = Math.round((this.#v / 100) * this.#maxWidth);
                                        break;
                                    }
                                    case 'u2d' : {
                                        this.#lx = x; 
                                        this.#uy = y;
                                        this.#rx = x + this.#maxWidth;
                                        this.#dy = y
                                        this.#v = Math.round((this.#v / 100) * this.#maxHeight);
                                        break;
                                    }
                                    case 'd2u' : {
                                        this.#lx = x; 
                                        this.#uy = y + this.#maxHeight;
                                        this.#rx = x + this.#maxWidth;
                                        this.#dy = y + this.#maxHeight;
                                        this.#v = Math.round((this.#v / 100) * this.#maxHeight);
                                        break;
                                    }
                                }
                            }

                            process(){
                                if(this.#counter > 0){
                                    switch(this.#direction){
                                        case 'l2r' : {
                                            if(this.#counter > (FPS / 2)){
                                                this.#rx += this.#v;
                                                if((this.#rx - this.#lx) > this.#maxWidth){
                                                    this.#rx = this.#lx + this.#maxWidth;
                                                }
                                            }else{
                                                this.#lx += this.#v;
                                                if(this.#lx > this.#rx){
                                                    this.#lx = this.#rx;
                                                }
                                            }
                                            break;
                                        }
                                        case 'r2l' : {
                                            if(this.#counter > (FPS / 2)){
                                                this.#lx -= this.#v;
                                                if((this.#rx - this.#lx) > this.#maxWidth){
                                                    this.#lx = this.#rx - this.#maxWidth;
                                                }
                                            }else{
                                                this.#rx -= this.#v;
                                                if(this.#lx > this.#rx){
                                                    this.#rx = this.#lx;
                                                }
                                            }
                                            break;
                                        }
                                        case 'u2d' : {
                                            if(this.#counter > (FPS / 2)){
                                                this.#dy += this.#v;
                                                if((this.#dy - this.#uy) > this.#maxHeight){
                                                    this.#dy = this.#uy + this.#maxHeight;
                                                }
                                            }else{
                                                this.#uy += this.#v;
                                                if(this.#uy > this.#dy){
                                                    this.#uy = this.#dy;
                                                }
                                            }
                                            break;
                                        }
                                        case 'd2u' : {
                                            if(this.#counter > (FPS / 2)){
                                                this.#uy -= this.#v;
                                                if((this.#dy - this.#uy) > this.#maxHeight){
                                                    this.#uy = this.#dy - this.#maxHeight;
                                                }
                                            }else{
                                                this.#dy -= this.#v;
                                                if(this.#uy > this.#dy){
                                                    this.#dy = this.#uy
                                                }
                                            }
                                            break;
                                        }
                                    }
                                    this.#counter--;
                                    this.#render();
                                }
                            }

                            isFinish(){ return (this.#counter === 0);}

                            #render(){
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

                        this.#finish = false;

                        let containerSize = Math.round((randomInRange(20,51) / 100) * Math.min(canvas.height,canvas.width));
                        let containerX = Math.round((canvas.width - containerSize) / 2);
                        let containerY = Math.round((canvas.height - containerSize) / 2);
                        
                        let dir = this.#direction[randomInRange(0,this.#direction.length)];
                        let color = randomColor();
                        
                        let stripsNumber = randomInRange(4,11);
                        let gapSize = Math.round(containerSize / (2 * stripsNumber - 1));

                        switch(dir){
                            case 'l2r' : 
                            case 'r2l' : {
                                let offsetY = 0;
                                for(let i = 0;i < stripsNumber;i++){
                                    this.#stripsContainer.push(new this.#singleStrip(
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
                                let offsetX = 0;
                                for(let i = 0;i < stripsNumber;i++){
                                    this.#stripsContainer.push(new this.#singleStrip(
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

                    process(){
                        this.#finish = true;
                        this.#stripsContainer.forEach((e)=>{
                            e.process();
                            if(!e.isFinish()){
                                this.#finish = false;
                            }
                        });
                    }

                    isFinish(){ return this.#finish; }
                }
            }

            active(){
                this.#activeAnimation.push(new this.#basicAnimation());
            }

            process(){
                if(this.#activeAnimation.length !== 0){
                    this.#activeAnimation.forEach((e)=>{
                        e.process();
                    });
                    let i = this.#activeAnimation.length;
                    while(i){
                        if(this.#activeAnimation[0].isFinish()){
                            this.#activeAnimation.shift();
                        }
                        i--;
                    }
                }
            }
        }

        class Shapes {
            /* Public Property */
            /* Private Property */
            #shapeAnimation = [];
            constructor(){
                this.#shapeAnimation.push(new randomCircles());
                this.#shapeAnimation.push(new middleCircle());
                this.#shapeAnimation.push(new strips());
            }
            /* Public Method */
            active(){
                let s = randomInRange(0,this.#shapeAnimation.length);
                s = 2;
                this.#shapeAnimation[s].active();
            }

            process(){
                this.#shapeAnimation.forEach((e)=>{
                    e.process();
                });
            }
            /* Private Method */
        }

        this.Shapes = Shapes;
    }
}