import { createSignal, onMount, onCleanup, ParentComponent, children } from "solid-js";

interface ScrollRevealProps {
    threshold?: number;
    class?: string;
}

const ScrollReveal: ParentComponent<ScrollRevealProps> = (props) => {
    let ref: HTMLDivElement | undefined;
    const [isVisible, setIsVisible] = createSignal(false);
    const resolved = children(() => props.children);

    onMount(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsVisible(true);
                    observer.disconnect(); // Trigger only once
                }
            },
            {
                threshold: props.threshold || 0.1,
            }
        );

        if (ref) {
            observer.observe(ref);
        }

        onCleanup(() => {
            observer.disconnect();
        });
    });

    return (
        <div
            ref={ref}
            class={`scroll-reveal ${isVisible() ? "is-visible" : ""} ${props.class || ""}`}
        >
            {resolved()}
        </div>
    );
};

export default ScrollReveal;
