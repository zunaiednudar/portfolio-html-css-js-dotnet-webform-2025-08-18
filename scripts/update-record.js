document.addEventListener("DOMContentLoaded", function () {
    const textareas = document.querySelectorAll(".auto-resize");
    textareas.forEach(textarea => {
        textarea.style.height = textarea.scrollHeight + "px";
        // Adjust height on input
        textarea.addEventListener("input", function () {
            this.style.height = "auto";
            this.style.height = this.scrollHeight + "px";
        });
    });
});
window.addEventListener('load', () => {
    applyThemeFromCookie();
});
function applyThemeFromCookie() {
    const savedTheme = getCookie("viewMode");
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
    } else {
        document.documentElement.classList.remove("light");
    }
}
function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}