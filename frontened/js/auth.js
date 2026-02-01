document.addEventListener("DOMContentLoaded", () => {

    const loginForm = document.getElementById("loginForm");
    const registerForm = document.getElementById("registerForm");

    // LOGIN
    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
            .then(res => res.text())
            .then(data => {
                document.getElementById("message").innerHTML = data;
            })
            .catch(err => {
                document.getElementById("message").innerHTML = err;
            });
        });
    }

    // REGISTER
    if (registerForm) {
        registerForm.addEventListener("submit", function (e) {
            e.preventDefault();

            const email = document.getElementById("email").value;
            const password = document.getElementById("password").value;

            fetch("http://localhost:3000/api/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password})
            })
            .then(res => res.text())
            .then(data => {
                document.getElementById("message").innerHTML = data;
            })
            .catch(err => {
                document.getElementById("message").innerHTML = err;
            });
        });
    }

});
