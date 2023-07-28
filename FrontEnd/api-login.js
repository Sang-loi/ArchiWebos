//2.2
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("mdp");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    // Vérification des informations d'authentification
    if (email === "sophie.bluel@test.tld" && password === "S0phie") {
      // Informations correctes : stockage du token d'authentification dans le localstorage
      localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4");

      // Redirection vers la page d'accueil (ou autre page protégée)
      window.location.href = "FrontEnd/admin.html";
    } else {
      // Informations incorrectes : affichage d'un message d'erreur
      alert("Informations d'identification incorrectes. Veuillez réessayer.");
    }
  });
});


