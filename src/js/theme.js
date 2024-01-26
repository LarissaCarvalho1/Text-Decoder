const html = document.documentElement;
const checkbox = document.querySelector('.js-checkbox');

function toggleTheme() {
    html.classList.toggle("dark", checkbox.checked);

    if (checkbox.checked) {
        saveTheme("light");
    } else {
        saveTheme("dark");
    }
}

function saveTheme(theme) {
    localStorage.setItem("theme", theme);
}

function initTheme() {
    const theme = localStorage.getItem("theme");

    if (theme === "light") {
        checkbox.checked = false;
        html.classList.remove("dark");
    } else {
        checkbox.checked = true;
        html.classList.add("dark");
    }
}

// Chama a função initTheme para configurar o tema inicial
initTheme();

// Adiciona um ouvinte de evento para o checkbox
checkbox.addEventListener('change', toggleTheme);



