window.addEventListener('load', () => {
    // Fetch and display blogs
    fetchBlogs();
});
function fetchBlogs() {
    fetch('Blogs.aspx/GetBlogs', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => response.json())
        .then(data => {
            let blogs = JSON.parse(data.d); // Parse the JSON string into an object (IMPORTANT)
            let blogsSectionUl = document.querySelector(".blogs-section-ul");
            blogsSectionUl.innerHTML = ""; // Clear old content
            blogs.forEach((blog) => {
                let item = document.createElement("li");
                item.classList.add("blogs-section-ul-li");
                let itemA = document.createElement("a");
                itemA.href = blog.BLink;
                itemA.target = '_blank';
                let itemTitle = document.createElement("h3");
                itemTitle.textContent = blog.BTitle;
                let itemDescription = document.createElement("p");
                itemDescription.textContent = blog.BDescription;
                itemA.appendChild(itemTitle);
                itemA.appendChild(itemDescription);
                if (blog.BDate !== null) {
                    let itemDate = document.createElement("strong");
                    itemDate.textContent = blog.BDate;
                    itemA.appendChild(document.createElement("p").appendChild(itemDate));
                }
                item.appendChild(itemA);
                blogsSectionUl.appendChild(item);
                console.log(blog.BTitle);
            });
            animateBlogItems();
        })
        .catch(err => console.error("Error fetching blogs: ", err));
}
function animateBlogItems() {
    let blogItems = document.querySelectorAll(".blogs-section-ul-li");
    let blogsList = document.querySelector(".blogs-section-ul");
    blogItems.forEach((blogItem, index) => {
        blogItem.style.transform = 'translateY(-200%)';
        blogItem.style.opacity = '0';
        setTimeout(() => {
            blogItem.style.transform = 'translateY(0)';
            blogItem.style.opacity = '1';
        }, 100 * (index + 1));
    });
}