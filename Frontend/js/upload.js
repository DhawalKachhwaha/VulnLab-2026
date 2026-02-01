if (!localStorage.getItem('token')) {
  window.location.href = 'login.html';
}

document.getElementById('uploadForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = new FormData();
  formData.append('file', document.getElementById('file').files[0]);

  await fetch(`${API_BASE}/upload`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
    body: formData
  });

  alert('File uploaded');
});
