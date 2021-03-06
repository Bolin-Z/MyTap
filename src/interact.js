class INTERACTMODULE {
    constructor(GLOBAL){
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
                this.#counter = GLOBAL.FPS;
            }
    
            isActive(){
                return (this.#counter !== 0);
            }
    
            render(){
                if(this.#counter !== 0){
                    let opacity = Math.pow((this.#counter / GLOBAL.FPS),3) * 0.8;
                    GLOBAL.renderContext.save();
                    GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,' + opacity + ')';
                    GLOBAL.renderContext.fillRect(this.#x,this.#y,this.#width,this.#height);
                    GLOBAL.renderContext.restore();
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
                let blockWidth = GLOBAL.canvas.width / this.#numberOfColumn;
                let blockHeight = GLOBAL.canvas.height / this.#numberOfRow;
                for(let y = 0;y < GLOBAL.canvas.height;y += blockHeight){
                    for(let x = 0;x < GLOBAL.canvas.width;x += blockWidth){
                        this.#blocks.push(new Block(x, y, blockWidth, blockHeight));
                    }
                }
                this.windowResizeHandler();
            }
            /* Public Method */
            windowResizeHandler(){
                let blockWidth = GLOBAL.canvas.width / this.#numberOfColumn;
                let blockHeight = GLOBAL.canvas.height / this.#numberOfRow;
                let i = 0;
                for(let y = 0;y < GLOBAL.canvas.height;y += blockHeight){
                    for(let x = 0;x < GLOBAL.canvas.width;x += blockWidth){
                        this.#blocks[i].resizeBlock(x, y, blockWidth, blockHeight);
                        i++;
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

        this.Interact = InteractLayer;
    }
}