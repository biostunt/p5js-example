import DrawEngine from 'p5';

export class StateManager {
    
    /**
     * events container which executes every frame 
     */
    protected static events: Array<Function> = [];

    constructor(protected readonly engine: DrawEngine) { }

    /**
     * function that should executes each frame
     */
    public static tick(): void {
        const { events } = this;
        events.forEach(evt => evt());
    }


    /**
     * Remote variable that loading from server. Shows max of the score.
     * @warning This variable must be controlled by server.
     */
    public static bestUserScore: number;

    /**
     * score variable
     */
    public static userScore: number;

    /**
     * apply callback which calculates new score each frame
     * @param callbackEvt callback that calculates new score each frame
     * @param initialScore base value of score
     */
    public static calculateScore(callbackEvt: (currentScore) => number, initialScore: number = 0) {
        this.events.push(() => this.userScore = callbackEvt(this.userScore));
        this.userScore = initialScore;
    }
}