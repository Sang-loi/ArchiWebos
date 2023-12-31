// >>> GENERATION DES PROJETS

const btnAll = document.querySelector(".filter__btn-id-null");
const btnId1 = document.querySelector(".filter__btn-id-1");
const btnId2 = document.querySelector(".filter__btn-id-2");
const btnId3 = document.querySelector(".filter__btn-id-3");

const sectionProjets = document.querySelector(".gallery"); 

let data = null;
let id;
generationProjets(data, null);

// Reset la section projets
function resetSectionProjets() {  
	sectionProjets.innerHTML = "";
}

// Fonction de génération des projets
async function generationProjets(data, id) { 
    try {
        const response = await fetch('http://localhost:5678/api/works'); 
        data = await response.json();
    }
    catch{
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Une erreur est survenue lors de la récupération des projets<br><br>Une tentative de reconnexion automatique auras lieu dans une minute<br><br><br><br>Si le problème persiste, veuillez contacter l'administrateur du site";
        sectionProjets.appendChild(p);
        await new Promise(resolve => setTimeout(resolve, 60000));
        window.location.href = "index.html";
    }

    resetSectionProjets()

    // Filtre les résultats
    if ([1, 2, 3].includes(id)) {
        data = data.filter(data => data.categoryId == id);}

     // Change la couleur du bouton en fonction du filtre
    document.querySelectorAll(".filter__btn").forEach(btn => {
        btn.classList.remove("filter__btn--active");})
    document.querySelector(`.filter__btn-id-${id}`).classList.add("filter__btn--active");

    if (data.length === 0 || data === undefined) { 
        const p = document.createElement("p");
        p.classList.add("error");
        p.innerHTML = "Aucun projet à afficher";
        sectionProjets.appendChild(p);
        return;}

    // Génération des projets
    if (id === null || [1, 2, 3].includes(id)) {
        for (let i = 0; i < data.length; i++) {
            
            const figure = document.createElement("figure"); 
            sectionProjets.appendChild(figure);
            figure.classList.add(`js-projet-${data[i].id}`);
            const img = document.createElement("img");
            img.src = data[i].imageUrl;
            img.alt = data[i].title;
            figure.appendChild(img);

            const figcaption = document.createElement("figcaption");
            figcaption.innerHTML = data[i].title;
            figure.appendChild(figcaption);
        }
}}

// FILTRES

btnAll.addEventListener("click", () => { // Tous les projets
    generationProjets(data, null);})

btnId1.addEventListener("click", () => { // Objets
    generationProjets(data, 1);})

btnId2.addEventListener("click", () => { // Appartements
    generationProjets(data, 2);})

btnId3.addEventListener("click", () => { // Hôtels & restaurants
    generationProjets(data, 3);})



//====================================================================================================================
// Gestion des modules administrateur ///////////////

// MODALE

// Reset la section projets
function resetmodaleSectionProjets() {  
	modaleSectionProjets.innerHTML = "";
}


// Ouverture modale
let modale = null;
let dataAdmin;
const modaleSectionProjets = document.querySelector(".js-admin-projets"); 

const openModale = function(e) {
    e.preventDefault()
    modale = document.querySelector(e.target.getAttribute("href"))

    modaleProjets(); // Génère les projets dans la modale admin
    // attendre la fin de la génération des projets
    setTimeout(() => {
        modale.style.display = null
        modale.removeAttribute("aria-hidden")
        modale.setAttribute("aria-modal", "true")
    }, 25);
    // Ajout EventListener sur les boutons pour ouvrir la modale projet
    document.querySelectorAll(".js-modale-projet").forEach(a => {
        a.addEventListener("click", openModaleProjet)});

    // Appel fermeture modale
    modale.addEventListener("click", closeModale)
    modale.querySelector(".js-modale-close").addEventListener("click", closeModale)
    modale.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)

};

