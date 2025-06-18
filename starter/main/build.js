import { readFileSync, writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { parse } from 'toml';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read the TOML content
const contentPath = join(__dirname, 'content.toml');
const content = parse(readFileSync(contentPath, 'utf-8'));

// Create a simple HTML file for GitHub Pages
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fable Presentation</title>
    <link rel="stylesheet" href="styles.css">
    <style>
        body { margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; }
        .slide { display: none; max-width: 800px; margin: 0 auto; }
        .slide.active { display: block; }
        .slide h1 { color: #333; border-bottom: 2px solid #007acc; padding-bottom: 10px; }
        .slide p { line-height: 1.6; color: #555; }
        .slide ul { line-height: 1.8; }
        .slide code { background: #f4f4f4; padding: 2px 4px; border-radius: 3px; }
        .slide pre { background: #f8f8f8; padding: 15px; border-radius: 5px; overflow-x: auto; }
        .controls { text-align: center; margin: 20px 0; }
        .controls button { margin: 0 10px; padding: 10px 20px; background: #007acc; color: white; border: none; border-radius: 5px; cursor: pointer; }
        .controls button:hover { background: #005a9e; }
        .slide-counter { text-align: center; color: #666; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="controls">
        <button onclick="previousSlide()">← Previous</button>
        <button onclick="nextSlide()">Next →</button>
        <button onclick="toggleFullscreen()">Fullscreen</button>
    </div>
    <div class="slide-counter">
        <span id="current-slide">1</span> / <span id="total-slides">${content.pages.length}</span>
    </div>
    <div id="slides">
        ${content.pages.map((page, index) => {
            const slideClass = index === 0 ? 'slide active' : 'slide';
            let content = '';
            
            if (page.template === 'Cover') {
                content = `<h1>${page.title || 'Untitled'}</h1>`;
            } else if (page.template === 'Basic') {
                content = `
                    <h1>${page.title || 'Untitled'}</h1>
                    <div>${page.text || ''}</div>
                `;
            } else {
                content = `
                    <h1>${page.title || 'Untitled'}</h1>
                    <div>${page.text || ''}</div>
                `;
            }
            
            return `<div class="${slideClass}" id="slide-${index + 1}">${content}</div>`;
        }).join('')}
    </div>

    <script>
        let currentSlide = 1;
        const totalSlides = ${content.pages.length};

        function showSlide(n) {
            const slides = document.querySelectorAll('.slide');
            slides.forEach(slide => slide.classList.remove('active'));
            
            const currentSlideElement = document.getElementById('slide-' + n);
            if (currentSlideElement) {
                currentSlideElement.classList.add('active');
            }
            
            document.getElementById('current-slide').textContent = n;
        }

        function nextSlide() {
            if (currentSlide < totalSlides) {
                currentSlide++;
                showSlide(currentSlide);
            }
        }

        function previousSlide() {
            if (currentSlide > 1) {
                currentSlide--;
                showSlide(currentSlide);
            }
        }

        function toggleFullscreen() {
            if (!document.fullscreenElement) {
                document.documentElement.requestFullscreen();
            } else {
                document.exitFullscreen();
            }
        }

        // Keyboard navigation
        document.addEventListener('keydown', function(e) {
            if (e.key === 'ArrowRight' || e.key === ' ') {
                nextSlide();
            } else if (e.key === 'ArrowLeft') {
                previousSlide();
            } else if (e.key === 'f' || e.key === 'F') {
                toggleFullscreen();
            }
        });

        // Initialize
        showSlide(1);
    </script>
</body>
</html>`;

// Write the HTML file
const publicDir = join(__dirname, 'public');
mkdirSync(publicDir, { recursive: true });
writeFileSync(join(publicDir, 'index.html'), html);

console.log('Static presentation built successfully!'); 