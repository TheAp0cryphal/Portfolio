import { Component, createSignal, createEffect } from "solid-js";

const SpeedControl: Component = () => {
    const [speed, setSpeed] = createSignal(1);

    const handleSpeedChange = (e: InputEvent) => {
        const val = parseFloat((e.target as HTMLInputElement).value);
        setSpeed(val);
        document.body.style.setProperty('--speed-mult', val.toString());
    };

    return (
        <div class="speed-control-container">
            <label for="speed-slider">Day/Night Speed ({speed()}x)</label>
            <input
                id="speed-slider"
                type="range"
                min="0.1"
                max="10"
                step="0.1"
                value={speed()}
                onInput={handleSpeedChange}
            />
        </div>
    );
};

export default SpeedControl;
