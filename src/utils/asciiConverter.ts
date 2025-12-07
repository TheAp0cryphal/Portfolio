export const DENSITY = "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'.            ";

export interface AsciiOptions {
    width?: number; // Characters width
    contrast?: number; // -10 to 10
}

export const convertImageToAscii = (file: File | string, options: AsciiOptions = {}): Promise<string> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.crossOrigin = "Anonymous";

        if (typeof file === 'string') {
            img.src = file;
        } else {
            img.src = URL.createObjectURL(file);
        }

        img.onload = () => {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d', { willReadFrequently: true });
            if (!ctx) {
                reject(new Error("Could not get canvas context"));
                return;
            }

            const targetWidth = options.width || 60; // Default narrower for grid
            // Font aspect ratio correction factor (approx 0.55 for monospace)
            // Standard monospace is often ~0.5-0.6 width/height.
            const fontRatio = 0.55;
            const targetHeight = Math.floor(targetWidth * (img.height / img.width) * fontRatio);

            canvas.width = targetWidth;
            canvas.height = targetHeight;

            ctx.drawImage(img, 0, 0, targetWidth, targetHeight);

            const imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
            const data = imageData.data;

            let art = '';
            let currentDensity = DENSITY;
            const contrast = options.contrast ?? 10;
            const sliceIndex = -11 + contrast;
            if (sliceIndex < 0) {
                currentDensity = DENSITY.slice(0, sliceIndex);
            }
            if (currentDensity.length === 0) currentDensity = DENSITY;

            const n = currentDensity.length;

            for (let y = 0; y < targetHeight; y++) {
                for (let x = 0; x < targetWidth; x++) {
                    const offset = (y * targetWidth + x) * 4;
                    const avg = (data[offset] + data[offset + 1] + data[offset + 2]) / 3;

                    const k = Math.floor((avg / 255) * n);
                    const charIndex = Math.max(0, Math.min(n - 1, n - 1 - k));

                    art += currentDensity[charIndex];
                }
                art += '\n';
            }

            resolve(art);
        };

        img.onerror = (err) => reject(err);
    });
};
