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


