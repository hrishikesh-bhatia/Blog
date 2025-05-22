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

async function filterBlogs(category) {
  try {
    const response = await fetch(`/api/blogs/category/${category}`);
    const data = await response.json();
    const blogs = data.data;

    const div = document.querySelector('#blog-container');
    div.innerHTML = ''; // Clear current blogs

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
              <span>${blog.author}</span>
            </div>
            <div class="post-date">
              <span>${blog.date}</span>
            </div>
          </div>
        </div>
      `;

      div.appendChild(postCard);
    });
  } catch (err) {
    console.error("Error filtering blogs:", err);
  }
}
// filterBlogs('All');
function highlightActiveCategory(active) {
  const buttons = document.querySelectorAll('#category-buttons button');
  buttons.forEach(btn => {
    if (btn.dataset.category === active) {
      btn.classList.add('active-category');
    } else {
      btn.classList.remove('active-category');
    }
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const selectedCategory = params.get('category') || 'All';
  filterBlogs(selectedCategory);
  highlightActiveCategory(selectedCategory);

  const categoryButtons = document.getElementById('category-buttons');
  if (categoryButtons) {
    categoryButtons.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
        const category = e.target.dataset.category;
        
        // Update URL without reloading
        const newUrl = `${window.location.pathname}?category=${encodeURIComponent(category)}`;
        window.history.pushState({}, '', newUrl);

        // Filter and highlight
        filterBlogs(category);
        highlightActiveCategory(category);
      }
    });
  }
});
