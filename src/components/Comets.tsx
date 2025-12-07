import { Component, createSignal, onMount, onCleanup, For } from "solid-js";

interface Comet {
    id: number;
    top: number;
    left: number;
    delay: number;
    angle: number;
}

const Comets: Component = () => {
    const [comets, setComets] = createSignal<Comet[]>([]);
    let cometId = 0;
    let intervalId: number;

    const spawnComet = () => {
        // Top 0-40% of screen to start
        const top = Math.random() * 40;
        // Across the width
        const left = Math.random() * 80;

        // Create new comet
        const newComet: Comet = {
            id: cometId++,
            top,
            left,
            delay: 0,
            angle: 45 // Fixed angle or random? Usually comets streak diagonally
        };

        setComets(prev => [...prev, newComet]);

        // Remove comet after animation (2s approx)
        setTimeout(() => {
            setComets(prev => prev.filter(c => c.id !== newComet.id));
        }, 3000);
    };

    onMount(() => {
        // Spawn a comet every 1.5-3 seconds
        intervalId = window.setInterval(() => {
            if (Math.random() > 0.4) { // 60% chance to spawn
                spawnComet();
            }
        }, 1500);
    });

    onCleanup(() => {
        clearInterval(intervalId);
    });

    return (
        <div class="comets-container">
            <For each={comets()}>
                {(comet) => (
                    <div
                        class="comet"
                        style={{
                            top: `${comet.top}%`,
                            left: `${comet.left}%`,
                            // We'll handle animation in CSS, but position here
                        }}
                    ></div>
                )}
            </For>
        </div>
    );
};

export default Comets;
