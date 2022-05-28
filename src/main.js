document.addEventListener('DOMContentLoaded',function(){
    
    const GLOBAL = new GLOBALMODULE(true);
    const loadBACKGROUNDMODULE = new BACKGROUNDMODULE(
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

    var counter = 180;
    var activecounter = 20;
    var activeID = 0;

    main();

    function main(){
        requestAnimationFrame(main);
        UpdateLogic();
        BackGroundLayer.process();
        InteractLayer.process();
        UILayer.process();
    }

    function UpdateLogic(){
        if(counter === 0){
            BackGroundLayer.switchBackGround();
            counter = 180;
        }else{
            counter--;
        }

        if(activecounter === 0){
            InteractLayer.active(activeID);
            activeID = (activeID + 1) % 32;
            activecounter = 20;
        }else{
            activecounter--;
        }
    }

},false);