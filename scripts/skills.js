function getCookie(name) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(';');
    for (let c of ca) {
        while (c.charAt(0) === ' ') c = c.substring(1);
        if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
    }
    return null;
}
window.addEventListener('load', () => {
    // Load saved theme from cookies
    const savedTheme = getCookie("viewMode");
    if (savedTheme !== null) {
        if (savedTheme === "light") {
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("light");
        }
    }
    // Animate categories
    document.querySelectorAll(".skills-category").forEach((category, index) => {
        setTimeout(() => {
            category.style.opacity = '1';
        }, 200 * index);
    });
    // Animate skill bars
    document.querySelectorAll(".skill-bar").forEach((bar, index) => {
        const width = bar.style.width;
        bar.style.width = '0';
        setTimeout(() => {
            bar.style.width = width;
        }, 100 * index);
    });
});
window.addEventListener('message', event => {
    // Check if the message is from the same origin
    if (event.origin !== window.location.origin) {
        return;
    }
    // Only reload the page when "themeChanged" is received
    if (event.data === "themeChanged") {
        location.reload(); // Reload the page to apply the new theme
    }
});