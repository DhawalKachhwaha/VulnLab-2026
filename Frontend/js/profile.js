if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

function loadProfile() {
  const id = document.getElementById('userId').value;

  fetch(`${API_BASE}/users/${id}`, {
    headers: getAuthHeaders()
  })
    .then(res => res.json())
    .then(user => {
      document.getElementById('profile').innerHTML = `
        <p>Email: ${user.email}</p>
        <p>Role: ${user.role}</p>
        <p>Bio: ${user.bio}</p>
      `;
    });
}
