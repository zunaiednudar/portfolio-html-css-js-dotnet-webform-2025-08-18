window.addEventListener('load', () => {
    // Fetch and display projects
    fetchProjects();
});
function fetchProjects() {
    fetch('Projects.aspx/GetProjects', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let projects = JSON.parse(data.d); // Parse the JSON string into an object (IMPORTANT)
            let projectsSection = document.querySelector(".projects-section");
            projectsSection.innerHTML = ""; // Clear old content
            projects.forEach((project) => {
                let item = document.createElement("div");
                item.classList.add("project-card");
                let keywords = document.createElement("p");
                keywords.classList.add("keywords");
                let itemDiv = document.createElement("div");
                let itemDivTitle = document.createElement("h3");
                itemDivTitle.textContent = project.PTitle;
                let itemDivDescription = document.createElement("p");
                itemDivDescription.textContent = project.PDescription;
                itemDiv.appendChild(itemDivTitle);
                itemDiv.appendChild(itemDivDescription);  
                if (project.PKeyword1 !== null) {       
                    let keyword1 = document.createElement("span");
                    keyword1.classList.add("keyword");
                    keyword1.textContent = `${project.PKeyword1}`;
                    keywords.appendChild(keyword1);
                }
                if (project.PKeyword2 !== null) {
                    let keyword2 = document.createElement("span");
                    keyword2.classList.add("keyword");
                    keyword2.textContent = `${project.PKeyword2}`;
                    keywords.appendChild(keyword2);
                }
                if (project.PKeyword3 !== null) {
                    let Keyword3 = document.createElement("span");
                    Keyword3.classList.add("keyword");
                    Keyword3.textContent = `${project.PKeyword3}`;
                    keywords.appendChild(Keyword3);
                }
                if (project.PKeyword4 !== null) {
                    let Keyword4 = document.createElement("span");
                    Keyword4.classList.add("keyword");
                    Keyword4.textContent = `${project.PKeyword4}`;
                    keywords.appendChild(Keyword4);
                }
                if (project.PKeyword5 !== null) {
                    let Keyword5 = document.createElement("span");
                    Keyword5.classList.add("keyword");
                    Keyword5.textContent = `${project.PKeyword5}`;
                    keywords.appendChild(Keyword5);
                }
                itemDiv.appendChild(keywords);
                console.log(itemDiv);
                let itemA = document.createElement("a");
                itemA.href = project.PLink;
                itemA.target = '_blank';
                let itemImg = document.createElement("img");
                itemImg.src = project.PImagePath;
                itemImg.alt = project.PTitle;
                itemA.appendChild(itemImg);
                itemA.appendChild(itemDiv);
                item.appendChild(itemA);
                projectsSection.appendChild(item);
            });
            animateProjectItems();
        })
        .catch(err => console.error("Error fetching projects: ", err));
}
function animateProjectItems() {
    let projectCards = document.querySelectorAll(".project-card");
    let projectsSection = document.querySelector(".projects-section");
    // Get number of columns dynamically
    let columnCount = getComputedStyle(projectsSection)
        .getPropertyValue('grid-template-columns')
        .split(` `).length;
    let rows = [];
    for (let i = 0; i < projectCards.length; i += columnCount) {
        rows.push(Array.from(projectCards).slice(i, i + columnCount)); // Group cards by row
    }
    // Animate row by row in alternate direction
    rows.forEach((rowCards, rowIndex) => {
        let direction = rowIndex % 2 === 0 ? 200 : -200; // Alternate direction
        setTimeout(() => {
            rowCards.forEach((card, colIndex) => {
                card.style.opacity = '0';
                card.style.transform = `translateX(${direction}%)`;
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = "translateX(0)";
                }, 100 * (rowIndex + 1) + 100 * (colIndex + 1)); // Make sure the animation time for the first item is not 0
            });
        }, 300 * rowIndex);
    });
}