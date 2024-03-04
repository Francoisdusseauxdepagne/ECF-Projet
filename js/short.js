let articleNbre = 0;
// Fonction pour ajouter un article au panier
function addToCart(article,nbre) {

const article_idarticle = article;
const quantity = nbre;

    fetch('http://localhost:3000/panier/ajout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            article_idarticle: article_idarticle, // Utilisez le même nom de propriété que dans la route Express
            quantity: quantity 
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erreur lors de l\'ajout au panier');
        }
        alert("L'article a été ajouté au panier !");
        window.location.reload();
    })
    .catch(error => {
        console.error("Erreur : " + error);
        alert("Une erreur est survenue lors de l'ajout au panier");
    });
}
// Fonction pour afficher les articles du panier dans la section #SectionPanier
function displayPanier(articles) {
    const panierElement = document.querySelector("#SectionPanier");

    articles.forEach(article => {

        const articleElement = document.createElement("div");
        articleElement.classList.add("card", "mb-3", "col-md-12", "col-lg-4", "col-sm-12");

        const articleBody = document.createElement("div");
        articleBody.classList.add("card-body");

        const articleTitle = document.createElement("h5");
        articleTitle.classList.add("card-title");
        articleTitle.textContent = article.nom;

        const articlePrice = document.createElement("p");
        articlePrice.classList.add("card-text");
        articlePrice.textContent = article.prix + "€";

       const articleQuantity = document.createElement("p");
       articleQuantity.classList.add("card-text");
       articleQuantity.textContent = article.quantity;

        articleElement.append(articleBody);
        articleBody.append(articleTitle);
        articleBody.append(articlePrice);
        articleBody.append(articleQuantity);
        panierElement.append(articleElement);
    });
}

function fetchPanier() {
    fetch(`http://localhost:3000/panier`)
        .then(response => response.json())
        .then(articles => displayPanier(articles))
        .catch(error => console.error("Erreur : " + error));
}

// Fonction pour récupérer les articles dans la section #vueShort
function fetchArticle(categoryid) {
    fetch(`http://localhost:3000/articles/${categoryid}`)
        .then(response => response.json())
        .then(articles => displayArticle(articles))
        .catch(error => console.error("Erreur : " + error));
}

// Fonction pour afficher les articles dans la section #vueShort
function displayArticle(articles) {
    const articleElement = document.querySelector("#vueShort");

    const articleContainer = document.createElement("div");
    articleContainer.classList.add("container");

    const articleRow = document.createElement("div");
    articleRow.classList.add("row");

    articleElement.appendChild(articleContainer);
    articleContainer.appendChild(articleRow);
   
    articles.forEach(article => {
        const articleCol = document.createElement("div");
        articleCol.classList.add("col-lg-4", "col-md-12", "col-sm-12");

        const img = document.createElement("img");
        img.classList.add("w-100");
        img.src = article.img;

        const articleTitle = document.createElement("p");
        articleTitle.classList.add("text-start", "m-0");
        articleTitle.textContent = article.nom;

        const articlePrice = document.createElement("p");
        articlePrice.classList.add("text-start", "m-0", "fw-lighter", "fst-italic");
        articlePrice.textContent = article.prix + "€";

        const articleDescription = document.createElement("p");
        articleDescription.classList.add("text-start", "m-0", "fw-lighter");
        articleDescription.textContent = article.description;

        const ArticleBtn = document.createElement("button");
        ArticleBtn.classList.add("mb-3", "btn", "beige", "beige:hover", "w-100");
        ArticleBtn.textContent = "Ajouter au panier";
        
        // Ajout du gestionnaire d'événements clic sur le bouton "Ajouter au panier"
        ArticleBtn.addEventListener("click", function() {
            articleNbre++;
            addToCart(article.idarticle, articleNbre); // Vous pouvez ajuster la quantité ici si nécessaire
        });

        articleCol.append(img, articleTitle, articlePrice, articleDescription, ArticleBtn);
        articleRow.appendChild(articleCol);
    });
}

// Appel initial pour récupérer les articles dans la section #vueShort
fetchArticle(1);
// Appel initial pour récupérer les articles du panier et les afficher dans la section #SectionPanier
fetchPanier();