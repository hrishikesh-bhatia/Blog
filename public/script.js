// Logout handler
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

// Redirect to new blog page
document.getElementById('write-blog-btn')?.addEventListener('click', () => {
  window.location.href = '/newblog';
});



