// SESSION-BASED ANIMATION
window.addEventListener('load', () => {
    // Animate header tabs
    if (!sessionStorage.getItem('tabsAnimated')) {
        const siteFormHeaderTabs = document.querySelectorAll(".site-form-div-header-nav-ul-li");
        siteFormHeaderTabs.forEach((tab, index) => {
            // Set initial position off-screen
            tab.style.transform = "translateX(100px)";
            tab.style.opacity = "0";
            // Force browser to register initial state
            tab.offsetHeight;
            tab.style.transition = "transform 0.5s ease, opacity 0.5s ease-in";
            // Animate into view with staggered delay
            setTimeout(() => {
                tab.style.transform = "translateX(0)";
                tab.style.opacity = "1"; // Fade-in effect
            }, 100 * index);
        });
        // Mark tabs as animated for this session
        sessionStorage.setItem('tabsAnimated', 'true');
    }
});
// SESSION-BASED ANIMATION
window.addEventListener('load', () => {
    // Animate header name
    if (!sessionStorage.getItem('nameAnimated')) {
        const siteFormHeaderName = document.querySelector(".site-form-div-header-h1-name");
        // Set initial position off-screen
        siteFormHeaderName.style.transform = "translateX(-50px)";
        siteFormHeaderName.style.opacity = "0";
        // Force browser to register initial state
        siteFormHeaderName.offsetHeight;
        siteFormHeaderName.style.transition = "transform 0.5s ease, opacity 0.5s ease-in";
        // Animate into view with staggered delay
        setTimeout(() => {
            siteFormHeaderName.style.transform = "translateX(0)";
            siteFormHeaderName.style.opacity = "1"; // Fade-in effect
        }, 50);
        // Mark name as animated for this session
        sessionStorage.setItem('nameAnimated', 'true');
    }
});
document.addEventListener("DOMContentLoaded", () => {
    let sunIcon = document.querySelector('.site-form-div-header-nav-button-toggle-view-mode .fa-sun');
    let moonIcon = document.querySelector('.site-form-div-header-nav-button-toggle-view-mode .fa-moon');
    function setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + value + expires + "; path=/";
    }
    // COOKIES IMPLEMENTATION
    function getCookie(name) {
        let nameEQ = name + "=";
        let ca = document.cookie.split(';');
        for (let c of ca) {
            while (c.charAt(0) === ' ') c = c.substring(1);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length);
        }
        return null;
    }
    function updateThemeIcon() {
        if (document.documentElement.classList.contains("light")) {
            sunIcon.style.display = "none";
            moonIcon.style.display = "inline-block";
        } else {
            sunIcon.style.display = "inline-block";
            moonIcon.style.display = "none";
        }
    }
    // Load saved theme from cookies
    const savedTheme = getCookie("viewMode");
    if (savedTheme === "light") {
        document.documentElement.classList.add("light");
    } else {
        document.documentElement.classList.remove("light");
    }
    updateThemeIcon();
    // Toggle to light mode
    document.querySelector(".site-form-div-header-nav-button-toggle-view-mode .fa-sun").addEventListener("click", e => {
        e.preventDefault();
        document.documentElement.classList.add("light");
        setCookie("viewMode", "light", 30); // Save preference for 30 days
        updateThemeIcon();
    });
    // Toggle to dark mode
    document.querySelector(".site-form-div-header-nav-button-toggle-view-mode .fa-moon").addEventListener("click", e => {
        e.preventDefault();
        document.documentElement.classList.remove("light");
        setCookie("viewMode", "dark", 30); // Save preference for 30 days
        updateThemeIcon();
    });
});
