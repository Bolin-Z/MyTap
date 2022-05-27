document.addEventListener('DOMContentLoaded',function(){
    
    const GLOBAL = new GLOBALMODULE(true);
    const loadBACKGROUNDMODULE = new BACKGROUDMODULE(
        GLOBAL.canvas,
        GLOBAL.renderContext,
        GLOBAL.FPS
    );
    const loadINTERACTMODULE = new INTERACTMODULE(
        GLOBAL.canvas,
        GLOBAL.renderContext,
        GLOBAL.FPS
    );
    const loadUIMODULE = new UIMODULE(
        GLOBAL.canvas,
        GLOBAL.renderContext,
        GLOBAL.feedBackOn,
        GLOBAL.backTrackOn
    );
            
    const BackGroundLayer = new loadBACKGROUNDMODULE.BackGround();
    const InteractLayer = new loadINTERACTMODULE.Interact();
    const UILayer = new loadUIMODULE.UI();


    window.addEventListener('resize',function(){
        BackGroundLayer.windowResizeHandler();
        InteractLayer.windowResizeHandler();
        UILayer.windowResizeHandler();
    },false);

    main();

    function main(){
        requestAnimationFrame(main);
        BackGroundLayer.process();
        InteractLayer.process();
        UILayer.process();
    }

},false);