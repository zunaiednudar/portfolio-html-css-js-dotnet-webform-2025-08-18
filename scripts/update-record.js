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