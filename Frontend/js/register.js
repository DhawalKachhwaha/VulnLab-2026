document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const bio = document.getElementById('bio').value;

  const res = await fetch(`${API_BASE}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, bio })
  });

  const data = await res.json();

  if (data.message) {
    alert(data.message);
    window.location.href = 'login.html';
  } else {
    alert('Registration failed');
  }
});
