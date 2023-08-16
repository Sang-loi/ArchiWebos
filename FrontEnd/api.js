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
      const arrowsUpDownLeftRightIconDiv = document.createElement('button');
      arrowsUpDownLeftRightIconDiv.classList.add('arrows-icon-container'); // Ajouter la classe "arrows-icon-container" à la div
      

      // Créer une div pour le deuxième icône (trashCanIcon)
      const trashCanIconDiv = document.createElement('button');
      trashCanIconDiv.classList.add('trash-icon-container');

      //3.2 (début)
      trashCanIconDiv.addEventListener('click', () => {
        const figureModal = trashCanIconDiv.closest('figure');
        const workId = parseInt(figure.dataset.workId);
      
        // Appeler la fonction pour supprimer le travail dans le back-end
        deleteWork(workId);
      
        // Supprimer la figure de la modal
        figureModal.remove();
      
        // Supprimer la figure correspondante dans la section "gallery"
        const gallery = document.querySelector('.gallery');
        const matchingGalleryFigure = gallery.querySelector(`figure[data-work-id="${workId}"]`);
        if (matchingGalleryFigure) {
          matchingGalleryFigure.remove();
        }
      });
      //3.2 (fin)

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

// Modal d'ajout de photo

document.addEventListener("DOMContentLoaded", function () {
  const addButton = document.querySelector(".add");

  addButton.addEventListener("click", function () {
    // Modifier le titre de la modal
    const modalTitle = document.querySelector("h3");
    modalTitle.innerHTML = "Ajout photo";

    // Cacher la galerie existante
    const modalGallery = document.querySelector(".modal-gallery");
    modalGallery.style.display = "none";

    // Modifier le formulaire
    const form = document.querySelector("form");
    form.setAttribute("action", "http://localhost:5678/api/works");

    const addPictureDiv = document.createElement("div");
    addPictureDiv.className = "add-picture";

    const addPictureIcon = document.createElement("i");
    addPictureIcon.className = "fa-regular fa-image";

    const addPictureInput = document.createElement("input");
    addPictureInput.type = "file";
    addPictureInput.name = "image";
    addPictureInput.accept = "image/jpeg,image/png";
    addPictureInput.value = "+ Ajouter image";

    const addPictureDescription = document.createElement("a");
    addPictureDescription.textContent = "jpg, png : 4mo max";

    addPictureDiv.appendChild(addPictureIcon);
    addPictureDiv.appendChild(addPictureInput);
    addPictureDiv.appendChild(addPictureDescription);

    const titleLabel = document.createElement("label");
    titleLabel.setAttribute("for", "title");
    titleLabel.textContent = "Titre";

    const titleInput = document.createElement("input");
    titleInput.type = "text";
    titleInput.name = "title";
    titleInput.id = "title";

    const categoryLabel = document.createElement("label");
    categoryLabel.setAttribute("for", "category");
    categoryLabel.textContent = "Catégorie";

    const categorySelect = document.createElement("select");
    categorySelect.name = "category";
    categorySelect.id = "category";

    // Fetch pour récupérer les catégories depuis l'API
    fetch("http://localhost:5678/api/categories")
      .then(response => response.json())
      .then(categories => {
        categories.forEach(category => {
          const option = document.createElement("option");
          option.value = category.id;
          option.textContent = category.name;
          categorySelect.appendChild(option);
        });
      });

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.textContent = "Valider";

    form.innerHTML = ""; // Vider le formulaire existant
    form.appendChild(addPictureDiv);
    form.appendChild(titleLabel);
    form.appendChild(titleInput);
    form.appendChild(categoryLabel);
    form.appendChild(categorySelect);
    form.appendChild(submitButton);
  });
});

//3.2 bis : Suppression de travaux existants

function deleteWork(workId) {
  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4';

  fetch(`http://localhost:5678/api/works/${workId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Work deleted successfully:', data);
    })
    .catch(error => {
      console.error('Error deleting work:', error);
    });
};



//3.3 Envoi d’un nouveau projet au back-end via le formulaire de la modale


