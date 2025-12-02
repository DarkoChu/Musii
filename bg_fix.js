document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;
    const computedStyle = getComputedStyle(root);

    // 1. Get the original accent colors
    // We use trim() to remove any extra spaces
    const accent1 = computedStyle.getPropertyValue('--accent1').trim();
    const accent2 = computedStyle.getPropertyValue('--accent2').trim();

    console.log("Found Accent 1:", accent1); // Debugging log
    console.log("Found Accent 2:", accent2); // Debugging log

    // 2. Helper to parse ANY color format (Hex or RGB) into {r,g,b}
    function parseColor(colorStr) {
        if (colorStr.startsWith('#')) {
            // Handle Hex
            let hex = colorStr.replace('#', '');
            if (hex.length === 3) {
                hex = hex.split('').map(c => c + c).join(''); // Expand shorthand #ABC to #AABBCC
            }
            return {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
            };
        } else if (colorStr.startsWith('rgb')) {
            // Handle RGB/RGBA
            const values = colorStr.match(/\d+/g).map(Number);
            return { r: values[0], g: values[1], b: values[2] };
        }
        return { r: 0, g: 0, b: 0 }; // Fallback black
    }

    // 3. Helper to mix color with white
    function brighten(colorStr, factor) {
        const c = parseColor(colorStr);
        
        // Formula: Current + (White - Current) * Factor
        const newR = Math.round(c.r + (255 - c.r) * factor);
        const newG = Math.round(c.g + (255 - c.g) * factor);
        const newB = Math.round(c.b + (255 - c.b) * factor);

        return `rgb(${newR}, ${newG}, ${newB})`;
    }

    // 4. Apply the new colors
    // 0.85 = 85% White, 15% Color
    root.style.setProperty('--bg1', brighten(accent1, 0.85));
    root.style.setProperty('--bg2', brighten(accent2, 0.85));
    
    console.log("Background colors updated successfully.");
});