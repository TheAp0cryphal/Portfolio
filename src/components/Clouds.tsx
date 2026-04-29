import { Component, createSignal, onMount, onCleanup, For } from "solid-js";

interface Cloud {
    id: number;
    x: number;
    y: number;
    scale: number;
    opacity: number;
    speedFactor: number;
    variant: number;
    isVisible: boolean;
    isPoofing: boolean;
    isMaterializing: boolean;
    poofProgress: number;
    poofStartedAt?: number;
    materializeProgress: number;
    materializeStartedAt: number;
}

interface WindLine {
    id: number;
    x: number;
    y: number;
    width: number;
    opacity: number;
    speed: number;
}

const CLOUD_COUNT = 6;
const CLOUD_RESPAWN_DELAY_MS = 10_000;
const CLOUD_POOF_ANIMATION_MS = 900;
const CLOUD_MATERIALIZE_ANIMATION_MS = 850;

const createCloud = (id: number): Cloud => ({
    id,
    x: Math.random() * 100,
    y: Math.random() * 35 + 15,
    scale: Math.random() * 0.6 + 0.7,
    opacity: Math.random() * 0.3 + 0.4,
    speedFactor: Math.random() * 0.4 + 0.6,
    variant: Math.floor(Math.random() * 3) + 1, // 1, 2, or 3
    isVisible: true,
    isPoofing: false,
    isMaterializing: true,
    poofProgress: 0,
    materializeProgress: 0,
    materializeStartedAt: performance.now()
});

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
    const respawnTimeouts = new Map<number, number>();
    const poofAnimationTimeouts = new Map<number, number>();
    let containerRef!: HTMLDivElement;

    const easeOutCubic = (progress: number) => 1 - Math.pow(1 - progress, 3);

    const initClouds = () => {
        const newClouds = Array.from({ length: CLOUD_COUNT }).map((_, i) => createCloud(i));
        setClouds(newClouds);
    };

    const updatePhysics = () => {
        const now = performance.now();
        currentWind += (targetWind - currentWind) * 0.02;

        setClouds(prev => prev.map(cloud => {
            let newX = cloud.x + (currentWind * cloud.speedFactor);
            if (newX > 120) newX = -30;
            if (newX < -30) newX = 120;
            const poofProgress = cloud.isPoofing && cloud.poofStartedAt !== undefined
                ? Math.min(1, (now - cloud.poofStartedAt) / CLOUD_POOF_ANIMATION_MS)
                : cloud.poofProgress;
            const materializeProgress = cloud.isMaterializing
                ? Math.min(1, (now - cloud.materializeStartedAt) / CLOUD_MATERIALIZE_ANIMATION_MS)
                : cloud.materializeProgress;

            return {
                ...cloud,
                x: newX,
                poofProgress,
                materializeProgress,
                isMaterializing: cloud.isMaterializing && materializeProgress < 1
            };
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

    const poofCloud = (cloudId: number) => {
        const cloud = clouds().find(currentCloud => currentCloud.id === cloudId);
        if (!cloud || !cloud.isVisible || cloud.isPoofing) return;

        const existingTimeout = respawnTimeouts.get(cloudId);
        if (existingTimeout !== undefined) {
            window.clearTimeout(existingTimeout);
        }

        setClouds(prev => prev.map(cloud => (
            cloud.id === cloudId
                ? {
                    ...cloud,
                    isPoofing: true,
                    isMaterializing: false,
                    poofProgress: 0,
                    poofStartedAt: performance.now(),
                    materializeProgress: 1
                }
                : cloud
        )));

        const hideTimeoutId = window.setTimeout(() => {
            setClouds(prev => prev.map(cloud => (
                cloud.id === cloudId
                    ? {
                        ...cloud,
                        isVisible: false,
                        isPoofing: false,
                        isMaterializing: false,
                        poofProgress: 0,
                        poofStartedAt: undefined,
                        materializeProgress: 0
                    }
                    : cloud
            )));
            poofAnimationTimeouts.delete(cloudId);
        }, CLOUD_POOF_ANIMATION_MS);

        const respawnTimeoutId = window.setTimeout(() => {
            setClouds(prev => prev.map(cloud => (
                cloud.id === cloudId ? createCloud(cloud.id) : cloud
            )));
            respawnTimeouts.delete(cloudId);
        }, CLOUD_RESPAWN_DELAY_MS);

        poofAnimationTimeouts.set(cloudId, hideTimeoutId);
        respawnTimeouts.set(cloudId, respawnTimeoutId);
    };

    const handleCloudKeyDown = (cloudId: number, event: KeyboardEvent) => {
        if (event.key !== "Enter" && event.key !== " ") return;

        event.preventDefault();
        event.stopPropagation();
        poofCloud(cloudId);
    };

    const getClickedCloudId = (event: MouseEvent | PointerEvent) => {
        if (!containerRef) return undefined;

        const containerRect = containerRef.getBoundingClientRect();
        const clickX = event.clientX - containerRect.left;
        const clickY = event.clientY - containerRect.top;

        return clouds().find(cloud => {
            if (!cloud.isVisible || cloud.isPoofing || cloud.isMaterializing) return false;

            const cloudX = (cloud.x / 100) * containerRect.width;
            const cloudY = (cloud.y / 100) * containerRect.height;
            const hitPadding = 35 * cloud.scale;
            const hitWidth = 130 * cloud.scale;
            const hitHeight = 85 * cloud.scale;

            return (
                clickX >= cloudX - hitPadding &&
                clickX <= cloudX + hitWidth + hitPadding &&
                clickY >= cloudY - hitPadding &&
                clickY <= cloudY + hitHeight
            );
        })?.id;
    };

    const handleWindowPointerDown = (event: PointerEvent) => {
        const clickedCloudId = getClickedCloudId(event);
        if (clickedCloudId === undefined) return;

        event.preventDefault();
        event.stopPropagation();
        poofCloud(clickedCloudId);
    };

    onMount(() => {
        initClouds();
        window.addEventListener('pointerdown', handleWindowPointerDown, true);
        window.addEventListener('pointerdown', handlePointerDown);
        window.addEventListener('pointermove', handlePointerMove);
        window.addEventListener('pointerup', handlePointerUp);
        animationFrameId = requestAnimationFrame(updatePhysics);
    });

    onCleanup(() => {
        window.removeEventListener('pointerdown', handleWindowPointerDown, true);
        window.removeEventListener('pointerdown', handlePointerDown);
        window.removeEventListener('pointermove', handlePointerMove);
        window.removeEventListener('pointerup', handlePointerUp);
        cancelAnimationFrame(animationFrameId);
        poofAnimationTimeouts.forEach(timeoutId => window.clearTimeout(timeoutId));
        respawnTimeouts.forEach(timeoutId => window.clearTimeout(timeoutId));
        poofAnimationTimeouts.clear();
        respawnTimeouts.clear();
    });

    return (
        <div class="clouds-container" ref={containerRef}>
            <For each={clouds().filter(cloud => cloud.isVisible)}>
                {(cloud) => {
                    const poofProgress = () => easeOutCubic(cloud.poofProgress);
                    const materializeProgress = () => easeOutCubic(cloud.materializeProgress);
                    const scale = () => {
                        if (cloud.isPoofing) return cloud.scale * (1 + poofProgress() * 0.45);
                        if (cloud.isMaterializing) return cloud.scale * (0.65 + materializeProgress() * 0.35);
                        return cloud.scale;
                    };
                    const opacity = () => {
                        if (cloud.isPoofing) return cloud.opacity * Math.max(0, 1 - poofProgress());
                        if (cloud.isMaterializing) return cloud.opacity * materializeProgress();
                        return cloud.opacity;
                    };
                    const yOffset = () => {
                        if (cloud.isPoofing) return -36 * poofProgress();
                        if (cloud.isMaterializing) return 12 * (1 - materializeProgress());
                        return 0;
                    };
                    const blur = () => {
                        if (cloud.isPoofing) return 2 + 18 * poofProgress();
                        if (cloud.isMaterializing) return 14 - 12 * materializeProgress();
                        return 2;
                    };

                    return (
                        <button
                            type="button"
                            class={`cloud cloud-v${cloud.variant}${cloud.isPoofing ? " cloud-poofing" : ""}${cloud.isMaterializing ? " cloud-materializing" : ""}`}
                            aria-label="Poof away cloud"
                            onKeyDown={(event) => handleCloudKeyDown(cloud.id, event)}
                            style={{
                                left: `${cloud.x}%`,
                                top: `${cloud.y}%`,
                                opacity: opacity(),
                                transform: `translateY(${yOffset()}px) scale(${scale()})`,
                                filter: `blur(${blur()}px)`
                            }}
                        ></button>
                    );
                }}
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
