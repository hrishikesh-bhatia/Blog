document.getElementById('logoutBtn')?.addEventListener('click', async () => {
  fetch('/api/auth/logout', {
    method: 'GET',
    credentials: 'include',
  })
    .then(res => res.json())
    .then(data => {
      console.log(data.message);
      window.location.href = '/';
    })
    .catch(err => {
      console.error('Logout Error:', err);
      alert('Logout failed. Please try again.');
    });
});
async function visi(blogId) {
      try {
        const response = await fetch(`/api/blogs/get/${blogId}`);
        const data = await response.json();
        const blog = data.blog; 
        console.log(blog)
        const title = blog.title;
        console.log(title)
        const content = blog.content;

        document.getElementById('preview-title').textContent = title;
        document.getElementById('preview-content').innerText = content;

        document.getElementById('preview-modal').style.display = 'block';

        document.getElementById('close-modal')?.addEventListener('click', () => {
          document.getElementById('preview-modal').style.display = 'none';
        });

        window.addEventListener('click', (e) => {
          const modal = document.getElementById('preview-modal');
          if (e.target === modal) {
            modal.style.display = 'none';
          }
        });
      } catch (err) {
        console.error("Error opening blog:", err);
      }
    }


    async function loadBlogs() {
      try {
        const response = await fetch('/api/blogs/getallblogs'); // Replace with your actual endpoint
        const data = await response.json();
        const blogs = data.data;
        if (!Array.isArray(blogs)) throw new Error("Expected an array but got something else");

        const div = document.querySelector('#blog-container'); // Your <article> section

        blogs.forEach(blog => {
          const postCard = document.createElement('div');
          postCard.classList.add('post-card');

          postCard.innerHTML = `
        <div class="post-image-container">
          <img src="${blog.image}" alt="${blog.title}" class="post-image" />
        </div>
        <div class="post-content">
          <div class="post-meta">
            <span class="post-badge">${blog.category}</span>
            <span class="post-read-time">${blog.readTime}</span>
          </div>
          <h3 class="post-title">
            <a href="#" class="post-link" onclick="visi('${blog._id}')">${blog.title}</a>


          </h3>
          <p class="post-excerpt">${blog.content.slice(0, 120)}</p>
          <div class="post-footer">
            <div class="post-author">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
              <span>${blog.author}</span>
            </div>
            <div class="post-date">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect><line x1="16" x2="16" y1="2" y2="6"></line><line x1="8" x2="8" y1="2" y2="6"></line><line x1="3" x2="21" y1="10" y2="10"></line></svg>
              <span>${blog.date}</span>
            </div>
          </div>
        </div>
      `;

          div.appendChild(postCard);
        });

      } catch (err) {
        console.error("Error loading blogs:", err);
      }
    }

    loadBlogs();