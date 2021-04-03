class InputManager {
    private prepared: boolean;
    private patterns: Array<string>;

    constructor() {
        this.prepared = true;
        this.patterns = [];
    }

    addPattern(patternName: string) {
        this.patterns.push(patternName);
    }

    public get getPatterns() {
        return this.patterns;
    }

    public get codePrepared() {
        return this.prepared;
    }
}

const inputManager = new InputManager();
export default inputManager;