// Génère les projets dans la modale admin
async function modaleProjets() { 
    const response = await fetch('http://localhost:5678/api/works'); 
    dataAdmin = await response.json();
    resetmodaleSectionProjets()
    for (let i = 0; i < dataAdmin.length; i++) {
        
        const div = document.createElement("div");
        div.classList.add("gallery__item-modale");
        modaleSectionProjets.appendChild(div);

        const img = document.createElement("img");
        img.src = dataAdmin[i].imageUrl;
        img.alt = dataAdmin[i].title;
        div.appendChild(img);

        const pTrash = document.createElement("p");
        div.appendChild(pTrash);

        const pArrows = document.createElement("p");
        div.appendChild(pArrows);
        

        const trashIcon = document.createElement("i");
        trashIcon.classList.add("fa-solid", "fa-trash-can"); 
        pTrash.appendChild(trashIcon);
        pTrash.classList.add(dataAdmin[i].id, "js-delete-work");

        const arrowsIcon = document.createElement("i");
        arrowsIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right"); 
        pArrows.appendChild(arrowsIcon);
        pArrows.classList.add(dataAdmin[i].id, "js-arrows");

        
        const a = document.createElement("a");
        a.innerHTML = "éditer";
        div.appendChild(a);
    }
    deleteWork()
}


//  Fermeture modale
const closeModale = function(e) {
    e.preventDefault()
    if (modale === null) return

    modale.setAttribute("aria-hidden", "true")
    modale.removeAttribute("aria-modal")

    modale.querySelector(".js-modale-close").removeEventListener("click", closeModale)

    // Fermeture de la modale apres 400ms 
    window.setTimeout(function() {
        modale.style.display = "none"
        modale = null
        resetmodaleSectionProjets()
    }, 300)
};


// Définit la "border" du click pour fermer la modale
const stopPropagation = function(e) {
    e.stopPropagation()
};
// Selectionne les éléments qui ouvrent la modale
document.querySelectorAll(".js-modale").forEach(a => {
    a.addEventListener("click", openModale)
});
// Ferme la modale avec la touche echap
window.addEventListener("keydown", function(e) {
    if (e.key === "Escape" || e.key === "Esc") {
        closeModale(e)
        closeModaleProjet(e)}
});


/// TOKEN DE LOGIN

// Récupération du token
const token = localStorage.getItem("token");
const AlredyLogged = document.querySelector(".js-alredy-logged");
const headers = document.querySelector("header")

adminPanel()
// Gestion de l'affichage des boutons admin
function adminPanel() {
    document.querySelectorAll(".admin__modifer").forEach(a => {
        if (token === null) {
            return;
        }
        else {
            a.removeAttribute("aria-hidden")
            a.removeAttribute("style")
            AlredyLogged.innerHTML = "logout";
            headers.classList.add('augmentedMargin')
            var filtersElement = document.querySelector('.filters');
            filtersElement.style.display = "none"   
            var portfolioTitle = document.querySelector('.portfolio-title');
            portfolioTitle.classList.add("marginPortfolio-title")
        }
    });
}
// GESTION SUPPRESSION PROJET 

// Event listener sur les boutons supprimer par apport a leur id
function deleteWork() {
    let btnDelete = document.querySelectorAll(".js-delete-work");
    for (let i = 0; i < btnDelete.length; i++) {
        btnDelete[i].addEventListener("click", deleteProjets);
    }}

// Supprimer le projet
async function deleteProjets() {

    console.log("DEBUG DEBUT DE FUNCTION SUPRESSION")
    console.log(this.classList[0])
    console.log(token)

    await fetch(`http://localhost:5678/api/works/${this.classList[0]}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}`},
    })

    .then (response => {
        console.log(response)
        // Token correct
        if (response.status === 204) {
            console.log("DEBUG SUPPRESION DU PROJET " + this.classList[0])
            refreshPage(this.classList[0])
        }
        // Token inorrect
        else if (response.status === 401) {
            alert("Veuillez avoir un compte valide pour supprimer ce projet")
            window.location.href = "login.html";
        }
    })
    .catch (error => {
        console.log(error)
    })
}

// Rafraichit les projets sans recharger la page
async function refreshPage(i){
    modaleProjets(); // Re lance une génération des projets dans la modale admin

    // supprime le projet de la page d'accueil
    const projet = document.querySelector(`.js-projet-${i}`);
    projet.style.display = "none";
}


/// AJOUT PROJET ///

// Ouverture modale projet
let modaleProjet = null;
const openModaleProjet = function(e) {
    e.preventDefault()
    modaleProjet = document.querySelector(e.target.getAttribute("href"))

    modaleProjet.style.display = null
    modaleProjet.removeAttribute("aria-hidden")
    modaleProjet.setAttribute("aria-modal", "true")

    // Appel fermeture modale
    modaleProjet.addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-close").addEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").addEventListener("click", stopPropagation)

    modaleProjet.querySelector(".js-modale-return").addEventListener("click", backToModale)
};


