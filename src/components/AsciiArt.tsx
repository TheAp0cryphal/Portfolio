import { Component } from 'solid-js';

interface AsciiArtProps {
    content: string;
    className?: string;
    style?: any;
}

const AsciiArt: Component<AsciiArtProps> = (props) => {
    return (
        <pre
            class={props.className}
            style={{
                "font-family": '"Courier New", Courier, monospace',
                "line-height": "1ch",
                "white-space": "pre",
                "overflow": "hidden",
                "font-size": "8px", // Smaller font for tiles
                "margin": 0,
                ...props.style
            }}
        >
            {props.content}
        </pre>
    );
};

export default AsciiArt;
