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
    /* Pravite Method */
    #initPageElements() {

        let containerWidth = 300;
        let containerHeight = 300;
        let containerRows = 5;

        this.#messageContainer = new InteractElemnt(
            GLOBAL.canvas.width/2 - containerWidth/2,
            GLOBAL.canvas.height/2 - containerHeight/2,
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
                    msgc.x + msgc.w / 2,
                    msgc.y + (msgc.h / 5) * 1
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
                    msgc.x + msgc.w / 2,
                    msgc.y + (msgc.h / 5) * 2
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
                    msgc.x + msgc.w / 2,
                    msgc.y + (msgc.h / 5) * 3
                );
                GLOBAL.renderContext.restore();
            }
        )
    }
}


class UILayer{
    /* Public Property */
    
    /* Pravite Property */
    #currentUIPage;
    #pages;

    constructor(){
        this.#currentUIPage = "StartPage";
        this.#pages = {};
        this.#initPages();
    }

    /* Public Method */
    currentPage(){
        return this.#currentUIPage;
    }

    swapPage(Page){
        this.#currentUIPage = Page;
    }

    render(){

    }

    windowResizeHandler(){

    }

    /* Pravite Method */
    #initPages(){
        
        this.#pages["StartPage"] = new StartPage();
    }

}