// Fermeture modale projet
const closeModaleProjet = function(e) {
    if (modaleProjet === null) return

    modaleProjet.setAttribute("aria-hidden", "true")
    modaleProjet.removeAttribute("aria-modal")

    modaleProjet.querySelector(".js-modale-close").removeEventListener("click", closeModaleProjet)
    modaleProjet.querySelector(".js-modale-stop").removeEventListener("click", stopPropagation)

    modaleProjet.style.display = "none"
    modaleProjet = null
    
    closeModale(e)
};

// Retour au modale admin
const backToModale = function(e) {
    e.preventDefault()
    modaleProjet.style.display = "none"
    modaleProjet = null
    modaleProjets(dataAdmin)
};


/// GESTION AJOUT D'UN PROJET  ///

const btnAjouterProjet = document.querySelector(".js-add-work");
btnAjouterProjet.addEventListener("click", addWork);

// Ajout photo par desssus formulaire //

const pictureFront = document.querySelector("#photo");
const photoPreview = document.querySelector("#photo-preview");
const icon = document.querySelector(".fa-regular.fa-image");
const label = document.querySelector("label[for='photo']");

pictureFront.addEventListener("change", function () {
    let pictureStorage = pictureFront.files[0]; // Prend la première image du champ
    if (pictureStorage) {
        let pictureUrl = URL.createObjectURL(pictureStorage);
        photoPreview.src = pictureUrl;
        
        // Affiche l'image et masque l'icône et l'étiquette
        photoPreview.style.display = "block";
        icon.style.display = "none";
        label.style.display = "none";
        pictureFront.style.display = "none";
    }
});


// Sélectionnez les éléments du DOM
const preview = document.getElementById("photo-preview");
const titleInput = document.querySelector(".js-title");
const categoryIdSelect = document.querySelector(".js-categoryId");
const addWorkButton = document.querySelector(".js-add-work");

// Désactivez le bouton initialement
addWorkButton.disabled = true;

// Fonction pour vérifier si les conditions sont remplies
function checkConditions() {
    const isPhotoFilled = preview.src !== "";
    const isTitleFilled = titleInput.value.trim() !== "";
    const isCategoryIdFilled = categoryIdSelect.value === "1" || categoryIdSelect.value === "2" || categoryIdSelect.value ===  "3";

    if (isPhotoFilled && isTitleFilled && isCategoryIdFilled) {
        addWorkButton.removeAttribute("disabled");
    } else {
        addWorkButton.setAttribute("disabled", "disabled"); // Désactiver le bouton si les conditions ne sont pas remplies
    }
}

// Fonction pour activer ou désactiver le bouton en fonction des conditions
function updateAddWorkButtonState() {
    checkConditions(); // Appelez la fonction pour vérifier les conditions
}

// Écoutez les événements de changement dans les champs d'entrée
preview.addEventListener("load", updateAddWorkButtonState);
titleInput.addEventListener("input", updateAddWorkButtonState);
categoryIdSelect.addEventListener("change", updateAddWorkButtonState);

// Vérifiez également l'état initial au chargement de la page
updateAddWorkButtonState();

// Ajouter un projet
async function addWork(event) {
    event.preventDefault();

    const title = document.querySelector(".js-title").value;
    const categoryId = document.querySelector(".js-categoryId").value;
    const image = document.querySelector(".js-image").files[0];
    const submitButton = document.querySelector(".js-add-work");
    const photoPreview = document.querySelector("#photo-preview");

    if (title === "" || categoryId === "" || photoPreview.src === "") {
        alert("Merci de remplir tous les champs");
        return;
    } else if (categoryId !== "1" && categoryId !== "2" && categoryId !== "3") {
        alert("Merci de choisir une catégorie valide");
        return;       
    } else {
    try {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("category", categoryId);
        formData.append("image", image);

        const response = await fetch("http://localhost:5678/api/works", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        });

        if (response.status === 201) {
            alert("Projet ajouté");
            modaleProjets(dataAdmin);
            backToModale(event);
            generationProjets(data, null);
            
        } else if (response.status === 400) {
            alert("Merci de remplir tous les champs");
        } else if (response.status === 500) {
            alert("Erreur serveur");
        } else if (response.status === 401) {
            alert("Vous n'êtes pas autorisé à ajouter un projet");
            window.location.href = "login.html";
    }}

    catch (error) {
        console.log(error);
}}};