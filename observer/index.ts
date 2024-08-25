/**
 * The Subject class represents the object being observed.
 * It maintains a list of observers and notifies them when its state changes.
 */
class Subject {
    private observers: Observer[] = [];

    /**
    * The current state of the subject. This could be anything you want it to be.
    */
    private _state: number = 0;

    /**
    * Notifies all observers of the subject's current state.
    */
    private notify() {
        for (const o of this.observers) {
            o.update(this);
        }
    }

    /**
    * Gets or sets the subject's state.
    */
    public set state(state: number) {
        console.log(`My state: ${state}`)
        this._state = state;
        this.notify();
    }

    public get state() {
        return this._state
    }

    /**
    * Attaches one or more observers to this subject.
    * @param observers The observers to attach.
    */
    attach(...observers: Observer[]) {
        for (const o of observers) {
            this.observers.push(o);
        }
    }

    /**
    * Detaches an observer from this subject.
    * @param observer The observer to detach.
    */
    detatch(observer: Observer) {
        const index = this.observers.indexOf(observer);
        if (index !== -1) {
            this.observers.splice(index, 1);
        }
    }
}

/**
 * The Observer class represents an object that observes the subject.
 * It defines an update method that is called when the subject's state changes.
 */
abstract class Observer {

    /**
    * Updates the observer with the subject's current state.
    * @param subject The subject that has changed state.
    */
    abstract  update(subject: Subject): void;
}

class Knight extends Observer {
    async update(subject: Subject): Promise<void> {
        await sleep(Math.random() * 100);
        console.log(`knight: Tanking against ${subject.state} damage!`)
    }
}


class Healer extends Observer {
    async update(subject: Subject): Promise<void> {
        await sleep(Math.random() * 100);
        console.log(`healer: Healing ${subject.state} damage for the team!`)
    }
}

class Rogue extends Observer {
    async update(subject: Subject): Promise<void> {
        await sleep(Math.random() * 100);
        console.log(`rogue: I've been hit for ${subject.state} damage!`)
    }
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));

if (require.main === module) {
    const subject = new Subject();
    const k = new Knight();
    const h = new Healer();
    const r = new Rogue();

    subject.attach(r, h, k);

    subject.state = Math.floor(Math.random() * 100);
}
