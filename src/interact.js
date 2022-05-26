const INTERACT = (function(canvas,ctx, FPS){
    class Block {
        /* Public Property */
        /* Private Property */
        #x; #y; #width; #height; #counter;
        constructor(x,y,w,h){
            this.resizeBlock(x,y,w,h);
            this.#counter = 0;
        }
        /* Public Method */
        resizeBlock(x,y,w,h){
            this.#x = x;
            this.#y = y;
            this.#width = w;
            this.#height = h;
        }

        active(){
            this.#counter = FPS;
        }

        isActive(){
            return (this.#counter !== 0);
        }

        render(){
            if(this.#counter !== 0){
                let opacity = Math.pow((this.#counter / FPS),3) * 0.8;
                ctx.save();
                ctx.fillStyle = 'rgba(255,255,255,' + opacity + ')';
                ctx.fillRect(this.#x,this.#y,this.#width,this.#height);
                ctx.restore();
                this.#counter -= 1;
            }
        }
        /* Private Method */
    }

    class InteractLayer{
        /* Public Property */
        /* Private Property */
        #numberOfColumn;
        #numberOfRow;
        #blocks = [];

        constructor(){
            this.#numberOfColumn = 8;
            this.#numberOfRow = 4;
            let blockWidth = canvas.width / this.#numberOfColumn;
            let blockHeight = canvas.height / this.#numberOfRow;
            for(let y = 0;y < canvas.height;y += blockHeight){
                for(let x = 0;x < canvas.width;x += blockWidth){
                    this.#blocks.push(new Block(x, y, blockWidth, blockHeight));
                }
            }
        }
        /* Public Method */
        windowResizeHandler(){
            let blockWidth = canvas.width / this.#numberOfColumn;
            let blockHeight = canvas.height / this.#numberOfRow;
            let i = 0;
            for(let y = 0;y < canvas.height;y += blockHeight){
                for(let x = 0;x < canvas.width;x += blockWidth){
                    this.#blocks[i].resizeBlock(x, y, blockWidth, blockHeight);
                }
            }
        }

        process(){
            this.#render();
        }

        active(id){
            this.#blocks[id].active();
        }

        isActive(id){
            return this.#blocks[id].isActive();
        }

        hasActive(){
            let hasActive = false;
            for(let i = 0;i < this.#blocks.length;i++){
                if(this.#blocks[i].isActive()){
                    hasActive = true;
                    break;
                }
            }
            return hasActive;
        }

        /* Private Method */
        #render(){
            for(let i = 0;i < this.#blocks.length;i++){
                this.#blocks[i].render();
            }
        }
    }
    return {
        InteractLayer : InteractLayer
    };
})(GLOBAL.canvas, GLOBAL.renderContext, GLOBAL.FPS);