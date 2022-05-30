class IOMODULE {
    constructor(GLOBAL) {
        /* const */
        const HIT = {
            NONE : 0,
            STARTBUTTON : 1,
            GOBACKBUTTON : 2,
            FEEDBACKBUTTON : 3,
            BACKTRACKBUTTON : 4,
            BLOCK : 5
        }

        const BLOCKS = [];
        (function(){
            for(let i = 0;i < 32;i++){
                BLOCKS.push({
                    active : false
                });
            }
        })();

        class Mouse {
            x; y;
            hit;
            #lastHitBlock;
            constructor(){
                this.x = 0;
                this.y = 0;
                this.hit = HIT['NONE'];
                this.#lastHitBlock = -1;
            }

            process(UILayer) {
                if(this.hit !== HIT['NONE']){
                    switch(this.hit){
                        case HIT['STARTBUTTON'] : {
                            this.hit = HIT['NONE'];
                            GLOBAL.backTrackOn = true;
                            GLOBAL.feedBackOn = true;
                            UILayer.swapPage('ControlPanelPage');
                            break;
                        }
                        case HIT['GOBACKBUTTON'] : {
                            this.hit = HIT['NONE'];
                            GLOBAL.backTrackOn = false;
                            GLOBAL.feedBackOn = false;
                            UILayer.swapPage('StartPage');
                            break;
                        }
                        case HIT['FEEDBACKBUTTON'] : {
                            this.hit = HIT['NONE'];
                            GLOBAL.feedBackOn = !(GLOBAL.feedBackOn);
                            break;
                        }
                        case HIT['BACKTRACKBUTTON'] : {
                            this.hit = HIT['NONE'];
                            GLOBAL.backTrackOn = !(GLOBAL.backTrackOn);
                            break;
                        }
                        case HIT['BLOCK'] : {
                            if(UILayer.currentPage() !== 'EmptyPage'){
                                UILayer.swapPage('EmptyPage');

                            }
                        }
                    }
                }
            }

            mouseDownHandler(event, UILayer) {
                if(this.hit === HIT['NONE']) {
                    this.x = event.offsetX;
                    this.y = event.offsetY;
    
                    switch(UILayer.currentPage()){
                        case "StartPage" : {
                            if(this.#hitElementTest(UILayer.startButton)) {
                                this.hit = HIT['STARTBUTTON'];
                            }
                            break;
                        }
                        case "ControlPanelPage" : {
                            if(this.#hitElementTest(UILayer.goBackButton)) {
                                this.hit = HIT['GOBACKBUTTON'];
                            } else if(this.#hitElementTest(UILayer.feedBackButton)) {
                                this.hit = HIT['FEEDBACKBUTTON'];
                            } else if(this.#hitElementTest(UILayer.backTrackButton)) {
                                this.hit = HIT['BACKTRACKBUTTON'];
                            } else {
                                this.hit = HIT['BLOCK'];
                                this.#lastHitBlock = this.#hitBlockID();
                                BLOCKS[this.#lastHitBlock].active = true;
                            }
                            break;
                        }
                        case "EmptyPage" : {
                            this.hit = HIT['BLOCK'];
                            this.#lastHitBlock = this.#hitBlockID();
                            BLOCKS[this.#lastHitBlock].active = true;
                            break;
                        }
                    }
                }
            }

            mouseMoveHandler(event) {
                if(this.hit === HIT['BLOCK']) {
                    /* drag event */
                    this.x = event.offsetX;
                    this.y = event.offsetY;
                    let t = this.#hitBlockID()
                    if(t !== this.#lastHitBlock){
                        this.#lastHitBlock = t;
                        BLOCKS[this.#lastHitBlock].active = true;
                    }
                }
            }

            mouseUpHandler() {
                if(this.hit === HIT['BLOCK']){
                    /* end of drag event */
                    this.#lastHitBlock = -1;
                    this.hit = HIT['NONE'];
                }
            }

            #hitElementTest(element) {
                return ((this.x >= element.x) && (this.x < element.x + element.width)) 
                    && ((this.y >= element.y) && (this.y < element.y + element.height));
            }

            #hitBlockID() {
                let bw = GLOBAL.canvas.width / 8;
                let bh = GLOBAL.canvas.height / 4;
                let bx = Math.floor(this.x / bw);
                let by = Math.floor(this.y / bh);
                return by * 8 + bx;
            }
        }

        class KeyBoard {

        }

        class UserIo {
            Mouse;
            #KeyBoard;
            #activeCount;
            constructor(){
                this.Mouse = new Mouse();
                this.#KeyBoard = new KeyBoard();
                this.#activeCount = 0;
            }

            process(UILayer, InteractLayer, ShapesLayer, BackGroundLayer){
                this.Mouse.process(UILayer);
                let active = false;
                BLOCKS.forEach((element, index)=>{
                    if(element.active){
                        active = true;
                        element.active = false;
                        InteractLayer.active(index);
                        ShapesLayer.active(index);
                        this.#activeCount++;
                        if(this.#activeCount === 30){
                            BackGroundLayer.switchBackGround();
                            this.#activeCount = 0;
                        }
                    }
                });
                if((!active) && (UILayer.currentPage() === 'EmptyPage') && (!InteractLayer.hasActive())){
                    UILayer.swapPage('ControlPanelPage');
                }
            }
        }

        this.UserIo = UserIo;
    }
}