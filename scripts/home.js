const link_github = "https://github.com/zunaiednudar";
const link_linkedin = "https://www.linkedin.com/in/zunaied-nudar-a1226525b/";
const link_facebook = "https://www.facebook.com/profile.php?id=100085206264056";
const link_instagram = "https://www.threads.com/@zunaiednudar?xmt=AQF0_SyAg6R5n3YBhdgy1a7SATycWfW7t-uLot5UP1z6s-w";

const sideBarLiTabs = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-tab");
document.querySelector("#article-about").style.display = "block";
sideBarLiTabs.forEach(tab => {
    tab.addEventListener("click", () => {
        sideBarLiTabs.forEach(t => t.classList.remove("selected"));
        tab.classList.add("selected");

        const targetId = tab.getAttribute("data-target");
        //console.log(targetId);
        document.querySelectorAll("article").forEach(article => article.style.display = "none");
        document.querySelector(`#${targetId}`).style.display = "block";
    });
});
const sideBarLiIcons = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-icon");
sideBarLiIcons.forEach(icon => {
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        const info = icon.getAttribute("data-info");
        switch (info) {
            case "github":
                window.open(link_github, "_blank");
                break;
            case "linkedin":
                window.open(link_linkedin, "_blank");
                break;
            case "facebook":
                window.open(link_facebook, "_blank");
                break;
            case "instagram":
                window.open(link_instagram, "_blank");
                break;
            default:
                break;
        }
    });
});