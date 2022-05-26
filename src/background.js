const BACKGROUD = (function(canvas, ctx, FPS){
    const COLORPOOL = [
        "#8EE5EE","#40E0D0","#1E90FF","#FFC1C1",
        "#D02090","#B0E2FF","#FFA500"
    ]

    class point{
        x; y; 
        #vx; #vy;
        #lastx; #lasty;
        #moving;
        constructor(x,y,vx,vy){
            this.x = x;
            this.y = y;
            this.#vx = vx;
            this.#vy = vy;
            this.#moving = true;
        }

        moving(){
            if(this.#moving){
                this.#lastx = this.x;
                this.#lasty = this.y;
                
                this.x += this.#vx;
                if(this.x < 0) this.x = 0;
                if(this.x > canvas.width) this.x = canvas.width;
                
                this.y += this.#vy;
                if(this.y < 0) this.y = 0;
                if(this.y > canvas.height) this.y = canvas.height;

                if((this.#lastx === this.x) && (this.#lasty === this.y)){
                    this.#moving = false;
                }
            }
            return this.#moving;
        }
    }

    class fontLayer {
        /* Public Property */
        /* Private Property */
        #color;
        #points = [];
        #finish;

        constructor(){
            this.#finish = true;
        }

        /* Public Method */
        getColor(){
            return this.#color;
        }

        generateNewFont(color){
            if(this.#finish){
                this.#color = color;
                this.#finish = false;
            }
        }

        process(){
            if(!this.#finish){
                this.#finish = true;
                for(let i = 0;i < this.#points.length;i++){
                    if(this.#points[i].moving()){
                        this.#finish = false;
                    }
                }
                if(!this.#finish){
                    this.#render();
                }
            }
            return this.#finish;
        }

        /* Private Method */
        #render(){
            if(!this.#finish){
                ctx.save();
                ctx.fillStyle = this.#color;
                ctx.beginPath();
                let curPoint = this.#points[0];
                ctx.moveTo(curPoint.x, curPoint.y);
                for(let i = 1;i < this.#points.length;i++){
                    curPoint = this.#points[i];
                    ctx.lineTo(curPoint.x,curPoint.y);
                }
                ctx.fill();
                ctx.restore();
            }
        }
    }

    class BackGround{
        /* Public Property */
        /* Private Property */
        #color;
        #fontLayer;

        constructor(){
            this.#color = COLORPOOL[0];
            this.#fontLayer = new fontLayer();
        }
        /* Public Method */
        process(){
            let newFont = true;
            if(newFont){
                let newColor = this.#color;
                while(newColor === this.#color){
                    newColor = COLORPOOL[Math.floor(Math.random() * COLORPOOL.length)];
                }
                this.#fontLayer.generateNewFont(newColor);
            }

            this.#render();
            
            let newColor = this.fontLayer.getColor();
            if(newColor !== this.#color){
                if(this.#fontLayer.process()){
                    this.#color = newColor;
                }
            }
        }

        /* Private Method */
        #render(){
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.save();
            ctx.fillStyle = this.#color;
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.restore();
        }
    }
    return {
        BackGround : BackGround
    };
})(GLOBAL.canvas, GLOBAL.renderContext, GLOBAL.FPS);