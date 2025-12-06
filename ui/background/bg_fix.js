document.addEventListener("DOMContentLoaded", () => {
    const root = document.documentElement;

    function parseColor(colorStr) {
        colorStr = colorStr.trim();

        if (colorStr.startsWith('#')) {
            let hex = colorStr.slice(1);
            if (hex.length === 3) hex = hex.split('').map(c => c + c).join('');
            return {
                r: parseInt(hex.substring(0, 2), 16),
                g: parseInt(hex.substring(2, 4), 16),
                b: parseInt(hex.substring(4, 6), 16)
            };
        }

        if (colorStr.startsWith("rgb")) {
            const values = colorStr.match(/\d+/g).map(Number);
            return { r: values[0], g: values[1], b: values[2] };
        }

        return { r: 0, g: 0, b: 0 };
    }

    function brighten(colorStr, factor) {
        const c = parseColor(colorStr);
        return `rgb(${
            Math.round(c.r + (255 - c.r) * factor) }, ${
            Math.round(c.g + (255 - c.g) * factor) }, ${
            Math.round(c.b + (255 - c.b) * factor) })`;
    }

    function applyBrightenedTheme() {
        const styles = getComputedStyle(root);
        const accent1 = styles.getPropertyValue("--accent1").trim();
        const accent2 = styles.getPropertyValue("--accent2").trim();

        root.style.setProperty("--bg1", brighten(accent1, 0.85));
        root.style.setProperty("--bg2", brighten(accent2, 0.85));
    }

    const observer = new MutationObserver(() => {
        applyBrightenedTheme();
    });

    observer.observe(root, { attributes: true, attributeFilter: ["class"] });

    applyBrightenedTheme();
});
