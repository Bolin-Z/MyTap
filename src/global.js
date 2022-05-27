class GLOBALMODULE {
    constructor(isGitHubPage){
        /* Global Variable */
        this.canvas = document.getElementById('canvas');
        this.renderContext = this.canvas.getContext('2d');
        this.FPS = 60;
        this.backTrackURL = (isGitHubPage) ?
            " " :
            " " ;
        this.backTrackOn = false;
        this.feedBackURLs = (isGitHubPage) ? [

        ] : {

        } ;
        this.feedBackOn = false;
    }
}