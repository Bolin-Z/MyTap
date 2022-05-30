class BACKGROUNDMODULE {
    constructor(GLOBAL){
        /* const value */
        const COLORPOOL = [
            "#8EE5EE","#40E0D0","#1E90FF","#FFC1C1",
            "#D02090","#B0E2FF","#FFA500"
        ];

        const DIRECTION = [
            "u2d", "d2u", "l2r", "r2l"
        ];

        const LINETYPE = [
            "straight", "curve"
        ]

        /* auxiliary function */
        function randomInRange(l,r){
            return (r > l) ? l + Math.floor(Math.random() * (r - l)) : undefined;
        }

        function setInRange(x,l,r){
            if(x < l) x = l;
            if(x > r) x = r;
            return (l <= r) ? x : undefined;
        }

        /* x,y in [0,100] */
        class point {
            #x; #y; #vx; #vy; #lastx; #lasty; #moving;
            constructor(x,y,vx,vy){
                this.#x = x; this.#y = y; this.#vx = vx; this.#vy = vy; this.#moving = true;
            }

            moving(){
                if(this.#moving){
                    this.#lastx = this.#x;
                    this.#lasty = this.#y;

                    this.#x = setInRange(this.#x + this.#vx,0,100);
                    this.#y = setInRange(this.#y + this.#vy,0,100);

                    if((this.#lastx === this.#x) && (this.#lasty === this.#y)){
                        this.#moving = false;
                    }
                }
                return this.#moving;
            }

            getX(){
                return Math.round((this.#x / 100) * GLOBAL.canvas.width);
            }

            getY(){
                return Math.round((this.#y / 100) * GLOBAL.canvas.height);
            }
        }

        class background {
            /* Public Property */
            /* Private Property */
            #color;
            #points = [];
            #freeze;
            #line;

            constructor(color){
                this.#color = color;
                this.#freeze = true;
                this.#line = "straight";
            }

            /* Public Method */
            getColor(){ return this.#color;}

            isFreeze(){ return this.#freeze;}

            switching(newColor){
                if(this.#freeze){
                    this.#color = newColor;
                    this.#freeze = false;
                    this.#points.splice(0,this.#points.length);

                    this.#line = LINETYPE[randomInRange(0,LINETYPE.length)];
                    let dir = DIRECTION[randomInRange(0,DIRECTION.length)];
                    let randomPointsnumber = (this.#line === "straight") ? randomInRange(0,3) : 2;
                    let randomPoints = [];

                    switch(dir){
                        case "u2d" : {
                            let maxDistance = 0;
                            
                            for(let i = -1;i < randomPointsnumber + 1;i++){
                                let x = (i === -1) ? 0 : ((i === randomPointsnumber) ? 100 : randomInRange(1,100));
                                let y = randomInRange(1,100);
                                let distance = 100 - y;
                                maxDistance = (distance > maxDistance) ? distance : maxDistance;
                                randomPoints.push({x,y,distance});
                            }

                            randomPoints.sort((a,b)=>{
                                return a.x - b.x;
                            });
                            
                            /* fixed points */
                            this.#points.push(new point(100,0,0,0));
                            this.#points.push(new point(0, 0, 0, 0));

                            let maxVy = Math.ceil(maxDistance / GLOBAL.FPS);
                            let vx = 0;
                            let vy;
                            randomPoints.forEach((e)=>{
                                vy = randomInRange(Math.ceil((e.distance) / GLOBAL.FPS), maxVy + 1);
                                this.#points.push(new point(e.x,e.y,vx,vy));
                            });

                            break;
                        }
                        case "d2u" : {
                            let maxDistance = 0;

                            for(let i = -1;i < randomPointsnumber + 1;i++){
                                let x = (i === -1) ? 100 : ((i === randomPointsnumber) ? 0 : randomInRange(1,100));
                                let y = randomInRange(1,100);
                                let distance = y;
                                maxDistance = (distance > maxDistance) ? distance : maxDistance;
                                randomPoints.push({x,y,distance});
                            }

                            randomPoints.sort((a,b)=>{
                                return b.x - a.x;
                            });

                            /* fixed points */
                            this.#points.push(new point(0, 100, 0, 0));
                            this.#points.push(new point(100, 100, 0, 0));

                            let maxVy = Math.ceil(maxDistance / GLOBAL.FPS);
                            let vx = 0;
                            let vy;
                            randomPoints.forEach((e)=>{
                                vy = randomInRange(Math.ceil((e.distance) / GLOBAL.FPS),maxVy + 1);
                                this.#points.push(new point(e.x,e.y,vx,(-vy)));
                            });

                            break;
                        }
                        case "l2r" : {
                            let maxDistance = 0;

                            for(let i = -1;i < randomPointsnumber + 1;i++){
                                let y = (i === -1) ? 100 : ((i === randomPointsnumber) ? 0 : randomInRange(1,100));
                                let x = randomInRange(1,100);
                                let distance = 100 - x;
                                maxDistance = (distance > maxDistance) ? distance : maxDistance;
                                randomPoints.push({x,y,distance});
                            }

                            randomPoints.sort((a,b)=>{
                                return b.y - a.y;
                            });

                            /* fixed points */
                            this.#points.push(new point(0,0,0,0));
                            this.#points.push(new point(0,100,0,0));

                            let maxVx = Math.ceil(maxDistance / GLOBAL.FPS);
                            let vy = 0;
                            let vx;
                            randomPoints.forEach((e)=>{
                                vx = randomInRange(Math.ceil((e.distance) / GLOBAL.FPS),maxVx + 1);
                                this.#points.push(new point(e.x,e.y,vx,vy));
                            });

                            break;
                        }
                        case "r2l" : {
                            let maxDistance = 0;

                            for(let i = -1;i < randomPointsnumber + 1;i++){
                                let y = (i === -1) ? 0 : ((i === randomPointsnumber) ? 100 : randomInRange(1,100));
                                let x = randomInRange(1,100);
                                let distance = x;
                                maxDistance = (distance > maxDistance) ? distance : maxDistance;
                                randomPoints.push({x,y,distance});
                            }

                            randomPoints.sort((a,b)=>{
                               return  a.y - b.y;
                            });

                            /* fixed points */
                            this.#points.push(new point(100,100,0,0));
                            this.#points.push(new point(100,0,0,0));

                            let maxVx = Math.ceil(maxDistance / GLOBAL.FPS);
                            let vy = 0;
                            let vx;
                            randomPoints.forEach((e)=>{
                                vx = randomInRange(Math.ceil((e.distance) / GLOBAL.FPS),maxVx + 1);
                                this.#points.push(new point(e.x,e.y,(-vx),vy));
                            });

                            break;
                        }
                    }
                }
            }

            process(){
                if(!this.#freeze){
                    this.#freeze = true;
                    this.#points.forEach((e)=>{
                        if(e.moving()){
                            this.#freeze = false;
                        }
                    })
                }
                this.#render();
                return this.#freeze;
            }

            /* Private Method */
            #render(){
                GLOBAL.renderContext.save();
                GLOBAL.renderContext.fillStyle = this.#color;  
                if(this.#freeze){
                    GLOBAL.renderContext.fillRect(0, 0, GLOBAL.canvas.width, GLOBAL.canvas.height);
                } else {
                    GLOBAL.renderContext.beginPath();
                    GLOBAL.renderContext.moveTo(this.#points[0].getX(), this.#points[0].getY());
                    if(this.#line === "straight"){
                        for(let i = 1;i < this.#points.length;i++){
                            GLOBAL.renderContext.lineTo(this.#points[i].getX(), this.#points[i].getY());
                        }
                    } else if(this.#line === "curve"){
                        GLOBAL.renderContext.lineTo(this.#points[1].getX(),this.#points[1].getY());
                        GLOBAL.renderContext.lineTo(this.#points[2].getX(),this.#points[2].getY());
                        GLOBAL.renderContext.bezierCurveTo(
                            this.#points[3].getX(), this.#points[3].getY(),
                            this.#points[4].getX(), this.#points[4].getY(),
                            this.#points[5].getX(), this.#points[5].getY()
                        );
                    }
                    GLOBAL.renderContext.fill();
                }
                GLOBAL.renderContext.restore();
            }
        }

        class BackGround {
            /* Public Property */
            /* Private Property */
            #currentBackGround;
            #nextBackGround;
            #switchBackGround;
            #finishSwitching;
            #backGrounds = [];
            
            constructor(){
                let initColor = COLORPOOL[randomInRange(0,COLORPOOL.length)];
                this.#backGrounds.push(new background(initColor));
                this.#backGrounds.push(new background(initColor));
                this.#currentBackGround = 0;
                this.#nextBackGround = 1;
                this.#switchBackGround = false;
                this.#finishSwitching = true;
                this.windowResizeHandler();
            }

            /* Public Method */
            process(){
                GLOBAL.renderContext.clearRect(0,0,GLOBAL.canvas.width,GLOBAL.canvas.height);

                if(this.#switchBackGround && this.#finishSwitching){
                    let oldColor = this.#backGrounds[this.#currentBackGround].getColor();
                    let newColor = oldColor;
                    while(newColor === oldColor){
                        newColor = COLORPOOL[randomInRange(0,COLORPOOL.length)];
                    }
                    this.#backGrounds[this.#nextBackGround].switching(newColor);
                    this.#finishSwitching = false;
                    this.#switchBackGround = false;
                }
                
                this.#backGrounds[this.#currentBackGround].process();

                if(!this.#backGrounds[this.#nextBackGround].isFreeze()){
                    if(this.#backGrounds[this.#nextBackGround].process()){
                        this.#finishSwitching = true;
                        let t = this.#currentBackGround;
                        this.#currentBackGround = this.#nextBackGround;
                        this.#nextBackGround = t;
                    }
                }
            }

            switchBackGround(){
                this.#switchBackGround = true;
            }

            windowResizeHandler(){
                GLOBAL.canvas.height = window.innerHeight;
                GLOBAL.canvas.width = window.innerWidth;
            }

            /* Private Method */
        }

        this.BackGround = BackGround;
    }
}