const link_github = "https://github.com/zunaiednudar";
const link_linkedin = "https://www.linkedin.com/in/zunaied-nudar-a1226525b/";
const link_facebook = "https://www.facebook.com/profile.php?id=100085206264056";
const link_instagram = "https://www.threads.com/@zunaiednudar?xmt=AQF0_SyAg6R5n3YBhdgy1a7SATycWfW7t-uLot5UP1z6s-w";
const typingTimers = new WeakMap(); // To track typing per element
window.addEventListener('load', () => {
    const homeSectionLeftSidebarIcon = document.querySelectorAll(".home-section-left-aside-sidebar-nav-ul-li-icon > i");
    // Only the first right-section image (used for initial animation)
    const homeSectionRightImg = document.querySelector(".home-section-right-img");
    homeSectionLeftSidebarIcon.forEach((icon, index) => {
        setTimeout(() => {
            icon.style.opacity = '1';
        }, 100 * index);
    });
    if (homeSectionRightImg) {
        setTimeout(() => {
            homeSectionRightImg.style.transform = 'translateX(-200px)';
            homeSectionRightImg.style.opacity = '1';
        }, 50);
    }
    // Fetch and display articles
    fetchArticles();
    // Attach click events to social media icons
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
});
window.addEventListener('resize', () => {
    const currentImageId = document.querySelector(".home-section-left-aside-sidebar-nav-ul-li-tab.selected")?.getAttribute("data-image");
    if (currentImageId) {
        const currentImage = document.querySelector(`#${currentImageId}`);
        showImageResponsive(currentImage);
    }
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
            // let articles = data.d; // Actual JSON returned by WebMethod (data.d)
            // if (typeof data.d === "string") {
                // try {
                    // articles = JSON.parse(articles); // Parse the JSON string into an object (IMPORTANT)
                // } catch (e) {
                    // console.error("Error parsing JSON:", e);
                    // return;
                // }
            // }
            // if (!Array.isArray(articles)) {
                // articles = [articles] // Ensure articles is an array
            // }
            let articles = JSON.parse(data.d); // Parse the JSON string into an object (IMPORTANT)
            let homeSectionLeftArticles = document.querySelector(".home-section-left-div-articles"); // Container for articles
            let homeSectionLeftSidebarTabs = document.querySelector("#home-sidebar-ul-tabs");
            let homeSectionRight = document.querySelector(".home-section-right"); // Container for right section images
            homeSectionLeftArticles.innerHTML = ""; // Clear existing articles
            homeSectionLeftSidebarTabs.innerHTML = ""; // Clear existing tabs
            homeSectionRight.innerHTML = ""; // Clear existing images
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
                // _article_p_description.textContent = article["ArticleDescription"];
                // _article_p_description.innerHTML = article["ArticleDescription"]; // Use innerHTML to render HTML content
                let text = article["ArticleDescription"] || "";
                // Replace tabs with 4 spaces
                // text = text.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;");
                text = text.replace(/\t/g, "    ");
                // Replace spaces
                // text = text.replace(/ /g, "&nbsp;");
                text = text.replace(/ /g, " ");
                // Replace newlines with <br>
                text = text.replace(/\n/g, "<br>");
                _article_p_description.innerHTML = text;
                // Save the original HTML for typing
                _article_p_description.setAttribute('data-fullhtml', text);
                // Append elements to the container
                _article.appendChild(_article_h2_title);
                _article.appendChild(_article_p_description);
                // Append the container to homeSectionLeftArticles
                homeSectionLeftArticles.appendChild(_article);
                // Set the corresponding tab: <li>
                let _article_li_tab = document.createElement('li');
                _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
                _article_li_tab.setAttribute('data-target', `article-${article["ArticleName"]}`);
                _article_li_tab.setAttribute('data-image', `image-${article["ArticleName"]}`);
                // Set and append horizontal line before tab: <hr>
                _article_li_tab.appendChild(document.createElement('hr'));
                // Set and append the tab link: <a>
                let _article_li_tab_a_title = document.createElement('a');
                _article_li_tab_a_title.textContent = capitalizeFirstLetter(article["ArticleName"]);
                _article_li_tab_a_title.href = "#";
                _article_li_tab.appendChild(_article_li_tab_a_title);
                // Append the tab to the homeSectionLeftSidebarTabs
                homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
                // Set the corresponding image: <img>
                let _article_img = document.createElement('img');
                _article_img.classList.add('home-section-right-img');
                _article_img.id = `image-${article["ArticleName"]}`;
                _article_img.src = article["ImagePath"];
                // Append the image to the homeSectionRight
                homeSectionRight.appendChild(_article_img);
            });
            // Detached tabs
            // Set the skills container: <article>
            let _article = document.createElement('article');
            _article.classList.add('home-section-left-article');
            _article.id = "article-skills";
            // Set and append iframe for contact form
            let iframe = document.createElement('iframe');
            iframe.id = "skillsIframe";
            iframe.src = "Skills.aspx";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.style.border = "none";
            iframe.title = "MySkills";
            // Append iframe to the contact article
            _article.appendChild(iframe);
            // Append the skills container to homeSectionLeftArticles
            homeSectionLeftArticles.appendChild(_article);
            // Set the skills tab: <li>
            let _article_li_tab = document.createElement('li');
            _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
            _article_li_tab.setAttribute('data-target', "article-skills");
            _article_li_tab.setAttribute('data-image', "image-skills");
            // Set and append horizontal line before skills tab: <hr>
            _article_li_tab.appendChild(document.createElement('hr'));
            // Set and append the skills tab link: <a>
            let _article_li_tab_a_title = document.createElement('a');
            _article_li_tab_a_title.textContent = "Skills";
            _article_li_tab_a_title.href = "#";
            _article_li_tab.appendChild(_article_li_tab_a_title);
            // Append the skills tab to the homeSectionLeftSidebarTabs
            homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
            // Set the skills image: <img>
            let _article_img = document.createElement('img');
            _article_img.classList.add('home-section-right-img');
            _article_img.id = "image-skills";
            _article_img.src = "images/logo-skills.jpg";
            // Append the image to the homeSectionRight
            homeSectionRight.appendChild(_article_img);
            // Set the education container: <article>
            _article = document.createElement('article');
            _article.classList.add('home-section-left-article');
            _article.id = "article-education";
            // Append the education container to homeSectionLeftArticles
            homeSectionLeftArticles.appendChild(_article);
            // Set the education tab: <li>
            _article_li_tab = document.createElement('li');
            _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
            _article_li_tab.setAttribute('data-target', "article-education");
            _article_li_tab.setAttribute('data-image', "image-education");
            // Set and append horizontal line before education tab: <hr>
            _article_li_tab.appendChild(document.createElement('hr'));
            // Set and append the education tab link: <a>
            _article_li_tab_a_title = document.createElement('a');
            _article_li_tab_a_title.textContent = "Education";
            _article_li_tab_a_title.href = "#";
            _article_li_tab.appendChild(_article_li_tab_a_title);
            // Append the education tab to the homeSectionLeftSidebarTabs
            homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
            // Set the education image: <img>
            _article_img = document.createElement('img');
            _article_img.classList.add('home-section-right-img');
            _article_img.id = "image-education";
            _article_img.src = "images/logo-education.jpg";
            // Append the image to the homeSectionRight
            homeSectionRight.appendChild(_article_img);
            // Set the contact container: <article>
            _article = document.createElement('article');
            _article.classList.add('home-section-left-article');
            _article.id = "article-contact";
            // Set and append iframe for contact form
            iframe = document.createElement('iframe');
            iframe.id = "contactIframe";
            iframe.src = "Contact.aspx";
            iframe.width = "100%";
            iframe.height = "100%";
            iframe.style.border = "none";
            iframe.title = "ContactForm";
            // Append iframe to the contact article
            _article.appendChild(iframe);
            // Append the contact container to homeSectionLeftArticles
            homeSectionLeftArticles.appendChild(_article);
            // Set the contact tab: <li>
            _article_li_tab = document.createElement('li');
            _article_li_tab.classList.add('home-section-left-aside-sidebar-nav-ul-li-tab');
            _article_li_tab.setAttribute('data-target', "article-contact");
            _article_li_tab.setAttribute('data-image', "image-contact");
            // Set and append horizontal line before contact tab: <hr>
            _article_li_tab.appendChild(document.createElement('hr'));
            // Set and append the contact tab link: <a>
            _article_li_tab_a_title = document.createElement('a');
            _article_li_tab_a_title.textContent = "Contact";
            _article_li_tab_a_title.href = "#";
            _article_li_tab.appendChild(_article_li_tab_a_title);
            // Append the contact tab to the homeSectionLeftSidebarTabs
            homeSectionLeftSidebarTabs.appendChild(_article_li_tab);
            // Set the contact image: <img>
            _article_img = document.createElement('img');
            _article_img.classList.add('home-section-right-img');
            _article_img.id = "image-contact";
            _article_img.src = "images/logo-contact.jpg";
            // Append the image to the homeSectionRight
            homeSectionRight.appendChild(_article_img);
            // Show the first article by default
            // document.querySelector(`#article-${articles[0]["ArticleName"]}`).style.display = "block";
            // Select the first sidebar tab by default
            // document.querySelector(`[data-target="article-${articles[0]["ArticleName"]}"]`).classList.add("selected");
            // Show the first image by default
            // document.querySelector(`#image-${articles[0]["ArticleName"]}`).style.display = "block";
            // SESSION IMPLEMENTATION
            // Check session storage for previously selected tab
            let savedTab = sessionStorage.getItem("selectedTab");
            // If found, display that tab instead of the first one
            let defaultTabId = savedTab ? savedTab : `article-${articles[0]["ArticleName"]}`;
            // Get corresponding image ID
            let defaultImageId = savedTab ? document.querySelector(`[data-target="${savedTab}"]`)?.getAttribute("data-image") : `image-${articles[0]["ArticleName"]}`;
            // Safety check if the saved tab exists in the current articles
            if (!document.querySelector(`#${defaultTabId}`)) {
                defaultTabId = `article-${articles[0]["ArticleName"]}`;
                defaultImageId = `image-${articles[0]["ArticleName"]}`;
            }
            // Display the default article + image
            document.querySelector(`#${defaultTabId}`).style.display = "block";
            document.querySelector(`[data-target="${defaultTabId}"]`).classList.add("selected");
            // document.querySelector(`#${defaultImageId}`).style.display = "block";
            showImageResponsive(document.querySelector(`#${defaultImageId}`));
            // Deploy typing effect for the first loaded article if applicable
            if (defaultTabId !== "article-education" && defaultTabId !== "article-contact" && defaultTabId !== "article-skills") {
                const typingElement = document.querySelector(`#${defaultTabId} .article-description`);
                // typeHTML(typingElement, 5);
                runTypingOnce(typingElement, 5);
            }
            setTimeout(() => {
                // Animate the opacity of the first article
                // document.querySelector(`#article-${articles[0]["ArticleName"]}`).style.opacity = '1';
                // Animate the horizontal line of the first sidebar tab
                // document.querySelector(`[data-target="article-${articles[0]["ArticleName"]}"]`).querySelector("hr").style.flexGrow = '1';
                // Animate the position and opacity of the first image
                // document.querySelector(`#image-${articles[0]["ArticleName"]}`).style.transform = 'translateX(-200px)';
                // document.querySelector(`#image-${articles[0]["ArticleName"]}`).style.opacity = '1';
                // Animate the opacity of the default article
                document.querySelector(`#${defaultTabId}`).style.opacity = '1';
                // Animate the horizontal line of the default sidebar tab
                document.querySelector(`[data-target="${defaultTabId}"]`).querySelector("hr").style.flexGrow = '1';
                // Animate the position and opacity of the default image
                if (window.innerWidth > 1024) {
                    document.querySelector(`#${defaultImageId}`).style.transform = "translateX(-200px)";
                    document.querySelector(`#${defaultImageId}`).style.opacity = '1';
                }
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
            // SESSION STORAGE FOR SELECTED TAB
            // Click event to switch articles
            sideBarLiTabs.forEach(tab => {
                tab.addEventListener("click", () => {
                    // Save selected tab to session storage
                    sessionStorage.setItem('selectedTab', tab.getAttribute('data-target'));
                    sideBarLiTabs.forEach(t => {
                        t.classList.remove("selected");
                        // Animate the horizontal line of unselected tabs
                        t.querySelector("hr").style.flexGrow = '0';
                    });
                    tab.classList.add("selected");
                    // Animate the horizontal line of the selected tab
                    tab.querySelector("hr").style.flexGrow = '1';
                    const targetId = tab.getAttribute("data-target");
                    const targetImageId = tab.getAttribute("data-image");
                    const targetArticle = document.querySelector(`#${targetId}`);
                    const targetImage = document.querySelector(`#${targetImageId}`);
                    if (!targetArticle) return; // Safety check
                    if (targetId === "article-education") animateEducationItems();
                    homeSectionLeftArticles.querySelectorAll("article").forEach(article => {
                        article.style.display = "none";
                        article.style.opacity = '0';
                    });
                    homeSectionRight.querySelectorAll("img").forEach(img => {
                        img.style.display = "none";
                        img.style.transform = 'translateX(-100px)';
                        img.style.opacity = '0';
                    });
                    targetArticle.style.display = "block";
                    // targetImage.style.display = "block";
                    showImageResponsive(targetImage);
                    if (targetId !== "article-education" && targetId !== "article-contact" && targetId !== "article-skills") {
                        const typingElement = targetArticle.querySelector('.article-description');
                        // typeText(typingElement, 20);
                        // typingElement.setAttribute('data-fullhtml', typingElement.innerHTML);
                        // typeHTML(typingElement, 5);
                        runTypingOnce(typingElement, 5);
                    }
                    // Animate the opacity and image of the displayed article
                    setTimeout(() => {
                        targetArticle.style.opacity = '1';
                        if (window.innerWidth > 1024) {
                            targetImage.style.transform = 'translateX(-200px)';
                            targetImage.style.opacity = '1';
                        }
                    }, 30);
                });
            });
            // Fetch and display education
            fetchEducation();
        })
        .catch(err => console.error(err));
}
function fetchEducation() {
    return fetch('Home.aspx/GetEducation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let education = JSON.parse(data.d); // Parse the JSON string into an object (IMPORTANT)
            let educationArticle = document.querySelector("#article-education");
            educationArticle.innerHTML = ""; // Clear old content
            let timeline = document.createElement("div"); // Create horizontal timeline
            timeline.classList.add("timeline");
            education.forEach((educationStage, index) => {
                let item = document.createElement("div");
                item.classList.add("timeline-item");
                // Alternate item position left/right
                item.classList.add(index % 2 === 0 ? "left" : "right");
                item.innerHTML = `
                    <h3>${educationStage.Title}</h3>
                    <p>${educationStage.Institution}</p>
                    <span>${educationStage.StartYear} - ${educationStage.EndYear}</span>
                `;
                // item.appendChild(content);
                timeline.appendChild(item);
            });
            educationArticle.appendChild(timeline);
            let verticalLine = document.createElement("div");
            verticalLine.classList.add("vertical-line");
            educationArticle.appendChild(verticalLine);
            animateEducationItems();
        })
        .catch(err => console.error("Error fetching education: ", err));
}
function animateEducationItems() {
    let educationArticleItems = document.querySelectorAll("#article-education .timeline-item");
    educationArticleItems.forEach((item, index) => {
        item.style.opacity = '0'; // reset before animating
        setTimeout(() => {
            item.style.opacity = '1';
        }, 100 * index);
    });
}
function typeHTML(element, speed = 30) {
    // Cancel any ongoing typing
    if (typingTimers.has(element)) {
        clearTimeout(typingTimers.get(element));
        typingTimers.delete(element);
    }
    const fullHTML = element.getAttribute('data-fullhtml') || element.innerHTML; // Keep existing formatting
    if (!fullHTML) return; // Nothing to type
    element.innerHTML = ''; // Clear before typing
    let i = 0;
    function type() {
        // If the current char is part of an HTML tag, type the whole tag at once
        if (fullHTML[i] === '<') {
            let endTag = fullHTML.indexOf('>', i);
            if (endTag !== -1) {
                element.innerHTML += fullHTML.slice(i, endTag + 1);
                i = endTag + 1;
            } else {
                element.innerHTML += fullHTML[i];
                i++;
            }
        } else {
            element.innerHTML += fullHTML[i];
            i++;
        }
        if (i < fullHTML.length) {
            const timer = setTimeout(type, speed);
            typingTimers.set(element, timer); // Save the timer
        } else {
            typingTimers.delete(element);
        }
    }
    type();
}
function runTypingOnce(element, speed = 30) {
    const articleId = element.closest('article').id;
    const typedKey = `typed-${articleId}`; // Key to store in sessionStorage
    // If already typed in this session, just show full content
    if (sessionStorage.getItem(typedKey)) {
        element.innerHTML = element.getAttribute('data-fullhtml');
        return;
    }
    // Otherwise, run typing
    typeHTML(element, speed);
    // Mark as typed
    sessionStorage.setItem(typedKey, "true");
}
function showImageResponsive(targetImage) {
    const isTablet = window.innerWidth <= 1024;
    if (!targetImage) return;
    if (isTablet) {
        targetImage.style.display = "block";
        targetImage.style.position = "relative";
        targetImage.style.transform = "none";
        targetImage.style.opacity = "1";
        targetImage.style.margin = "0 auto 20px auto";
    } else {
        targetImage.style.display = "block";
        targetImage.style.position = "";
        setTimeout(() => {
            targetImage.style.transform = "translateX(-200px)";
            targetImage.style.opacity = "1";
        }, 30);
    }
}
// Run fetchArticles() after the entire page has fully loaded
// window.onload = fetchArticles;
// window.addEventListener("load", fetchArticles); // Handled at the top

