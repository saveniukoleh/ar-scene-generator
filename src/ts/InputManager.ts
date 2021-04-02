class InputManager {
    private prepared: boolean;
    private patterns: Array<string>;

    constructor() {
        this.prepared = false;
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

export const inputManager = new InputManager();