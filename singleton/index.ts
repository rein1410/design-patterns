class VolumeControl {
    private static _instance: VolumeControl | null = null;

    private _volume: number = 0;

    private constructor() {}

    static get instance() {
        //Lazy Initialization
        if (VolumeControl._instance === null) {
            VolumeControl._instance = new VolumeControl();
        }
        return VolumeControl._instance;
    }

    get volume(): number {
        return this._volume;
    }

    set volume(value: number) {
        if (value >= 0 && value <= 100) {  // Example validation
            this._volume = value;
        } else {
            console.error('Volume must be between 0 and 100');
        }
    }

}

if (require.main === module) {
    console.log(VolumeControl.instance.volume);
    VolumeControl.instance.volume = 100;
    console.log(VolumeControl.instance.volume);
}
