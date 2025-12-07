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
    const [transform, setTransform] = createSignal("");
    const [transition, setTransition] = createSignal("transform 0.2s ease-out");

    const handleMouseMove = (e: MouseEvent) => {
        if (!cardRef) return;
        const rect = cardRef.getBoundingClientRect();
        const x = e.clientX - rect.left; // x position within the element
        const y = e.clientY - rect.top;  // y position within the element
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -10; // Max rotation 10deg
        const rotateY = ((x - centerX) / centerX) * 10;

        setTransition("transform 0.1s ease-out"); // Quick response
        setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    };

    const handleMouseLeave = () => {
        setTransition("transform 0.5s ease-out"); // Smooth return
        setTransform("perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)");
    };

    return (
        <div
            ref={cardRef}
            class="ascii-tile"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                background: 'rgba(0, 0, 0, 0.4)',
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
                <AsciiArt content={props.item.ascii_text} style={{ "font-size": "6px", "line-height": "6px" }} className="text-success" />
            </div>
            <div
                class="mt-3 text-center"
                style={{
                    "font-family": 'monospace',
                    color: 'rgba(255, 255, 255, 0.5)',
                    "font-size": '0.8rem',
                    "border-top": '1px solid rgba(255, 255, 255, 0.1)',
                    width: '100%',
                    "padding-top": '5px',
                    "pointer-events": "none"
                }}
            >
                {props.formatDate(props.item.created_at)}
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
            class="container-fluid py-5"
            style={{ "min-height": "100vh" }}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onDragLeave={onDragLeave}
        >
            <div class="row mb-5 text-center">
                <div class="col">
                    <h2 class="display-4 fw-bold" style={{ color: '#f8f8f8' }}>ASCII BOARD</h2>
                    <p class="lead" style={{ color: '#e5f1fb' }}>
                        {isDragging() ? "DROP TO UPLOAD" : "Drag images to share with the world"}
                    </p>
                </div>
            </div>

            <div
                style={{
                    display: 'grid',
                    "grid-template-columns": 'repeat(5, 1fr)',
                    gap: '20px',
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
