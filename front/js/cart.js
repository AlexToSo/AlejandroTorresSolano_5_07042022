////////////////////////////////////////////////
// Fonction pour construire la page cart.html //
////////////////////////////////////////////////
const createCart = async (cartList) => {

    // Déclaration des variables pour compter le nombre d'articles et leur prix
    let articlesNumber = 0, articlesPrice = 0

    // Déclaration des éléments indépendentes des articles
    const cartSection = document.getElementById('cart__items')

    // Réinitialisation de la page, pour gérer la modification d'articles depuis la même page pannier
    while (cartSection.hasChildNodes()) {
        cartSection.removeChild(cartSection.firstChild)
    }

    // Boucle pour créer et insérer tous les articles
    for (let cartProduct of cartList) {

        // Obtention des informations du produit concerné par l'id à partir de l'API
        const product = await retrieveProducts(cartProduct.id);

        // Déclaration et modification de tous les éléments dépendents des articles
        const cartArticle = document.createElement('article')
        cartArticle.classList.add('cart__item')
        cartArticle.dataset.id = cartProduct.id
        cartArticle.dataset.color = cartProduct.color

        const cartDivImage = document.createElement('div')
        cartDivImage.classList.add('cart__item__img')

        const cartImage = document.createElement('img')
        cartImage.setAttribute('src', product.imageUrl)
        cartImage.setAttribute('alt', product.altTxt)

        const cartDivContent = document.createElement('div')
        cartDivContent.classList.add('cart__item__content')

        const cartDivDescription = document.createElement('div')
        cartDivDescription.classList.add('cart__item__content__description')

        const cartProductName = document.createElement('h2')
        cartProductName.innerText = product.name

        const cartProductColor = document.createElement('p')
        cartProductColor.innerText = cartProduct.color

        const cartProductPrice = document.createElement('p')
        cartProductPrice.innerText = (product.price * cartProduct.quantity).toFixed(2) + ' €'

        const cartDivSettings = document.createElement('div')
        cartDivSettings.classList.add('cart__item__content__settings')

        const cartDivSettingsQuantity = document.createElement('div')
        cartDivSettingsQuantity.classList.add('cart__item__content__settings__quantity')

        const cartPSettingsQuantity = document.createElement('p')
        cartPSettingsQuantity.innerText = 'Qté : '

        const cartInputSettingsQuantity = document.createElement('input')
        cartInputSettingsQuantity.classList.add('itemQuantity')
        cartInputSettingsQuantity.setAttribute('type', 'number')
        cartInputSettingsQuantity.setAttribute('name', 'itemQuantity')
        cartInputSettingsQuantity.setAttribute('min', '1')
        cartInputSettingsQuantity.setAttribute('max', '100')
        cartInputSettingsQuantity.setAttribute('value', cartProduct.quantity)

        const cartDivSettingsDelete = document.createElement('div')
        cartDivSettingsDelete.classList.add('cart__item__content__settings__delete')

        const cartDeleteItem = document.createElement('p')
        cartDeleteItem.classList.add('deleteItem')
        cartDeleteItem.innerText = 'Supprimer'

        // Déclaration de la fonction de callback pour modifier le nombre de l'article
        cartInputSettingsQuantity.addEventListener('change', function (event) {
            modifyCart(this.closest('article').dataset.id, Number(event.target.value), this.closest('article').dataset.color)
        })

        // Déclaration de la fonction de callback pour supprimer l'article
        cartDeleteItem.addEventListener('click', function () {
            modifyCart(this.closest('article').dataset.id, 0, this.closest('article').dataset.color)
        })

        // Insertion des éléments
        cartDivImage.appendChild(cartImage)

        cartDivDescription.appendChild(cartProductName)
        cartDivDescription.appendChild(cartProductColor)
        cartDivDescription.appendChild(cartProductPrice)

        cartDivSettingsQuantity.appendChild(cartPSettingsQuantity)
        cartDivSettingsQuantity.appendChild(cartInputSettingsQuantity)

        cartDivSettingsDelete.appendChild(cartDeleteItem)

        cartDivSettings.appendChild(cartDivSettingsQuantity)
        cartDivSettings.appendChild(cartDivSettingsDelete)

        cartDivContent.appendChild(cartDivDescription)
        cartDivContent.appendChild(cartDivSettings)

        cartArticle.appendChild(cartDivImage)
        cartArticle.appendChild(cartDivContent)

        cartSection.appendChild(cartArticle)

        // Mise à jour du nombre d'articles et leur prix
        articlesNumber += cartProduct.quantity
        articlesPrice += product.price * cartProduct.quantity
    }

    // Ajout du nombre d'articles et leur prix
    document.getElementById('totalQuantity').innerText = articlesNumber
    document.getElementById('totalPrice').innerText = articlesPrice.toFixed(2)

}

