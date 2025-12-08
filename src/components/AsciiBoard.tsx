import { Component, createSignal, onMount, For } from 'solid-js';
import AsciiArt from './AsciiArt';
import { convertImageToAscii } from '../utils/asciiConverter';
import { supabase } from '../lib/supabaseClient';

const TILE_WIDTH = 60;

interface AsciiItem {
    id: string;
    ascii_text: string;
    created_at: string;
}

const TiltAsciiCard: Component<{ item: AsciiItem, formatDate: (d: string) => string }> = (props) => {
    let cardRef: HTMLDivElement | undefined;
    const [x, setX] = createSignal(0);
    const [y, setY] = createSignal(0);
    const [isHovering, setIsHovering] = createSignal(false);
    const [transition, setTransition] = createSignal('transform 0.1s ease-out');

    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef) return;
        setIsHovering(true);
        const rect = cardRef.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        setX(yPct * -20);
        setY(xPct * 20);
        setTransition('none');
    };

    const handleMouseLeave = () => {
        setX(0);
        setY(0);
        setTransition('transform 0.5s ease-out');
    };

    const transform = () => `perspective(1000px) rotateX(${x()}deg) rotateY(${y()}deg) scale3d(1, 1, 1)`;

    return (
        <div
            style={{
                width: isHovering() ? '350px' : '200px',
                "aspect-ratio": "1 / 1",
                transition: "width 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)",
                "z-index": isHovering() ? 10 : 1, // Slight boost for sorting
                position: "relative" // Maintain stacking context
            }}
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
                handleMouseLeave();
                setIsHovering(false);
            }}
        >
            <div
                ref={cardRef}
                onMouseMove={handleMouseMove}
                style={{
                    width: '100%',
                    height: '100%',
                    background: isHovering() ? 'rgba(0, 0, 0, 0.9)' : 'rgba(0, 0, 0, 0.4)',
                    "backdrop-filter": 'blur(5px)',
                    "border-radius": '8px',
                    padding: '10px',
                    display: 'flex',
                    "flex-direction": 'column',
                    "align-items": 'center',
                    overflow: 'hidden',
                    transform: transform(),
                    transition: transition(),
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    "box-shadow": "0 10px 20px rgba(0,0,0,0.3)"
                }}
            >
                <div style={{ "flex-grow": 1, display: 'flex', "align-items": 'center', "justify-content": 'center', width: '100%', overflow: 'hidden', "pointer-events": "none" }}>
                    <AsciiArt content={props.item.ascii_text} style={{ "font-size": isHovering() ? '6.5px' : '4px', "line-height": isHovering() ? '6.5px' : '4px', "transition": "font-size 0.4s ease", "white-space": "pre" }} className="text-success" />
                </div>
                <div
                    class="mt-1 text-center"
                    style={{
                        "font-family": 'monospace',
                        color: 'rgba(255, 255, 255, 0.5)',
                        "font-size": '0.6rem',
                        "border-top": '1px solid rgba(255, 255, 255, 0.1)',
                        width: '100%',
                        "padding-top": '5px',
                        "pointer-events": "none"
                    }}
                >
                    {props.formatDate(props.item.created_at)}
                </div>
            </div>
        </div>
    );
};

const AsciiBoard: Component = () => {
    const [items, setItems] = createSignal<AsciiItem[]>([]);
    const [isDragging, setIsDragging] = createSignal(false);

    const fetchItems = async () => {
        try {
            const { data, error } = await supabase
                .from('ascii_art')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            if (data) setItems(data);
        } catch (err) {
            console.error("Error fetching ascii art:", err);
        }
    };

    onMount(() => {
        fetchItems();
    });

    const handleFile = async (file: File) => {
        try {
            const ascii = await convertImageToAscii(file, { width: TILE_WIDTH, contrast: 10 });

            const { data, error } = await supabase
                .from('ascii_art')
                .insert([{ ascii_text: ascii }])
                .select();

            if (error) throw error;

            if (data) {
                setItems([data[0], ...items()]);
            }
        } catch (err) {
            console.error("Failed to process file", err);
        }
    };

    const onDrop = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        if (e.dataTransfer?.files) {
            Array.from(e.dataTransfer.files).forEach(file => {
                if (file.type.startsWith('image/')) {
                    handleFile(file);
                }
            });
        }
    };

    const onDragOver = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const onDragLeave = (e: DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString(undefined, {
            month: 'short', day: 'numeric', year: 'numeric'
        });
    };

    return (
        <div
            class="container-fluid"
            style={{
                "height": "100%",
                "overflow-y": "auto",
                "padding-top": "2rem",
                "padding-bottom": "2rem"
            }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div class="row mb-4 text-center">
                <div class="col px-5">
                    <p class="mb-2" style={{
                        color: '#ffffff',
                        "font-size": "0.9rem",
                        "font-family": "monospace",
                        "letter-spacing": "0.5px",
                        "-webkit-font-smoothing": "antialiased",
                        "font-weight": "500",
                        "text-shadow": "none"
                    }}>
                        Visitors are encouraged to leave a mark here by dropping an image to be converted to an ascii-art
                    </p>
                    <p style={{
                        color: '#00ffff',
                        "font-size": "1.5rem",
                        "font-family": "monospace",
                        "-webkit-font-smoothing": "antialiased"
                    }}>
                        It shall exist until the end of time
                    </p>
                </div>
            </div>

            <div
                style={{
                    display: 'flex',
                    "flex-wrap": 'wrap',
                    "justify-content": 'center',
                    gap: '10px',
                    padding: '0 20px'
                }}
            >
                <For each={items()}>
                    {(item) => (
                        <TiltAsciiCard item={item} formatDate={formatDate} />
                    )}
                </For>
            </div>

            {items().length === 0 && !isDragging() && (
                <div class="text-center mt-5" style={{ opacity: 0.5 }}>
                    <div style={{ "font-size": "3rem" }}>📡</div>
                    <p>Connecting to database... or board is empty.</p>
                </div>
            )}

            {isDragging() && (
                <div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        "z-index": 1000,
                        display: 'flex',
                        "align-items": 'center',
                        "justify-content": 'center',
                        "pointer-events": 'none'
                    }}
                >
                    <h1 class="text-white">DROP TO SHARE</h1>
                </div>
            )}
        </div>
    );
};

export default AsciiBoard;
