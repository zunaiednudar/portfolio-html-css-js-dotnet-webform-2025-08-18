const link_github = "https://github.com/zunaiednudar";
const link_linkedin = "https://www.linkedin.com/in/zunaied-nudar-a1226525b/";
const link_facebook = "https://www.facebook.com/profile.php?id=100085206264056";
const link_instagram = "https://www.threads.com/@zunaiednudar?xmt=AQF0_SyAg6R5n3YBhdgy1a7SATycWfW7t-uLot5UP1z6s-w";
window.addEventListener('load', () => {
    const homeSectionLeftSidebarIcon = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-icon > i");
    const homeSectionRightImg = document.querySelector(".home-section-right-img");
    homeSectionLeftSidebarIcon.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
        }, 100 * index);
    });
    setTimeout(() => {
        homeSectionRightImg.style.transform = 'translateX(-200px)';
    }, 50);
});
function capitalizeFirstLetter(string) {
    if (!string) return "";
    return string.charAt(0).toUpperCase() + string.slice(1);
}
function fetchArticles() {
    fetch('Home.aspx/GetArticles', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let articles = data.d; // Actual JSON returned by WebMethod (data.d)
            if (typeof data.d === "string") {
                try {
                    articles = JSON.parse(articles); // Parse the JSON string into an object (IMPORTANT)
                } catch (e) {
                    console.error("Error parsing JSON:", e);
                    return;
                }
            }
            if (!Array.isArray(articles)) {
                articles = [articles] // Ensure articles is an array
            }
            let homeSectionLeftArticles = document.querySelector(".home-section-left-div-articles"); // Container for articles
            let homeSectionLeftSidebarTabs = document.querySelector("#home-sidebar-ul-tabs");
            homeSectionLeftArticles.innerHTML = ""; // Clear existing articles
            homeSectionLeftSidebarTabs.innerHTML = ""; // Clear existing tabs
            articles.forEach(article => {
                // Set the container: <article>
                let _article = document.createElement('article');
                _article.classList.add('home-section-left-article');
                _article.id = `article-${article["ArticleName"]}`;
                // Set the title: <h2>
                let _article_h2_title = document.createElement('h2');
                _article_h2_title.classList.add('article-title');
                _article_h2_title.textContent = article["ArticleTitle"];
                // Set the description: <p>
                let _article_p_description = document.createElement('p');
                _article_p_description.classList.add('article-description');
                _article_p_description.textContent = article["ArticleDescription"];
                // Append elements to the container
                _article.appendChild(_article_h2_title);
                _article.appendChild(_article_p_description);
                // Append the container to homeSectionLeftArticles
                homeSectionLeftArticles.appendChild(_article);
                // Set the corresponding tab: <li>
                let _article_li_tab = document.createElement('li');
                _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
                _article_li_tab.setAttribute('data-target', `article-${article["ArticleName"]}`);
                // Set and append horizontal line before tab: <hr>
                _article_li_tab.appendChild(document.createElement('hr'));
                // Set and append the tab link: <a>
                let _article_li_tab_a_title = document.createElement('a');
                _article_li_tab_a_title.textContent = capitalizeFirstLetter(article["ArticleName"]);
                _article_li_tab_a_title.href = "#";
                _article_li_tab.appendChild(_article_li_tab_a_title);
                // Append the tab to the homeSectionLeftSidebarTabs
                homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
            });
            // Detached tabs
            // Set the contact container: <article>
            let _article = document.createElement('article');
            _article.classList.add('home-section-left-article');
            _article.id = "article-contact";
            // Append the contact container to homeSectionLeftArticles
            homeSectionLeftArticles.appendChild(_article);
            // Set the contact tab: <li>
            let _article_li_tab = document.createElement('li');
            _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
            _article_li_tab.setAttribute('data-target', "article-contact");
            // Set and append horizontal line before contact tab: <hr>
            _article_li_tab.appendChild(document.createElement('hr'));
            // Set and append the contact tab link: <a>
            let _article_li_tab_a_title = document.createElement('a');
            _article_li_tab_a_title.textContent = "Contact";
            _article_li_tab_a_title.href = "#";
            _article_li_tab.appendChild(_article_li_tab_a_title);
            // Append the contact tab to the homeSectionLeftSidebarTabs
            homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
            // Show the first article by default
            document.querySelector(`#article-${articles[0]["ArticleName"]}`).style.display = "block";
            // Select the first sidebar tab by default
            document.querySelector(`[data-target="article-${articles[0]["ArticleName"]}"]`).classList.add("selected");
            setTimeout(() => {
                // Animate the opacity of the first article
                document.querySelector(`#article-${articles[0]["ArticleName"]}`).style.opacity = '1';
                // Animate the horizontal line of the first sidebar tab
                document.querySelector(`[data-target="article-${articles[0]["ArticleName"]}"]`).querySelector("hr").style.flexGrow = '1';
            }, 50);
            // Add click event listeners to sidebar tabs
            const sideBarLiTabs = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-tab");
            // Add hover effect to sidebar tabs
            sideBarLiTabs.forEach(tab => {
                tab.addEventListener('mouseenter', () => {
                    if (!tab.classList.contains('selected')) {
                        tab.querySelector("hr").style.flexGrow = '1';
                    }
                });
                tab.addEventListener('mouseleave', () => {
                    if (!tab.classList.contains('selected')) {
                        tab.querySelector("hr").style.flexGrow = '0';
                    }
                });
            });
            // Click event to switch articles
            sideBarLiTabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    sideBarLiTabs.forEach(t => {
                        t.classList.remove("selected");
                        // Animate the horizontal line of unselected tabs
                        t.querySelector("hr").style.flexGrow = '0';
                    });
                    tab.classList.add("selected");
                    // Animate the horizontal line of the selected tab
                    tab.querySelector("hr").style.flexGrow = '1';
                    const targetId = tab.getAttribute("data-target");
                    const targetArticle = document.querySelector(`#${targetId}`);
                    if (!targetArticle) return; // Safety check
                    document.querySelectorAll("article").forEach(article => {
                        article.style.display = "none";
                        article.style.opacity = '0';
                    });
                    targetArticle.style.display = "block";
                    // Animate the opacity of the displayed article
                    setTimeout(() => {
                        targetArticle.style.opacity = '1';
                    }, 30);
                });
            });
        })
        .catch(err => console.error(err));
}
// Run fetchArticles() after the entire page has fully loaded
window.onload = fetchArticles;
const sideBarLiIcons = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-icon");
sideBarLiIcons.forEach(icon => {
    icon.addEventListener("click", (event) => {
        event.preventDefault();
        const info = icon.getAttribute("data-info");
        switch(info) {
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
