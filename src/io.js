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
                    mouseActive : false,
                    keyBoardActive : false,
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
                                BLOCKS[this.#lastHitBlock].mouseActive = true;
                            }
                            break;
                        }
                        case "EmptyPage" : {
                            this.hit = HIT['BLOCK'];
                            this.#lastHitBlock = this.#hitBlockID();
                            BLOCKS[this.#lastHitBlock].mouseActive = true;
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
                        BLOCKS[this.#lastHitBlock].mouseActive = true;
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
            #keyBoard;
            constructor() {
                class key {
                    isPressed; mapBlockID; 
                    constructor(id) {
                        this.isPressed = false;
                        this.mapBlockID = id;
                    }
                } 

                this.#keyBoard = {
                    KeyQ : new key(0), KeyW : new key(1), KeyE : new key(2), KeyR : new key(3), 
                    KeyT : new key(4), KeyY : new key(5), KeyU : new key(6), KeyI : new key(7),
                    KeyO : new key(8), KeyP : new key(9), BracketLeft : new key(10),

                    KeyA : new key(11), KeyS : new key(12), KeyD : new key(13), KeyF : new key(14),
                    KeyG : new key(15), KeyH : new key(16), KeyJ : new key(17), KeyK : new key(18),
                    KeyL : new key(19), Semicolon : new key(20), Quote : new key(21),

                    KeyZ : new key(22), KeyX : new key(23), KeyC : new key(24), KeyV : new key(25),
                    KeyB : new key(26), KeyN : new key(27), KeyM : new key(28), Comma : new key(29),
                    Period : new key(30), Slash : new key(31)
                }
            }

            keyDownHandler(event, UILayer) {
                if((UILayer.currentPage() === 'ControlPanelPage') || (UILayer.currentPage() === 'EmptyPage')){
                    if(this.#keyBoard.hasOwnProperty(event.code)){
                        if(!this.#keyBoard[event.code].isPressed){
                            this.#keyBoard[event.code].isPressed = true;
                            BLOCKS[this.#keyBoard[event.code].mapBlockID].keyBoardActive = true;
                        }
                    }
                }
            }

            keyUpHandler(event) {
                if(this.#keyBoard.hasOwnProperty(event.code)){
                    this.#keyBoard[event.code].isPressed = false;
                }
            }
        }

        class UserIo {
            Mouse;
            KeyBoard;
            #activeCount;
            constructor(){
                this.Mouse = new Mouse();
                this.KeyBoard = new KeyBoard();
                this.#activeCount = 0;
            }

            process(UILayer, InteractLayer, ShapesLayer, BackGroundLayer){
                this.Mouse.process(UILayer);
                let hasActive = false;

                BLOCKS.forEach((element,index)=>{
                    if(element.mouseActive || element.keyBoardActive){
                        hasActive = true;
                        if(element.mouseActive){
                            InteractLayer.active(index);
                        }
                        ShapesLayer.active(index);
                        this.#activeCount++;
                        if(this.#activeCount === 30){
                            BackGroundLayer.switchBackGround();
                            this.#activeCount = 0;
                        }
                        element.mouseActive = false;
                        element.keyBoardActive = false;
                    }
                });

                if((!hasActive) && (UILayer.currentPage() === 'EmptyPage') && (!InteractLayer.hasActive()) && (!ShapesLayer.hasActive())) {
                    UILayer.swapPage('ControlPanelPage');
                } else if((hasActive) && (UILayer.currentPage() === 'ControlPanelPage')) {
                    UILayer.swapPage('EmptyPage');
                }
            }
        }

        this.UserIo = UserIo;
    }
}