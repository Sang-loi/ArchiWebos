//2.2
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("mdp");

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    // Création de l'objet avec les informations d'authentification
    const userCredentials = {
      email: email,
      password: password
    };

    // Envoi des informations d'authentification via une requête POST
    fetch("http://localhost:5678/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userCredentials)
    })
      .then(response => response.json())
      .then(data => {
        // Vérification de la réponse de l'API
        if (data.userId && data.token) {
          // Informations correctes : stockage du token d'authentification dans le localstorage
          localStorage.setItem("token", data.token);

          // Redirection vers la page d'accueil
          window.location.href = "index.html";
        } else {
          // Informations incorrectes : affichage d'un message d'erreur
          alert("Informations d'identification incorrectes. Veuillez réessayer.");
        }
      })
      .catch(error => {
        console.error("Une erreur s'est produite : ", error);
      });
  });
});