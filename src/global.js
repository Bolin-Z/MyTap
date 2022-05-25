var GLOBAL = function(){
    /* Global Variable */
    class Global{
        constructor(gitHubPage){
            this.FPS = 60;
            this.canvas = document.getElementById('myCanvas');
            this.renderContext = this.canvas.getContext('2d');
            this.backTrackURL = (gitHubPage) ? 
                "" :
                "" ;
            this.feedBackURLs = (gitHubPage) ? [

            ] :[

            ];
        }
    }
    return new Global(true);
}();