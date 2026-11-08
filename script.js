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
