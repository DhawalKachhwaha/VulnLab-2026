const output = document.getElementById("adminOutput");

/* LOAD ALL USERS */
function loadUsers() {
    fetch("http://localhost:3000/api/admin/users", {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.text())
    .then(data => {
        output.innerHTML = "<h3>All Users</h3>" + data;
    })
    .catch(err => {
        output.innerHTML = err;
    });
}

/* LOAD ALL BLOGS */
function loadBlogs() {
    fetch("http://localhost:3000/api/admin/blogs", {
        headers: {
            "Authorization": localStorage.getItem("token")
        }
    })
    .then(res => res.text())
    .then(data => {
        output.innerHTML = "<h3>All Blogs</h3>" + data;
    })
    .catch(err => {
        output.innerHTML = err;
    });
}
