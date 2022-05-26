const GLOBAL = (function(){
    /* Global Variable */
    let isGitHubPage = true;
    const canvas = document.getElementById('myCanvas');
    const renderContext = canvas.getContext('2d');
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