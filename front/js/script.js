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

        itemImage.setAttribute('src', article.imageUrl)
        itemImage.setAttribute('alt', article.altTxt)

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
    const productsList = await retrieveProducts();
    createIndex(productsList);
}

main()