//////////////////////////////////////////////////////////////
// Fonction pour modifier le pannier dans la page cart.html //
//////////////////////////////////////////////////////////////
const modifyCart = async (articleId, articleNumber, articleColor) => {

    // Récuperation de la liste actuelle du pannier
    let cartList = getCart()

    // Boucle pour parcourir tous les articles du pannier
    for (let i in cartList) {

        // Quand on trouve l'article modifié ...
        if ((cartList[i].id == articleId) && (cartList[i].color == articleColor)) {

            // Si le nombre a été changé, on le modifie dans la liste
            if (articleNumber > 0) {
                cartList[i].quantity = articleNumber;
            }

            // Si l'article a été supprimé, on l'enlève de la liste
            else {
                cartList.splice(i, 1)
            }

            // Pas besoin de chercher plus d'articles
            break
        }
    }

    // Sauvegarde de la nouvelle liste de produits dans le localStorage
    saveCart(cartList)

    // Réinitialisation de la page du pannier avec la nouvelle liste de produits
    await createCart(cartList)
}

/////////////////////////////////////////////////////
// Fonction pour vérifier les champs du formulaire //
/////////////////////////////////////////////////////
const checkForm = () => {

    // Vérification de tous les champs du formulaire avec des expressions rationnelles
    // Si un champ n'est pas correct, l'on ajoute un message d'erreur indiquant le problème
    document.getElementById('firstNameErrorMsg').innerText = /^[A-Z]/.test(document.getElementById('firstName').value)
        ? ''
        : 'Votre prénom doit commencer par majuscule'

    document.getElementById('lastNameErrorMsg').innerText = /[A-Z]/.test(document.getElementById('lastName').value)
        ? ''
        : 'Votre nom doit contenir au moins une majuscule'

    document.getElementById('addressErrorMsg').innerText = document.getElementById('address').value != ''
        ? ''
        : 'Votre adresse doit être renseignée'

    document.getElementById('cityErrorMsg').innerText = document.getElementById('city').value != ''
        ? ''
        : 'Votre ville doit être renseignée'

    document.getElementById('emailErrorMsg').innerText = /@/.test(document.getElementById('email').value)
        ? ''
        : 'Votre email n\'est pas valide'

    // Retour d'un boolean: true si tout OK (tous les messages vides), false sinon
    return document.getElementById('firstNameErrorMsg').innerText == '' &&
        document.getElementById('lastNameErrorMsg').innerText == '' &&
        document.getElementById('addressErrorMsg').innerText == '' &&
        document.getElementById('cityErrorMsg').innerText == '' &&
        document.getElementById('emailErrorMsg').innerText == ''
}

///////////////////////////////////////////////
// Fonction pour envoi du formulaire à l'API //
///////////////////////////////////////////////
const sendForm = async (contact) => {

    // Récuperation et modification de la liste du pannier pour pouvoir être traitée par l'API
    let cartList = getCart()
    let idList = cartList.map((item) => {
        return item.id
    })

    try {
        // Lancement de la requête POST avec un objet contenant les informations du contact et la liste de produits
        let response = await fetch('http://localhost:3000/api/products/order', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ contact: contact, products: idList })
        })
        if (response.ok) {
            return response.json()
        }
    }
    catch (err) {
        console.log('Erreur ' + err)
    }
}

///////////////////
// Fonction main //
///////////////////
const main = async () => {

    // Récuperation de la liste du pannier pour afficher dans la page
    let cartList = getCart()

    // Construction de la page cart.html avec les informations de la liste du pannier
    await createCart(cartList)

    // Déclaration de la fonction de callback pour lancer la commande
    document.getElementById('order').addEventListener('click', async function (event) {
        event.preventDefault()

        // Vérification des champs du formulaire
        if (checkForm()) {

            // Déclaration de l'objet "contact" pour envoi du formulaire
            const contact = new Contact(
                document.getElementById('firstName').value,
                document.getElementById('lastName').value,
                document.getElementById('address').value,
                document.getElementById('city').value,
                document.getElementById('email').value
            )

            // Envoi du formulaire à l'API
            const order = await sendForm(contact)

            // Si l'API retourne un orderId non null, rédirection vers la page de confirmation
            if (order.orderId) {
                location.href = `confirmation.html?id=${order.orderId}`
            }

        }
    })
}

// Appel de la fonction main pour la page cart.html
main()