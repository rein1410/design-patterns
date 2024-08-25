//Example that is similar to RxJS

class RxJSObserver {
    private _callback: (...v) => any;

    next(v) {
        this._callback(v);
    }

    public set callback(c: (...v) => any) {
        this._callback = c;
    }
}

class RxJSSubject {

    private observers: RxJSObserver[] = [];

     subscribe(callback: (...args) => any) {
        const observer = new RxJSObserver();
        observer.callback = callback;
        this.observers.push(observer);
        return observer;
    }

    next(v) {
        for (const o of this.observers) {
            o.next(v);
        }
    }
}

if (require.main == module) {

    const news = new RxJSSubject();
    const tv1 = news.subscribe(v => console.log(`${v} via DenTV`));
    const tv2 = news.subscribe(v => console.log(`${v} via Batcave TV`));
    news.next("Breaking news:")
    news.next("The war is over")
}