document.addEventListener("DOMContentLoaded", () => {
    const postsContainer = document.getElementById("posts-container");

    fetch('https://blogpost-server-production-d92d.up.railway.app/api/v1/blogs')
        .then(response => response.json())
        .then(data => {
            if (data && data.blogs) {
                displayPosts(data.blogs);
                console.log('Blog posts:', data.blogs);
            } else {
                postsContainer.innerHTML = "<p>No blog posts available.</p>";
            }
        })
        .catch(error => {
            console.error('Error fetching the blog posts:', error);
            postsContainer.innerHTML = "<p>Error loading posts. Please try again later.</p>";
        });

    function displayPosts(posts) {

        posts.forEach(post => {
            const postCard = document.createElement('div');
            postCard.className = 'post-card';

            postCard.innerHTML = `
                <div class="post-card__image">
                    <img src="${post.image || './img/placeholder.png'}" alt="${post.title}">
                </div>
                <div class="post-card__content">
                    <h3>${post.title}</h3>
                    <p>${post.excerpt || post.content.slice(0, 100)}...</p>
                    <a href="./pages/blog.html?id=${post.id}" class="post-card__link">Read more</a>
                </div>
            `;

            postsContainer.appendChild(postCard);
        });
    }
});
