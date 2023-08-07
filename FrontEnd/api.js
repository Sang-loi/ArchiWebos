// Étape 1.1 : Récupération des travaux depuis le back-end
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');

    // Supprimer les travaux existants
    gallery.innerHTML = '';

    // Ajouter les travaux récupérés
    data.forEach(travail => {
      const figure = document.createElement('figure');
      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      image.src = travail.imageUrl;
      image.alt = travail.titre;
      figcaption.textContent = travail.title;

      figure.appendChild(image);
      figure.appendChild(figcaption);
      gallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });

// Etape 1.2

fetch('http://localhost:5678/api/categories')
  .then(response => response.json())
  .then(table => {
    const filter = document.querySelector('.filter ul');
    table.forEach(button => {
        const li = document.createElement('li')
        li.textContent = button.name ;
        filter.appendChild(li);
        }
    )

    filter.addEventListener('click', (event) => {
        if (event.target.tagName === 'LI') {
          const allFilters = filter.querySelectorAll('.filter ul li');
          allFilters.forEach(filterItem => filterItem.classList.remove('active'));

          event.target.classList.add('active');


          const selectedCategory = event.target.textContent;
          filterWorksByCategory(selectedCategory);
        }
      });
      
  }
  )

// Fonction pour filtrer les travaux par catégorie
function filterWorksByCategory(category) {
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.gallery');

    // Supprimer les travaux existants
    gallery.innerHTML = '';

    // Ajouter les travaux de la catégorie sélectionnée
    data.forEach(travail => {
      if (category === 'Tous' || travail.category.name === category) {
        const figure = document.createElement('figure');
        const image = document.createElement('img');
        const figcaption = document.createElement('figcaption');

        image.src = travail.imageUrl;
        image.alt = travail.titre;
        figcaption.textContent = travail.title;

        figure.appendChild(image);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
      }
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux:', error);
  });
}


//Etape 2.2

// Vérification de la présence du token dans le localstorage
const token = localStorage.getItem('token');

document.addEventListener('DOMContentLoaded', () => {
  const loginButton = document.querySelector('nav ul li a');
  const introductionSection = document.getElementById('introduction');
  const portfolioSection = document.getElementById('portfolio');
  const h2Element = portfolioSection.querySelector('h2')
  
  if (token) {
    // Si le token est présent, changer le texte du bouton en "Logout"
    loginButton.textContent = 'logout';
    // Ajouter un événement au bouton "Logout" pour gérer la déconnexion
    loginButton.addEventListener('click', handleLogout);

    // Création de l'icône d'édition pour la section "introduction"
    const editIconIntroduction = document.createElement('i');
    editIconIntroduction.className = 'fa-regular fa-pen-to-square';

    // Ajout de l'icône d'édition à côté de l'en-tête h2 dans la section "introduction"
    introductionSection.appendChild(editIconIntroduction);
    const editModeTextIntroduction = document.createTextNode(' modifier ');
    const editModeContainerIntroduction = document.createElement('div');
    editModeContainerIntroduction.appendChild(editIconIntroduction);
    editModeContainerIntroduction.appendChild(editModeTextIntroduction);
    editModeContainerIntroduction.className = 'edit-mode-introduction';
    introductionSection.insertAdjacentElement('afterend', editModeContainerIntroduction);




    // Création de l'icône d'édition pour la section "portfolio"
    const editIconPortfolio = document.createElement('i');
    editIconPortfolio.className = 'fa-regular fa-pen-to-square';

    // Ajout de l'icône d'édition à côté de l'en-tête h2 dans la section "portfolio"
    h2Element.insertAdjacentElement('afterend', editIconPortfolio);

    // Créez le texte "modifier" pour la section "portfolio"
    const editModeTextPortfolio = document.createTextNode(' modifier ');

    // Créez une div pour contenir l'icône d'édition et le texte "modifier"
    const editModeContainerPortfolio = document.createElement('a');
    editModeContainerPortfolio.appendChild(editIconPortfolio);
    editModeContainerPortfolio.appendChild(editModeTextPortfolio);
    editModeContainerPortfolio.className = 'edit-mode-portfolio';
    editModeContainerPortfolio.setAttribute('href', '#modal1')

    // Insérez la nouvelle div après l'élément <h2>
    h2Element.insertAdjacentElement('afterend', editModeContainerPortfolio);

    //Suppression des filtres
    // Sélectionnez l'élément <div> avec la classe "filter"
    const filterDiv = document.querySelector('.filter');

    // Ajoutez le style "display: none" à l'élément
    filterDiv.style.display = 'none';

    
    


    // Créer et ajouter l'élément <div> avec la classe "login" au <header> (uniquement si le token est présent)
    const header = document.querySelector('body');
    const loginDiv = document.createElement('div');
    loginDiv.className = 'login';

    // Créer l'élément <i> pour le mode édition
    const editIcon = document.createElement('i');
    editIcon.className = 'fa-regular fa-pen-to-square';
    const editModeText = document.createTextNode(' Mode édition ');
    const editModeContainer = document.createElement('div');
    editModeContainer.appendChild(editIcon);
    editModeContainer.appendChild(editModeText);
    editModeContainer.className = 'edit-mode';

    // Créer l'élément <div> pour la publication des changements avec la classe "publish"
    const publishContainer = document.createElement('a');

    
    publishContainer.textContent = 'publier les changements';
    publishContainer.className = 'publish';

    // Ajouter les éléments <div> dans le <header> (sous la classe "login")
    loginDiv.appendChild(editModeContainer);
    loginDiv.appendChild(publishContainer);
    header.insertBefore(loginDiv, header.firstChild);
  } else {
    // Si le token n'est pas présent, le bouton reste "login"
    loginButton.textContent = 'login';
    // Ajouter un événement au bouton "Login" pour gérer la connexion
    loginButton.addEventListener('click', handleLogin);
  }
});

