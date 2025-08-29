document.addEventListener("DOMContentLoaded", () => {
    let sunIcon = document.querySelector('.site-form-div-header-nav-button-toggle-view-mode .fa-sun');
    let moonIcon = document.querySelector('.site-form-div-header-nav-button-toggle-view-mode .fa-moon');
    function updateThemeIcon() {
        if (document.documentElement.classList.contains("light")) {
            sunIcon.style.display = "none";
            moonIcon.style.display = "inline-block";
        } else {
            sunIcon.style.display = "inline-block";
            moonIcon.style.display = "none";
        }
    }
    document.querySelector(".site-form-div-header-nav-button-toggle-view-mode .fa-sun").addEventListener("click", e => {
        e.preventDefault();
        document.documentElement.classList.add("light");
        sunIcon.style.display = "none";
        moonIcon.style.display = "inline-block";
    });
    document.querySelector(".site-form-div-header-nav-button-toggle-view-mode .fa-moon").addEventListener("click", e => {
        e.preventDefault();
        document.documentElement.classList.remove("light");
        sunIcon.style.display = "inline-block";
        moonIcon.style.display = "none";
    });
    updateThemeIcon();
});
