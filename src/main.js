document.addEventListener('DOMContentLoaded',function(){
    
    const GLOBAL = new GLOBALMODULE(true);
    const loadBACKGROUNDMODULE = new BACKGROUNDMODULE(
        GLOBAL.canvas,
        GLOBAL.renderContext,
        GLOBAL.FPS
    );
    const loadSHAPEMODULE = new SHAPEMODULE(
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
    const ShapesLayer = new loadSHAPEMODULE.Shapes();
    const InteractLayer = new loadINTERACTMODULE.Interact();
    const UILayer = new loadUIMODULE.UI();


    window.addEventListener('resize',function(){
        BackGroundLayer.windowResizeHandler();
        InteractLayer.windowResizeHandler();
        UILayer.windowResizeHandler();
    },false);

    var counter = 180;
    var activecounter = 10;

    main();

    function main(){
        requestAnimationFrame(main);
        UpdateLogic();
        BackGroundLayer.process();
        ShapesLayer.process();
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
            ShapesLayer.active();
            activecounter = Math.ceil(Math.random() * GLOBAL.FPS);
        }else{
             activecounter--;
        }
    }

},false);