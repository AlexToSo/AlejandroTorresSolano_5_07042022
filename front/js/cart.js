class Contact {
    constructor(firstName, lastName, address, city, email) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.city = city;
        this.email = email;
    }
}

const createCart = async () => {

    let cartList = getCart();

    let articlesNumber = 0
    let articlesPrice = 0

    const cartSection = document.getElementById('cart__items')

    while (cartSection.hasChildNodes()) {
        cartSection.removeChild(cartSection.firstChild)
    }

    for (let cartProduct of cartList) {
        const product = await retrieveProducts(cartProduct.id);

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
        cartInputSettingsQuantity.addEventListener('change', function (event) {
            modifyCart(this.closest('article').dataset.id, Number(event.target.value), this.closest('article').dataset.color)
        });

        cartDivSettingsQuantity.appendChild(cartPSettingsQuantity)
        cartDivSettingsQuantity.appendChild(cartInputSettingsQuantity)

        const cartDivSettingsDelete = document.createElement('div')
        cartDivSettingsDelete.classList.add('cart__item__content__settings__delete')

        const cartDeleteItem = document.createElement('p')
        cartDeleteItem.classList.add('deleteItem')
        cartDeleteItem.innerText = 'Supprimer'
        cartDeleteItem.addEventListener('click', function () {
            modifyCart(this.closest('article').dataset.id, 0, this.closest('article').dataset.color)
        })


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

        articlesNumber += cartProduct.quantity
        articlesPrice += product.price * cartProduct.quantity
    }

    document.getElementById('totalQuantity').innerText = articlesNumber
    document.getElementById('totalPrice').innerText = articlesPrice.toFixed(2)

}

const modifyCart = async (articleId, articleNumber, articleColor) => {
    let cartList = getCart()

    for (let i in cartList) {
        if ((cartList[i].id == articleId) && (cartList[i].color == articleColor)) {
            if (articleNumber > 0) {
                cartList[i].quantity = articleNumber;
                break
            }
            else {
                cartList.splice(i, 1)
                console.log(cartList)
            }
        }
    }

    saveCart(cartList)
    // window.location.reload()
    await createCart()
}

const checkForm = () => {

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

    return document.getElementById('firstNameErrorMsg').innerText == '' &&
        document.getElementById('lastNameErrorMsg').innerText == '' &&
        document.getElementById('addressErrorMsg').innerText == '' &&
        document.getElementById('cityErrorMsg').innerText == '' &&
        document.getElementById('emailErrorMsg').innerText == ''
}

const sendForm = async (contact) => {

    let cartList = getCart()

    let idList = cartList.map((item) => {
        return item.id
    })

    try {
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

const main = async () => {

    await createCart()

    document.getElementById('order').addEventListener('click', async function (event) {
        event.preventDefault()
        if (checkForm()) {
            const contact = new Contact(
                document.getElementById('firstName').value,
                document.getElementById('lastName').value,
                document.getElementById('address').value,
                document.getElementById('city').value,
                document.getElementById('email').value
            )

            const order = await sendForm(contact)
            
            if (order.orderId) {
                location.href = `confirmation.html?id=${order.orderId}`
            }
            
        }
    })
}

main()