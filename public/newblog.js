document.getElementById('publish-btn')?.addEventListener('click', async () => {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();

  if (!title || !content) {
    alert('Title and content cannot be empty.');
    return;
  }

  try {
    const response = await fetch('/api/blogs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // if you're using cookies/auth
      body: JSON.stringify({ title, content }),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Blog published successfully!');
      window.location.href = '/dashboard.html'; // or wherever
    } else {
      alert(data.message || 'Something went wrong!');
    }
  } catch (err) {
    console.error('Error publishing blog:', err);
    alert('Error publishing blog.');
  }
});

document.getElementById('preview-btn')?.addEventListener('click', () => {
  const title = document.getElementById('post-title')?.value;
  const content = document.getElementById('post-content')?.value;

  document.getElementById('preview-title').textContent = title;
  document.getElementById('preview-content').innerText = content;

  document.getElementById('preview-modal').style.display = 'block';
});

document.getElementById('close-modal')?.addEventListener('click', () => {
  document.getElementById('preview-modal').style.display = 'none';
});

// Optional: Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

