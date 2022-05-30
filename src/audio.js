class AUDIOMODULE {
    constructor(GLOBAL){
        class audioLayer {
            #audioContext;
            #backTrackBuffer;
            #backTrackNode;
            #feedBackBuffer=[];
            #feedBackNode;
            constructor(){
                this.#audioContext = new AudioContext();
                this.#backTrackNode = null;
                this.#feedBackNode = null;

                window.fetch(GLOBAL.backTrackURL)
                    .then(res => res.arrayBuffer())
                    .then(arrayBuffer => this.#audioContext.decodeAudioData(arrayBuffer))
                    .then(audioBuffer => {
                        this.#backTrackBuffer = audioBuffer;
                    });

                GLOBAL.feedBackURLs.forEach((url)=>{
                    window.fetch(url)
                        .then(res => res.arrayBuffer())
                        .then(arrayBuffer => this.#audioContext.decodeAudioData(arrayBuffer))
                        .then(audioBuffer => {
                            this.#feedBackBuffer.push(audioBuffer);
                        });
                });
            }
            
            loopBackTrack(){
                GLOBAL.backTrackOn = true;
                this.#backTrackNode = this.#audioContext.createBufferSource();
                this.#backTrackNode.buffer = this.#backTrackBuffer;
                this.#backTrackNode.loop = true;
                this.#backTrackNode.connect(this.#audioContext.destination);
                this.#backTrackNode.start();
            }

            stopBackTrack(){
                GLOBAL.backTrackOn = false;
                if(this.#backTrackNode !== null){
                    this.#backTrackNode.stop();
                    this.#backTrackNode = null;
                }
            }

            playFeedBack(id){
                if(GLOBAL.feedBackOn){
                    if(this.#feedBackNode !== null){
                        this.#feedBackNode.stop();
                        this.#feedBackNode = null;
                    }
                    this.#feedBackNode = this.#audioContext.createBufferSource();
                    this.#feedBackNode.buffer = this.#feedBackBuffer[(id % this.#feedBackBuffer.length)];
                    this.#feedBackNode.connect(this.#audioContext.destination);
                    this.#feedBackNode.start();
                }
            }
        }

        this.audioLayer = audioLayer;
    }
}