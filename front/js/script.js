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

const retrieveProductsList = () =>
    fetch("http://localhost:3000/api/products")
        .then(function (data) {
            if (data.ok) {
                return data.json();
            }
        })
        .catch(function (err) {
            console.log("Erreur " + err);
        });

const createIndex = (itemsArray) => {
    const itemsSection = document.getElementById('items');

    for (let jsonItem of itemsArray) {
        let article = new Article(jsonItem);
        const itemLink = document.createElement('a')
        const itemArticle = document.createElement('article')
        const itemImage = document.createElement('img')
        const itemTitle = document.createElement('h3')
        const itemDescription = document.createElement('p')

        itemLink.setAttribute('href', `product.html?id=${article.id}`)

        itemImage.setAttribute('src',article.imageUrl)
        itemImage.setAttribute('alt',article.altTxt)

        itemTitle.classList.add('productName')
        itemTitle.innerText = article.name

        itemDescription.classList.add('productDescription')
        itemDescription.innerText = article.description

        itemArticle.appendChild(itemImage)
        itemArticle.appendChild(itemTitle)
        itemArticle.appendChild(itemDescription)

        itemLink.appendChild(itemArticle)
        itemsSection.appendChild(itemLink)
    }

}

const main = async () => {
    const productsList = await retrieveProductsList();
    createIndex(productsList);
}

main()