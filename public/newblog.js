document.getElementById('publish-btn')?.addEventListener('click', async () => {
  const title = document.getElementById('post-title').value.trim();
  const content = document.getElementById('post-content').value.trim();
  const category = document.getElementById('category').value.trim();
  const image = document.getElementById('image-link').value.trim();
  if (!title || !content || !category) {
    alert('Title and content and category cannot be empty.');
    return;
  }

  try {
    const response = await fetch('/api/blogs/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', 
      body: JSON.stringify({ title, content , category , image}),
    });

    const data = await response.json();

    if (response.ok) {
      alert('Blog published successfully!');
      window.location.href = '/dashboard'; 
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

//Close modal when clicking outside the modal content
window.addEventListener('click', (e) => {
  const modal = document.getElementById('preview-modal');
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.getElementById('cancel-btn').addEventListener('click', () => {
  window.location.href = '/dashboard';
});


