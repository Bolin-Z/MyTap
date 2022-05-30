class GLOBALMODULE {
    constructor(isGitHubPage){
        /* Global Variable */
        this.canvas = document.getElementById('canvas');
        this.renderContext = this.canvas.getContext('2d');
        this.FPS = 60;
        this.backTrackURL = (isGitHubPage) ?
            " " :
            "../sounds/backtrack.mp3" ;
        this.backTrackOn = false;
        this.feedBackURLs = (isGitHubPage) ? [

        ] : [
            "../sounds/feedback.mp3",
            "../sounds/shoot.mp3",
            "../sounds/explosion.mp3"
        ] ;
        this.feedBackOn = false;
    }
}