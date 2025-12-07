import { Component, createSignal, onMount, onCleanup, For } from "solid-js";

interface Cloud {
    id: number;
    x: number;
    y: number;
    scale: number;
    opacity: number;
    speedFactor: number;
    variant: number;
}

interface WindLine {
    id: number;
    x: number;
    y: number;
    width: number;
    opacity: number;
    speed: number;
}

const Clouds: Component = () => {
    const [clouds, setClouds] = createSignal<Cloud[]>([]);
    const [windLines, setWindLines] = createSignal<WindLine[]>([]);

    // Physics state
    let currentWind = 0.05; // Actual velocity applied
    let targetWind = 0.05;  // Desired velocity based on swipes
    let lastX = 0;
    let isDragging = false;
    let animationFrameId: number;
    let windLineIdCounter = 0;

    const initClouds = () => {
        const newClouds = Array.from({ length: 6 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 35 + 15,
            scale: Math.random() * 0.6 + 0.7,
            opacity: Math.random() * 0.3 + 0.4,
            speedFactor: Math.random() * 0.4 + 0.6,
            variant: Math.floor(Math.random() * 3) + 1 // 1, 2, or 3
        }));
        setClouds(newClouds);
    };

    const updatePhysics = () => {
        currentWind += (targetWind - currentWind) * 0.02;

        setClouds(prev => prev.map(cloud => {
            let newX = cloud.x + (currentWind * cloud.speedFactor);
            if (newX > 120) newX = -30;
            if (newX < -30) newX = 120;
            return { ...cloud, x: newX };
        }));

        // Update Wind Lines
        setWindLines(prev => prev
            .map(line => ({
                ...line,
                x: line.x + line.speed,
                opacity: line.opacity - 0.02 // Fade out
            }))
            .filter(line => line.opacity > 0)
        );

        animationFrameId = requestAnimationFrame(updatePhysics);
    };

    const handlePointerDown = (e: PointerEvent) => {
        isDragging = true;
        lastX = e.clientX;
    };

    const handlePointerMove = (e: PointerEvent) => {
        if (!isDragging) return;

        const dx = e.clientX - lastX;
        targetWind += dx * 0.002;

        // Spawn Wind Lines if moving fast enough
        if (Math.abs(dx) > 5) {
            // Randomly spawn a line near the cursor Y, but distributed slightly X
            const direction = dx > 0 ? 1 : -1;
            const newLine: WindLine = {
                id: windLineIdCounter++,
                x: (e.clientX / window.innerWidth) * 100, // % position
                y: (e.clientY / window.innerHeight) * 100, // % position
                width: Math.random() * 100 + 50, // 50-150px length
                opacity: Math.random() * 0.5 + 0.2,
                speed: direction * (Math.random() * 1 + 1) // Fast movement
            };
            setWindLines(prev => [...prev, newLine]);
        }

        if (targetWind > 0.2) targetWind = 0.2;
        if (targetWind < -0.2) targetWind = -0.2;

        lastX = e.clientX;
    };

    const handlePointerUp = () => {
        isDragging = false;
    };

    onMount(() => {
        initClouds();
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        animationFrameId = requestAnimationFrame(updatePhysics);
    });

    onCleanup(() => {
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        cancelAnimationFrame(animationFrameId);
    });

    return (
        <div class="clouds-container">
            <For each={clouds()}>
                {(cloud) => (
                    <div
                        class={`cloud cloud-v${cloud.variant}`}
                        style={{
                            left: `${cloud.x}%`,
                            top: `${cloud.y}%`,
                            transform: `scale(${cloud.scale})`,
                            opacity: cloud.opacity
                        }}
                    ></div>
                )}
            </For>
            <For each={windLines()}>
                {(line) => (
                    <div
                        class="wind-line"
                        style={{
                            left: `${line.x}%`,
                            top: `${line.y}%`,
                            width: `${line.width}px`,
                            opacity: line.opacity
                        }}
                    ></div>
                )}
            </For>
        </div>
    );
};

export default Clouds;
