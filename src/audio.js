class AUDIOMODULE {
    constructor(GLOBAL, ASSETS){
        class audioLayer {
            #audioContext;
            #backTrackBuffer=[];
            #backTrackNode=[];
            #backTrackGainNode;
            #feedBackBuffer=[];
            #feedBackGainNode;
            #feedBackNode;
            constructor(){
                this.#audioContext = new AudioContext();
                this.#backTrackGainNode = this.#audioContext.createGain();
                this.#feedBackGainNode = this.#audioContext.createGain();
                this.#feedBackGainNode.gain.value = 0.5;
                this.#backTrackGainNode.gain.value = 0.3;
                this.#feedBackNode = null;

                // Load from .mp3 file 
                //
                // window.fetch(GLOBAL.backTrackURL)
                //     .then(res => res.arrayBuffer())
                //     .then(arrayBuffer => this.#audioContext.decodeAudioData(arrayBuffer))
                //     .then(audioBuffer => {
                //         this.#backTrackBuffer.push(audioBuffer);
                //     });

                // GLOBAL.feedBackURLs.forEach((url)=>{
                //     window.fetch(url)
                //         .then(res => res.arrayBuffer())
                //         .then(arrayBuffer => this.#audioContext.decodeAudioData(arrayBuffer))
                //         .then(audioBuffer => {
                //             this.#feedBackBuffer.push(audioBuffer);
                //         });
                // });

                for(let i in ASSETS.BACKGROUND) {
                    let src = ASSETS.BACKGROUND[i];
                    let arrayBuffer = base64ToArrayBuffer(src);
                    this.#audioContext.decodeAudioData(arrayBuffer)
                        .then(audioBuffer => {
                            this.#backTrackBuffer.push(audioBuffer);
                        });
                }

                for(let i in ASSETS.FEEDBACK) {
                    let src = ASSETS.FEEDBACK[i];
                    let arrayBuffer = base64ToArrayBuffer(src);
                    this.#audioContext.decodeAudioData(arrayBuffer)
                        .then(audioBuffer => {
                            this.#feedBackBuffer.push(audioBuffer);
                        });
                }
                

                function base64ToArrayBuffer (base64) {
                    var binary_string = window.atob(base64.split(',')[1])
                    var len = binary_string.length
                    var bytes = new Uint8Array(len)
                    for (var i = 0; i < len; i++) {
                    bytes[i] = binary_string.charCodeAt(i)
                    }
                    return bytes.buffer
                }
            }
            
            loopBackTrack(){
                GLOBAL.backTrackOn = true;
                for(let i = 0;i < this.#backTrackBuffer.length;i++){
                    this.#backTrackNode.push(this.#audioContext.createBufferSource());
                    this.#backTrackNode[i].buffer = this.#backTrackBuffer[i];
                    this.#backTrackNode[i].loop = true;
                    this.#backTrackNode[i].connect(this.#backTrackGainNode).connect(this.#audioContext.destination);
                }
                for(let i = 0;i < this.#backTrackNode.length;i++){
                    this.#backTrackNode[i].start();
                }
            }

            stopBackTrack(){
                GLOBAL.backTrackOn = false;
                if(this.#backTrackNode.length !== 0){
                    for(let i = 0;i < this.#backTrackNode.length;i++){
                        this.#backTrackNode[i].stop();
                    }
                    this.#backTrackNode.splice(0,this.#backTrackNode.length);
                }
            }

            playFeedBack(id){
                if(GLOBAL.feedBackOn){
                    this.#feedBackNode = this.#audioContext.createBufferSource();
                    this.#feedBackNode.buffer = this.#feedBackBuffer[(id % this.#feedBackBuffer.length)];
                    this.#feedBackNode.connect(this.#feedBackGainNode).connect(this.#audioContext.destination);
                    this.#feedBackNode.start();                 
                }
            }
        }

        this.audioLayer = audioLayer;
    }
}