const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;
const cors = require('cors');
app.use(express.json());
app.use(cors());

// informations de connexion databases
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'apiECF',
    port: '8889'
})

// connexion db
db.connect(err => {
    if (err) {
        console.log('Erreur de connexion à la base données' + err);
        return;
    }
    console.log('connecté à la base de données')
})

// afficher articles par idcategory
app.get('/articles/:id', (req, res) => {
    const categoryid = req.params.id;
    db.query(`SELECT article.idarticle,article.nom, article.description, article.prix, article.img FROM article 
              JOIN category ON article.category_idcategory = category.idcategory 
              WHERE category.idcategory = ${categoryid}`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

let panier_idpanier = null; // Variable globale pour stocker l'identifiant du panier

// Route pour ajouter un article au panier
app.post('/panier/ajout', (req, res) => {
    const { article_idarticle, quantity } = req.body;
    
    if (panier_idpanier !== null) {
        // Vérifier si l'article est déjà dans le panier
        db.query(`SELECT * FROM panier_has_article WHERE panier_idpanier = ? AND article_idarticle = ?`, [panier_idpanier, article_idarticle], (err, results) => {
            if (err) {
                return res.status(500).send(err);
            }

            if (results.length > 0) {
                // Si l'article est déjà dans le panier, mettre à jour la quantité
                const sqlUpdateQuantity = `UPDATE panier_has_article SET quantity = quantity + ? WHERE panier_idpanier = ? AND article_idarticle = ?`;
                db.query(sqlUpdateQuantity, [quantity, panier_idpanier, article_idarticle], (err, result) => {
                    if (err) {
                        return res.status(500).send(err);
                    }
                    res.json({ message: 'Quantité mise à jour dans le panier' });
                });
            } else {
                // Si l'article n'est pas dans le panier, l'ajouter
                insererArticleDansPanier(panier_idpanier, article_idarticle, quantity, res);
            }
        });
    } else {
        // Créer un nouveau panier
        const sqlInsertPanier = `INSERT INTO panier (date) VALUES (NOW())`;
        db.query(sqlInsertPanier, (err, result) => {
            if (err) {
                return res.status(500).send(err);
            }
            
            // Récupérer l'identifiant du panier nouvellement créé
            panier_idpanier = result.insertId;
            
            // Insérer l'article dans le panier
            insererArticleDansPanier(panier_idpanier, article_idarticle, quantity, res);
        });
    }
});

// Fonction pour insérer l'article dans le panier
function insererArticleDansPanier(panier_idpanier, article_idarticle, quantity, res) {
    const sqlInsertArticle = `INSERT INTO panier_has_article (panier_idpanier, article_idarticle, quantity) VALUES (?, ?, ?)`;
    db.query(sqlInsertArticle, [panier_idpanier, article_idarticle, quantity], (err, result) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json({ message: 'Article ajouté au panier' });
    });
}


// afficher panier 
app.get ('/panier', (req, res) => {
    db.query('SELECT panier_has_article.quantity, article.nom, article.prix, panier.date FROM panier_has_article JOIN article ON article.idarticle = panier_has_article.article_idarticle JOIN panier ON panier.idpanier = panier_has_article.panier_idpanier WHERE panier.idpanier = idPanier', (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
})

// afficher article dans le panier par idpanier
app.get('/panier/:id', (req, res) => {
    const articleid = req.params.id;
    db.query(`SELECT article.nom, article.description, article.prix, article.img FROM article 
              JOIN panier_has_article ON article.idarticle = panier_has_article.article_idarticle 
              JOIN panier ON panier.idpanier = panier_has_article.panier_idpanier 
              WHERE panier.idpanier = ${articleid}`, (err, results) => {
        if (err) {
            res.status(500).send(err);
        } else {
            res.json(results);
        }
    });
});

// ecoute du port 3000
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})