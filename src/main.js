document.addEventListener('DOMContentLoaded',function(){
    var backGroundLayer = new BACKGROUD.BackGround();
    var interactLayer = new INTERACT.InteractLayer();
    var UILayer = new UI.UILayer();

    main();

    function main(){
        requestAnimationFrame(main);
        backGroundLayer.process();
        interactLayer.process();
        UILayer.process();
    }

},false);