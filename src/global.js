class GLOBALMODULE {
    constructor(isGitHubPage){
        /* Global Variable */
        this.canvas = document.getElementById('canvas');
        this.renderContext = this.canvas.getContext('2d');
        this.FPS = 60;
        this.backTrackURL = (isGitHubPage) ?
            "https://github.com/Bolin-Z/MyTap/blob/master/sounds/backtrack.mp3?raw=true" :
            "../sounds/backtrack.mp3" ;
        this.backTrackOn = false;
        this.feedBackURLs = (isGitHubPage) ? [
            "https://github.com/Bolin-Z/MyTap/blob/master/sounds/feedback.mp3?raw=true",
            "https://github.com/Bolin-Z/MyTap/blob/master/sounds/shoot.mp3?raw=true",
            "https://github.com/Bolin-Z/MyTap/blob/master/sounds/explosion.mp3?raw=true"
        ] : [
            "../sounds/feedback.mp3",
            "../sounds/shoot.mp3",
            "../sounds/explosion.mp3"
        ] ;
        this.feedBackOn = false;
    }
}