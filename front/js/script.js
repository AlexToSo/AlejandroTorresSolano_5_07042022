/**
 * Constructs index.html page
 * @param { Object[] } itemsArray
 * @param { String } itemsArray[].altTxt
 * @param { String[] } itemsArray[].colors
 * @param { String } itemsArray[].description
 * @param { String } itemsArray[].imageUrl
 * @param { String } itemsArray[].name
 * @param { Integer{0..} } itemsArray[].price
 * @param { String } itemsArray[]._id
 */
const createIndex = (itemsArray) => {

    // Déclaration des éléments indépendentes des produits
    const itemsSection = document.getElementById('items');

    // Boucle pour créer et insérer tous les produits
    for (let article of itemsArray) {

        // Déclaration des éléments dépendentes des produits
        const itemLink = document.createElement('a')
        const itemArticle = document.createElement('article')
        const itemImage = document.createElement('img')
        const itemTitle = document.createElement('h3')
        const itemDescription = document.createElement('p')

        // Modification des éléments
        itemLink.setAttribute('href', `product.html?id=${article._id}`)

        itemImage.setAttribute('src', article.imageUrl)
        itemImage.setAttribute('alt', article.altTxt)

        itemTitle.classList.add('productName')
        itemTitle.innerText = article.name

        itemDescription.classList.add('productDescription')
        itemDescription.innerText = article.description

        // Insertion des éléments
        itemArticle.appendChild(itemImage)
        itemArticle.appendChild(itemTitle)
        itemArticle.appendChild(itemDescription)

        itemLink.appendChild(itemArticle)

        itemsSection.appendChild(itemLink)
    }
}

/**
 * Main function of index.html
 */
const main = async () => {

    // Obtention de la liste de produits à partir de l'API
    const productsList = await retrieveProducts()
    console.log(productsList)

    // Construction de la page index.html avec la liste de produits
    createIndex(productsList)
}

// Appel de la fonction main pour la page index.html
main()