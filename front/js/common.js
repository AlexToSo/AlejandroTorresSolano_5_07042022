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

class CartItem {
    constructor(id, quantity, color) {
        this.id = id;
        this.quantity = quantity;
        this.color = color;
    }
}

const retrieveProducts = async (articleId) => {
    try {
        let url = articleId
            ? `http://localhost:3000/api/products/${articleId}`
            : `http://localhost:3000/api/products/`
        let data = await fetch(url)

        if (data.ok) {
            return data.json()
        }
    }
    catch (err) {
        console.log("Erreur " + err)
    }
}

const getCart = () => {
    let cartList = localStorage.getItem('cartList');
    if (cartList == null) {
        return [];
    }
    else {
        return JSON.parse(cartList);
    }
}

const saveCart = (cartList) => {
    localStorage.setItem('cartList', JSON.stringify(cartList));
}