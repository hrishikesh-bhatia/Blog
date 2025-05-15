document.getElementById('logoutBtn').addEventListener('click', async () => {
    // script.js
fetch('/api/auth/logout', {
  method: 'GET',
  credentials: 'include',
})
  .then(res => res.json())
  .then(data => {
    console.log(data.message);
    // Optionally redirect
    window.location.href = '/';
  })
  .catch(err => {
    console.error('Logout Error:', err);
    alert('Logout failed. Please try again.');
  });

  });