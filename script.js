// H20 Educatie — H20 Pattern Generator
// Brandguide v0.80: transparent squares, sizes 10/20/40/80/160
// Squares touch via sides or corners, no symmetry

function buildPattern(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const sizes   = [10, 20, 40, 80, 160];
    const opacities = [0.8, 0.6, 0.4, 0.2];

    // Generate squares that snap to a 10px grid
    const squareCount = 18;
    const placed = [];

    for (let i = 0; i < squareCount; i++) {
        const size = sizes[Math.floor(Math.random() * sizes.length)];
        const opacity = opacities[Math.floor(Math.random() * opacities.length)];

        let x, y;
        if (placed.length === 0) {
            x = 0; y = 0;
        } else {
            // Snap to an existing square's edge or corner
            const ref = placed[Math.floor(Math.random() * placed.length)];
            const side = Math.floor(Math.random() * 4);
            switch (side) {
                case 0: x = ref.x + ref.size; y = ref.y; break; // right
                case 1: x = ref.x - size;     y = ref.y; break; // left
                case 2: x = ref.x; y = ref.y + ref.size; break; // below
                case 3: x = ref.x; y = ref.y - size;     break; // above
            }
            // Snap to 10px grid
            x = Math.round(x / 10) * 10;
            y = Math.round(y / 10) * 10;
        }

        placed.push({ x, y, size, opacity });
    }

    // Normalize to fit container
    const minX = Math.min(...placed.map(s => s.x));
    const minY = Math.min(...placed.map(s => s.y));

    placed.forEach(sq => {
        const div = document.createElement('div');
        div.style.cssText = `
            position: absolute;
            left: ${sq.x - minX}px;
            top:  ${sq.y - minY}px;
            width:  ${sq.size}px;
            height: ${sq.size}px;
            background: rgba(255,255,255,${sq.opacity});
            pointer-events: none;
        `;
        container.appendChild(div);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    buildPattern('hero-pattern');
    buildPattern('about-pattern');
});
