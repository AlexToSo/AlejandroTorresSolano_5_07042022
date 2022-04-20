///////////////////////////////////////////////////
// Fonction pour construire la page product.html //
///////////////////////////////////////////////////
const createProduct = (item) => {

    // Déclaration des éléments indépendentes des couleurs
    const itemImage = document.createElement('img')
    const itemTitle = document.getElementById('title')
    const itemPrice = document.getElementById('price')
    const itemDescription = document.getElementById('description')

    // Modification des éléments
    itemImage.setAttribute('src', item.imageUrl)
    itemTitle.innerText = item.name
    itemPrice.innerText = item.price
    itemDescription.innerText = item.description

    // Insertion des éléments
    document.querySelector('.item__img').appendChild(itemImage)

    // Boucle pour créer et insérer toutes les options de couleurs
    for (color of item.colors) {

        // Déclaration des éléments dépendentes des couleurs
        const itemColorOption = document.createElement('option')

        // Modification des éléments
        itemColorOption.setAttribute('value', color)
        itemColorOption.innerText = color

        // Insertion des éléments
        document.getElementById('colors').appendChild(itemColorOption)
    }
}

//////////////////////////////////////////////////////
// Fonction pour ajouter un produit dans le pannier //
//////////////////////////////////////////////////////
const addToCart = (articleId, articleNumber, articleColor) => {

    // Récuperation de la liste de produits qui pourraient déjà être présents dans le pannier
    let cartList = getCart()
    let articleToAdd = new CartItem(articleId, articleNumber, articleColor)

    // Boucle pour détecter si le produit que l'on souhaite ajouter se trouve déjà dans le pannier
    let alreadyInCart = false
    for (let i in cartList) {

        // Si l'id ET la couleur du produit correspondent avec un autre déjà existent dans le pannier...
        if ((cartList[i].id == articleToAdd.id) && (cartList[i].color == articleToAdd.color)) {
            
            // ...on incrémente le nombre du produit concerné
            cartList[i].quantity += articleToAdd.quantity
            alreadyInCart = true;
            
            // Plus besoin de chercher plus, on peut sortir de la boucle
            break
        }
    }

    // Si le produit que l'on souhaite ajouter ne se trouve pas dans le pannier, on l'ajoute à la fin
    if (!alreadyInCart) {
        cartList.push(articleToAdd)
    }

    // Sauvegarde de la nouvelle liste de produits dans le localStorage
    saveCart(cartList)
}

///////////////////
// Fonction main //
///////////////////
const main = async () => {

    // Récuperation de l'id du produit dans l'URL
    var url = new URL(window.location.href)
    const articleId = url.searchParams.get('id')

    // Obtention des informations du produit concerné par l'id à partir de l'API
    const product = await retrieveProducts(articleId)

    // Construction de la page product.html avec les informations du produit
    createProduct(product)

    // Déclaration de la fonction de callback pour ajouter au pannier
    document.getElementById('addToCart').addEventListener('click', function () {
        
        // Récuperation du nombre et couleur de produits souhaités
        let articleNumber = Number(document.getElementById('quantity').value);
        let articleColor = document.getElementById('colors').value;

        // Ajout au pannier si le nombre et couleur du produit ont été renseignés
        if ((articleNumber > 0) && (articleColor != '')) {
            addToCart(articleId, articleNumber, articleColor);
        }
    })
}

// Appel de la fonction main pour la page product.html
main()