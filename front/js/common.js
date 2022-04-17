class Article{
    constructor(jsonArticle){
        this.altTxt = jsonArticle.altTxt;
        this.colors = jsonArticle.colors;
        this.description = jsonArticle.description;
        this.imageUrl = jsonArticle.imageUrl;
        this.name = jsonArticle.name;
        this.price = jsonArticle.price;
        this.id = jsonArticle._id;
    }
}

const retrieveProducts = async (id) => {
    try {
        let data = await fetch(`http://localhost:3000/api/products/${id}`)
        if (data.ok) {
            return data.json()
        }
    }
    catch (err) {
        console.log("Erreur " + err)
    }
}