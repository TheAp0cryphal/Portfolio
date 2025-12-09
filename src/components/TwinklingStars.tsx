import { Component, For, onMount, createSignal } from "solid-js";

interface Star {
    id: number;
    left: number;
    bottom: number;
    size: number;
    duration: number;
    delay: number;
    opacity: number;
}

const TwinklingStars: Component = () => {
    const [stars, setStars] = createSignal<Star[]>([]);

    onMount(() => {
        const starCount = 75; // Number of stars
        const newStars: Star[] = Array.from({ length: starCount }).map((_, i) => {
            // Generate random positions
            // We prioritize the space above the treeline.
            // Assuming tree takes up some bottom portion, we can distribute stars 
            // primarily in the upper 70-80% or evenly if using z-index behind trees.
            // However, to ensure they look "right above", we can focus on bottom % being > 10% or so
            // to avoid being completely hidden if the trees are very short on some screens.

            const bottom = Math.random() * 100; // 0% to 100%
            const left = Math.random() * 100;
            const size = Math.random() * 2 + 1; // 1px to 3px
            const duration = Math.random() * 3 + 2; // 2s to 5s
            const delay = Math.random() * 5;
            const opacity = Math.random() * 0.5 + 0.3;

            return {
                id: i,
                left,
                bottom,
                size,
                duration,
                delay,
                opacity
            };
        });

        setStars(newStars);
    });

    return (
        <div class="stars-container">
            <div class="sun"></div>
            <div class="moon"></div>
            <div class="stars-wrapper">
                <For each={stars()}>
                    {(star) => (
                        <div
                            class="star"
                            style={{
                                left: `${star.left}%`,
                                bottom: `${star.bottom}%`,
                                width: `${star.size}px`,
                                height: `${star.size}px`,
                                "animation-duration": `calc(${star.duration}s / var(--speed-mult))`,
                                "animation-delay": `calc(${star.delay}s / var(--speed-mult))`,
                                opacity: star.opacity
                            }}
                        />
                    )}
                </For>
            </div>
        </div>
    );
};

export default TwinklingStars;
