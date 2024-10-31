export class Session {
    nbOfPomodoris: number;
    nbOfPomodoros: number;
    totalWorkTime: number;
    date: string;

    constructor(
        date: string, nbOfPomodoris: number, totalWorkTime: number, nbOfPomodoros: number
    ) {
        this.date = date;
        this.nbOfPomodoris = nbOfPomodoris;
        this.nbOfPomodoros = nbOfPomodoros;
        this.totalWorkTime = totalWorkTime;
    }


    addSession() {
        this.nbOfPomodoris += 1;
    }

    addTimeToTotal(time: number) {
        this.totalWorkTime += time;
    }

    addPomodoro() {
        this.nbOfPomodoros += 1;
    }

    resetPomodori() {
        this.nbOfPomodoris = 0;
    }

    addPomodori() {
        this.nbOfPomodoris += 1;
    }

    setDate(date: string) {
        this.date = date;
    }
}