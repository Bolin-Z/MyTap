const GLOBAL = (function(){
    /* Global Variable */
    let isGitHubPage = true;
    let canvas = document.getElementById('myCanvas');
    let renderContext = canvas.getContext('2d');
    return {
        FPS : 60,
        canvas : canvas,
        renderContext : renderContext,
        backTrackURL : (isGitHubPage) ?
            " " :
            " " ,
        backTrackOn : false,
        feedBackURLs : (isGitHubPage) ? [

        ] : [

        ],
        feedBackOn : false
    };
})();