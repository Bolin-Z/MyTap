class UIMODULE {
    constructor(GLOBAL){
        class PageElement {
            render;
            constructor(rendermethod) {
                this.render = rendermethod;
            }
        }

        class InteractElemnt extends PageElement {
            x; y; width; height;
            constructor(x,y,w,h,rendermethod) {
                super(rendermethod);
                this.resizeBox(x,y,w,h);
            }
            resizeBox(x,y,w,h) {
                this.x = x; this.y = y; this.width = w; this.height = h;
            }
        }

        class StartPage {
            /* Public Property */
            startButton;
            
            /* Private Property */
            #messageContainer;
            #APPname;
            #footNote;
        
            constructor() {
                this.#initPageElements();
            }
        
            /* Public Method */
            render() {
                let msgc = this.#messageContainer;
                this.#APPname.render(msgc);
                this.startButton.render(msgc);
                this.#footNote.render(msgc);
            }
    
            resizeHandler() {
                this.#messageContainer.resizeBox(
                    (GLOBAL.canvas.width - this.#messageContainer.width) / 2,
                    (GLOBAL.canvas.height - this.#messageContainer.height) / 2,
                    this.#messageContainer.width,
                    this.#messageContainer.height
                );
    
                this.startButton.resizeBox(
                    this.#messageContainer.x + (this.#messageContainer.width - this.startButton.width) / 2,
                    this.#messageContainer.y + (this.#messageContainer.height / 5) * 2,
                    this.startButton.width,
                    this.startButton.height
                );
            }
    
            /* Pravite Method */
            #initPageElements() {
        
                let containerWidth = 300;
                let containerHeight = 300;
                let containerRows = 5;
        
                this.#messageContainer = new InteractElemnt(
                    (GLOBAL.canvas.width - containerWidth) / 2,
                    (GLOBAL.canvas.height - containerHeight) / 2,
                    containerWidth,
                    containerHeight,
                    () => {}
                );
        
                this.#APPname = new PageElement(
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = 'bold 2em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,0.8)';
                        GLOBAL.renderContext.fillText(
                            "MyTap",
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 1
                        );
                        GLOBAL.renderContext.restore();
                    }
                );
        
                let startButtonWidth = 80;
                let startButtonHeight = 22;
                let startButtonX = this.#messageContainer.x + (containerWidth - startButtonWidth) / 2;
                let startButtonY = this.#messageContainer.y + (containerHeight / containerRows) * 2;
                this.startButton = new InteractElemnt(
                    startButtonX,
                    startButtonY,
                    startButtonWidth,
                    startButtonHeight,
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = 'bold 1.6em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,0.8)';
                        GLOBAL.renderContext.fillText(
                            "start",
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 2
                        );
                        GLOBAL.renderContext.restore();
                    }
                );
        
                this.#footNote = new PageElement(
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = 'bold 1.0em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,0.8)';
                        GLOBAL.renderContext.fillText(
                            "Inspired by MikuTap",
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 3
                        );
                        GLOBAL.renderContext.restore();
                    }
                )
            }
        }

        class ControlPanelPage{
            /* Public Property */
            goBackButton;
            feedBackButton;
            backTrackButton;
    
            /* Private Property */
            #messageContainer;
            #usageMessage;
    
            constructor() {
                this.#initPageElements();
            }
    
            /* Public Method */
            render(){
                let msgc = this.#messageContainer;
                this.goBackButton.render();
                this.#usageMessage.render(msgc);
                this.feedBackButton.render(msgc);
                this.backTrackButton.render(msgc);
            }
    
            resizeHandler(){
                this.#messageContainer.resizeBox(
                    (GLOBAL.canvas.width - this.#messageContainer.width) / 2,
                    (GLOBAL.canvas.height - this.#messageContainer.height) / 2,
                    this.#messageContainer.width,
                    this.#messageContainer.height
                );
    
                this.feedBackButton.resizeBox(
                    this.#messageContainer.x + (this.#messageContainer.width - this.feedBackButton.width) / 2,
                    this.#messageContainer.y + (this.#messageContainer.height / 5) * 3,
                    this.feedBackButton.width,
                    this.feedBackButton.height
                );
    
                this.backTrackButton.resizeBox(
                    this.#messageContainer.x + (this.#messageContainer.width - this.backTrackButton.width) / 2,
                    this.#messageContainer.y + (this.#messageContainer.height / 5) * 4,
                    this.backTrackButton.width,
                    this.backTrackButton.height
                );
            }
    
            /* Pravite Method */
            #initPageElements(){
    
                let containerWidth = 400;
                let containerHeight = 300;
                let containerRows = 5;
    
                let goBackButtonBox = {
                    x : 12,
                    y : 12,
                    width : 16,
                    height : 16
                }
                this.goBackButton = new InteractElemnt(
                    goBackButtonBox.x,
                    goBackButtonBox.y,
                    goBackButtonBox.width,
                    goBackButtonBox.height,
                    () => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.strokeStyle = "rgba(255,255,255,1)";
                        GLOBAL.renderContext.lineWidth = 2;
                        GLOBAL.renderContext.lineJoin = "round";
                        GLOBAL.renderContext.beginPath();
                        GLOBAL.renderContext.moveTo(goBackButtonBox.x + goBackButtonBox.width, goBackButtonBox.y);
                        GLOBAL.renderContext.lineTo(goBackButtonBox.x, goBackButtonBox.y + (goBackButtonBox.height / 2));
                        GLOBAL.renderContext.lineTo(goBackButtonBox.x + goBackButtonBox.width, goBackButtonBox.y + goBackButtonBox.height);
                        GLOBAL.renderContext.stroke();
                        GLOBAL.renderContext.restore();
                    }
                );
    
                this.#messageContainer = new InteractElemnt(
                    (GLOBAL.canvas.width - containerWidth) / 2,
                    (GLOBAL.canvas.height - containerHeight) / 2,
                    containerWidth,
                    containerHeight,
                    () => {}
                );
    
                this.#usageMessage = new PageElement(
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = '1.2em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,1)';
                        GLOBAL.renderContext.fillText(
                            "CLICK & DRAG or PRESS ANY KEY!",
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 1
                        );
                        GLOBAL.renderContext.restore();
                    }
                )
    
                let feedBackButtonWidth = 150;
                let feedBackButtonHeight = 20;
                let feedBackButtonX = this.#messageContainer.x + (this.#messageContainer.width - feedBackButtonWidth) / 2;
                let feedBackButtonY = this.#messageContainer.y + (this.#messageContainer.height / containerRows) * 3;
                this.feedBackButton = new InteractElemnt(
                    feedBackButtonX,
                    feedBackButtonY,
                    feedBackButtonWidth,
                    feedBackButtonHeight,
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = '1.2em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,1)';
                        let text = (GLOBAL.feedBackOn) ? 
                            "FEEDBACK: ON" :
                            "FEEDBACK: OFF";
                        GLOBAL.renderContext.fillText(
                            text,
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 3
                        );
                        GLOBAL.renderContext.restore();
                    }
                );
    
                let backTrackButtonWidth = 166;
                let backTrackButtonHeight = 20;
                let backTrackButtonX = this.#messageContainer.x + (this.#messageContainer.width - backTrackButtonWidth) / 2;
                let backTrackButtonY = this.#messageContainer.y + (this.#messageContainer.height / containerRows) * 4;
                this.backTrackButton = new InteractElemnt(
                    backTrackButtonX,
                    backTrackButtonY,
                    backTrackButtonWidth,
                    backTrackButtonHeight,
                    (msgc) => {
                        GLOBAL.renderContext.save();
                        GLOBAL.renderContext.font = '1.2em "Courier New"';
                        GLOBAL.renderContext.textAlign = 'center';
                        GLOBAL.renderContext.textBaseline = 'top';
                        GLOBAL.renderContext.fillStyle = 'rgba(255,255,255,1)';
                        let text = (GLOBAL.backTrackOn) ? 
                            "BACKTRACK: ON" :
                            "BACKTRACK: OFF";
                        GLOBAL.renderContext.fillText(
                            text,
                            msgc.x + msgc.width / 2,
                            msgc.y + (msgc.height / containerRows) * 4
                        );
                        GLOBAL.renderContext.restore();
                    }
                )
            }
        }

        class EmptyPage {
            constructor(){}
            render(){}
            resizeHandler(){}
        }

        class UILayer{
            /* Public Property */
            startButton;
            goBackButton;
            feedBackButton;
            backTrackButton;
    
            /* Pravite Property */
            #currentUIPage;
            #pages;
        
            constructor(){
                this.#pages = {
                    StartPage        : new StartPage(),
                    ControlPanelPage : new ControlPanelPage(),
                    EmptyPage        : new EmptyPage()
                };
    
                this.swapPage("StartPage");
    
                this.startButton = this.#pages.StartPage.startButton;
                this.goBackButton = this.#pages.ControlPanelPage.goBackButton;
                this.feedBackButton = this.#pages.ControlPanelPage.feedBackButton;
                this.backTrackButton = this.#pages.ControlPanelPage.backTrackButton;

                this.windowResizeHandler();
            }
        
            /* Public Method */
            currentPage(){
                return this.#currentUIPage;
            }
        
            swapPage(Page){
                if(this.#pages.hasOwnProperty(Page)){
                    this.#currentUIPage = Page;
                }
            }
            
            windowResizeHandler(){
                for(let i in this.#pages){
                    this.#pages[i].resizeHandler();
                }
            }
    
            process(){
                this.#render();
            }
        
            /* Pravite Method */
            #render(){
                this.#pages[this.#currentUIPage].render();
            }
        }

        this.UI = UILayer;
    }
}