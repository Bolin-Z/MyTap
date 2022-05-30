document.addEventListener('DOMContentLoaded',function(){
    
    const GLOBAL = new GLOBALMODULE(true);
    const loadBACKGROUNDMODULE = new BACKGROUNDMODULE(GLOBAL);
    const loadSHAPEMODULE = new SHAPEMODULE(GLOBAL);
    const loadINTERACTMODULE = new INTERACTMODULE(GLOBAL);
    const loadUIMODULE = new UIMODULE(GLOBAL);
    const loadAUDIOMODULE = new AUDIOMODULE(GLOBAL);
    const loadIOMODULE = new IOMODULE(GLOBAL);
    
            
    const BackGroundLayer = new loadBACKGROUNDMODULE.BackGround();
    const ShapesLayer = new loadSHAPEMODULE.Shapes();
    const InteractLayer = new loadINTERACTMODULE.Interact();
    const UILayer = new loadUIMODULE.UI();
    const AudioLayer = new loadAUDIOMODULE.audioLayer();
    const IOLayer = new loadIOMODULE.UserIo();


    window.addEventListener('resize',function(){
        BackGroundLayer.windowResizeHandler();
        InteractLayer.windowResizeHandler();
        UILayer.windowResizeHandler();
    },false);
    
    GLOBAL.canvas.addEventListener('mousedown', (e)=>{
        IOLayer.Mouse.mouseDownHandler(e,UILayer);
    },false);

    GLOBAL.canvas.addEventListener('mousemove',(e)=>{
        IOLayer.Mouse.mouseMoveHandler(e);
    },false);

    window.addEventListener('mouseup', ()=>{
        IOLayer.Mouse.mouseUpHandler();
    },false);

    window.addEventListener('keydown',(e)=>{
        IOLayer.KeyBoard.keyDownHandler(e,UILayer);
    },false);

    window.addEventListener('keyup',(e)=>{
        IOLayer.KeyBoard.keyUpHandler(e);
    },false);

    main();

    function main(){
        requestAnimationFrame(main);
        
        IOLayer.process(UILayer,InteractLayer,ShapesLayer,BackGroundLayer,AudioLayer);

        BackGroundLayer.process();
        ShapesLayer.process();
        InteractLayer.process();
        UILayer.process();
    }

},false);