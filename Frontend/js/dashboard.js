
// Redirect if not logged in
if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

// Show logged-in user info
const user = getUser();
if (user) {
  document.getElementById('currentUser').innerText =
    `Logged in as: ${user.email} (${user.role})`;
}

fetch(`${API_BASE}/posts`)
  .then(res => res.json())
  .then(posts => {
    const container = document.getElementById('posts');

    posts.forEach(post => {
      container.innerHTML += `
        <div class="card">
          <h3>${post.title}</h3>
          <p>${post.content}</p>
          <p class="small">User ID: ${post.user_id}</p>
        </div>
      `;
    });
  });

// Create post
document.getElementById('postForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const title = document.getElementById('title').value;
  const content = document.getElementById('content').value;

  await fetch(`${API_BASE}/posts`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ title, content })
  });

  location.reload();
});