// Fonction pour gérer la déconnexion (supprimer le token et rediriger vers login.html)
function handleLogout() {
  localStorage.removeItem('token');
  window.location.href = 'login.html';
}

// Fonction pour gérer la connexion (simplement rediriger vers login.html)
function handleLogin() {
  window.location.href = 'login.html';
} 

//3.1

document.addEventListener("DOMContentLoaded", function () {
  // Sélectionner le lien qui ouvrira le modal
  const openModalLink = document.querySelector(".edit-mode-portfolio");
  // Sélectionner le modal lui-même
  const modal = document.getElementById("modal1");
  // Sélectionner le bouton pour fermer le modal
  const closeModalButton = modal.querySelector(".js-modal-close");

  // Fonction pour ouvrir le modal
  function openModal(event) {
    event.preventDefault();
    modal.style.display = null;
  }

  // Fonction pour fermer le modal
  function closeModal(event) {
    event.preventDefault();
    modal.style.display = "none";
  }

  // Ajouter un gestionnaire d'événement de clic pour ouvrir le modal
  openModalLink.addEventListener("click", openModal);

  // Ajouter un gestionnaire d'événement de clic pour fermer le modal en cliquant sur le bouton de fermeture
  closeModalButton.addEventListener("click", closeModal);

  // Ajouter un gestionnaire d'événement de clic pour fermer le modal en cliquant en dehors de son contenu
  modal.addEventListener("click", function (event) {
    if (event.target === modal) {
      closeModal(event);
    }
  });
});



// Importation des images à la modal

// Récupération des travaux depuis le back-end
fetch('http://localhost:5678/api/works')
  .then(response => response.json())
  .then(data => {
    const gallery = document.querySelector('.modal-gallery');

    // Supprimer les travaux existants
    gallery.innerHTML = '';

    // Ajouter les travaux récupérés
    data.forEach(travail => {
      const figure = document.createElement('figure');      

      const imageAndCaptionContainer = document.createElement('div'); // Créer la div contenant l'image et le figcaption

      // Ajouter les classes "image-container" à cette div
      imageAndCaptionContainer.className = 'image-container';

      const image = document.createElement('img');
      const figcaption = document.createElement('figcaption');

      // Insérer l'URL de l'image dans la balise <img>
      image.src = travail.imageUrl;
      image.alt = travail.title;
      
      // Créer une div pour contenir les deux icônes
      const symbolsContainer = document.createElement('div');
      symbolsContainer.className = 'symbols-container';

      // Insérer les icônes des symboles dans le "symbolsContainer" pour chaque image
      const arrowsUpDownLeftRightIcon = document.createElement('i');
      arrowsUpDownLeftRightIcon.className = 'fa-solid fa-arrows-up-down-left-right';

      // Créer une div pour le premier icône (arrowsUpDownLeftRightIcon)
      const arrowsUpDownLeftRightIconDiv = document.createElement('a');
      arrowsUpDownLeftRightIconDiv.classList.add('arrows-icon-container'); // Ajouter la classe "arrows-icon-container" à la div
      

      // Créer une div pour le deuxième icône (trashCanIcon)
      const trashCanIconDiv = document.createElement('a');
      trashCanIconDiv.classList.add('trash-icon-container'); // Ajouter la classe "trash-icon-container" à la div

      const trashCanIcon = document.createElement('i');
      trashCanIcon.className = 'fa-solid fa-trash-can';

      trashCanIconDiv.appendChild(trashCanIcon)
      arrowsUpDownLeftRightIconDiv.appendChild(arrowsUpDownLeftRightIcon)



      symbolsContainer.appendChild(arrowsUpDownLeftRightIconDiv);
      symbolsContainer.appendChild(trashCanIconDiv);


      // Le reste du code reste inchangé
      figcaption.textContent = "éditer";

      imageAndCaptionContainer.appendChild(image);
      imageAndCaptionContainer.appendChild(figcaption);

      figure.appendChild(symbolsContainer);
      figure.appendChild(imageAndCaptionContainer);

      gallery.appendChild(figure);
    });
  })
  .catch(error => {
    console.error('Erreur lors de la récupération des travaux :', error);
  });

//3.2 Suppression de travaux existants

document.addEventListener("DOMContentLoaded", function () {
  // ... Votre code existant ...

  // Sélectionnez tous les boutons de suppression (poubelle) générés en JS
  const deleteButtons = document.querySelectorAll('.trash-icon-container');

  // Ajouter un gestionnaire d'événement de clic pour chaque bouton de suppression
  deleteButtons.forEach(button => {
    button.addEventListener('click', handleDeleteWork);
  });
});

// Fonction pour gérer la suppression d'un travail
function handleDeleteWork(event) {
  // Récupérer l'ID du travail associé au bouton de suppression
  const figureElement = event.target.closest('figure');
  const workId = figureElement.dataset.workId; // Si vous avez stocké l'ID du travail dans un attribut personnalisé, utilisez cette méthode

  // Construire l'URL de la requête fetch pour supprimer le travail
  const apiUrl = `http://localhost:5678/api/works/${workId}`;

  // Créer la requête fetch avec la méthode DELETE
  fetch(apiUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`, // N'oubliez pas d'inclure le token d'authentification si nécessaire
    },
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('La suppression du travail a échoué.');
    }
    // Supprimer l'élément figure associé du DOM après avoir reçu la confirmation de la suppression de l'entrée en base de données
    const gallery = document.querySelector('.gallery');
    gallery.removeChild(figureElement);
  })
  .catch(error => {
    console.error('Erreur lors de la suppression du travail:', error);
  });
}
