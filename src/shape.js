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
            /* Public Property */
            /* Private Property */
            #circle; #activeAnimation = [];
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
                        if(this.#counter >= 0){
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
            /* Public Method */
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
            /* Private Method */
        }

        class Shapes {
            /* Public Property */
            /* Private Property */
            #shapeAnimation = [];
            constructor(){
                this.#shapeAnimation.push(new randomCircles());
            }
            /* Public Method */
            active(){
                this.#shapeAnimation[0].active();
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