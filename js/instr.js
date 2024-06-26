class Instructions {
    constructor(options = {}) {
        Object.assign(this, {
            textBox: false,
            textElement: false,
            arr: [],
            quizConditions: []
        }, options);
        this.index = 0;
        this.quizAttemptN = {};
        for (let q of this.quizConditions){
            this.quizAttemptN[q] = 1;
        }
        this.readingTimes = {};
    }

    start() {
        this.advance();
        this.startTimer();
    }

    advance() {
        this.textElement.html(this.arr[this.index][2]);
        const pre_function = this.arr[this.index][0];
        if (pre_function !== false) {
            pre_function();
        }
        this.textBox.show();
        const post_function = this.arr[this.index][1];
        if (post_function !== false) {
            post_function();
        }
    }

    next() {
        this.endTimer()
        this.saveReadingTime();
        this.textBox.hide();
        this.index += 1;
        if (this.index < this.arr.length) {
            this.advance();
            this.startTimer();
        }
    }

    startTimer() {
        this.startTime = Date.now();
    }

    endTimer() {
        this.endTime = Date.now();
        this.readingDuration = (this.endTime - this.startTime)/1000;
    }

    saveReadingTime() {
        if (typeof(this.readingTimes[this.index])=='undefined'){
            this.readingTimes[this.index] = this.readingDuration;
        }
        else{
            if (this.readingTimes[this.index] < this.readingDuration){
                this.readingTimes[this.index] = this.readingDuration;
            }
        }
    }
}