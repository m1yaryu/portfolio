const toggleButton = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(isDark) {
    body.classList.toggle('dark', isDark);
    toggleButton.setAttribute('aria-pressed', String(isDark));
}

// Use saved choice, otherwise follow the device setting
let saved = null;
try { saved = localStorage.getItem('theme'); } catch (e) {}
applyTheme(saved ? saved === 'dark' : window.matchMedia('(prefers-color-scheme: dark)').matches);

toggleButton.addEventListener('click', () => {
    const isDark = !body.classList.contains('dark');
    applyTheme(isDark);
    try { localStorage.setItem('theme', isDark ? 'dark' : 'light'); } catch (e) {}
});

// Show each placeholder's image (data-src) once the file loads.
// If it can't be found, the box says which file it was looking for.
document.querySelectorAll('.ph[data-src]').forEach(box => {
    const src = box.dataset.src;
    box.textContent = 'Looking for: ' + src;
    const img = new Image();
    img.onload = () => {
        box.style.backgroundImage = `url("${src}")`;
        box.textContent = '';
        box.classList.add('loaded');
    };
    img.onerror = () => {
        box.textContent = 'File not found: ' + src;
        console.warn('Image not found:', src);
    };
    img.src = src;
});
