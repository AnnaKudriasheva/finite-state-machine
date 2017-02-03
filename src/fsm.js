class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        if (config === undefined) {
            throw new Error("Config not passed");
        }
        this.initial = config.initial;
        this.state = this.initial;
        this.states = config.states;
        this.history = [this.state];
        this.historyIdx = 0;
    }

    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) {
        if (!Object.keys(this.states).includes(state)) {
            throw new Error("State not found!");
        }
        this.state = state;
        if (this.history[this.history.length - 1] !== state) {
            this.history.push(state);
            this.historyIdx = this.history.length - 1;
        }
        else {
            this.historyIdx = this.history.length - 1;
        }
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        var transitions = this.states[this.state].transitions;
        if (!Object.keys(transitions).includes(event)) {
            throw new Error("Wrong event!");
        }
        this.changeState(transitions[event]);
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        if (!event) {
            return Object.keys(this.states);
        }
        var values = [];
        for (var key in this.states) {
            if (this.states[key].transitions.hasOwnProperty(event))
                values.push(key);
        }
        return values;
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {
        if (this.history.length > 1 && this.historyIdx > 0) {
            this.historyIdx--;
            this.state = this.history[this.historyIdx];
            return true;
        }
        return false;
    }

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {
        if (this.history.length > 1 && this.historyIdx < this.history.length - 1) {
            this.historyIdx++;
            this.state = this.history[this.historyIdx];
            return true;
        }
        return false;
    }

    /**
     * Clears transition history
     */
    clearHistory() {
        this.history = [];
    }
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
