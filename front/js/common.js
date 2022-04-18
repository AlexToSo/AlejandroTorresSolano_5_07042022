class Article {
    constructor(jsonArticle) {
        this.altTxt = jsonArticle.altTxt;
        this.colors = jsonArticle.colors;
        this.description = jsonArticle.description;
        this.imageUrl = jsonArticle.imageUrl;
        this.name = jsonArticle.name;
        this.price = jsonArticle.price;
        this.id = jsonArticle._id;
    }
}

class Cart {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

const retrieveProducts = async (articleId) => {
    try {
        let data = await fetch(`http://localhost:3000/api/products/${articleId}`)
        if (data.ok) {
            return data.json()
        }
    }
    catch (err) {
        console.log("Erreur " + err)
    }
}