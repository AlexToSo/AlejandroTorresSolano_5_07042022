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
        cartInputSettingsQuantity.setAttribute('type', 'number')
        cartInputSettingsQuantity.classList.add('itemQuantity')
        cartInputSettingsQuantity.setAttribute('name', 'itemQuantity')
        cartInputSettingsQuantity.setAttribute('min', '1')
        cartInputSettingsQuantity.setAttribute('max', '100')
        cartInputSettingsQuantity.setAttribute('value', cartProduct.quantity)
        cartInputSettingsQuantity.addEventListener('change', function (event) {
            modifyCart(this.closest('article').dataset.id, parseFloat(event.target.value), this.closest('article').dataset.color)
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

const submitForm = () => {
    let firstNameOk, lastNameOk, addressOk, cityOk, emailOk = false
    const firstNameInput = document.getElementById('firstName')
    const lastNameInput = document.getElementById('lastName')
    const addressInput = document.getElementById('address')
    const cityInput = document.getElementById('city')
    const emailInput = document.getElementById('email')


    firstNameInput.addEventListener('input', function (event) {
        if (/^[A-Z]/.test(event.target.value)) {
            document.getElementById('firstNameErrorMsg').innerText = ''
            firstNameOk = true
        }
        else {
            document.getElementById('firstNameErrorMsg').innerText = 'Votre prénom doit commencer par majuscule'
            firstNameOk = false
        }
    })

    lastNameInput.addEventListener('input', function (event) {
        if (/[A-Z]/.test(event.target.value)) {
            document.getElementById('lastNameErrorMsg').innerText = ''
            lastNameOk = true
        }
        else {
            document.getElementById('lastNameErrorMsg').innerText = 'Votre nom doit contenir au moins une majuscule'
            lastNameOk = false
        }
    })

    addressInput.addEventListener('input', function (event) {
        if (event.target.value != '') {
            document.getElementById('addressErrorMsg').innerText = ''
            addressOk = true
        }
        else {
            document.getElementById('addressErrorMsg').innerText = 'Votre adresse doit être renseignée'
            addressOk = false
        }
    })

    cityInput.addEventListener('input', function (event) {
        if (event.target.value != '') {
            document.getElementById('cityErrorMsg').innerText = ''
            cityOk = true
        }
        else {
            document.getElementById('cityErrorMsg').innerText = 'Votre ville doit être renseignée'
            cityOk = false
        }
    })

    emailInput.addEventListener('input', function (event) {
        if (/@/.test(event.target.value)) {
            document.getElementById('emailErrorMsg').innerText = ''
            emailOk = true
        }
        else {
            document.getElementById('emailErrorMsg').innerText = 'Votre email n\'est pas valide'
            emailOk = false
        }
    })

    document.getElementById('order').addEventListener('click', function (event) {
        event.preventDefault()
        if (firstNameOk && lastNameOk && addressOk && cityOk && emailOk) {
            const contact = new Contact(firstNameInput.value, lastNameInput.value, addressInput.value, cityInput.value, emailInput.value)
            const cartList = getCart()

            console.log(cartList)
        }
    })

}

const main = async () => {

    await createCart()

    submitForm()

    // for (let i in cartList) {
    //     quantityInputs[i].addEventListener('change', function (e) {
    //         console.log('salut');
    //         // let articleNumber = parseFloat(document.getElementById('quantity').value)
    //         // let articleColor = document.getElementById('colors').value

    //         // if (articleNumber > 0) {
    //         //     modifyCart(articleId, articleNumber, articleColor)
    //         // }

    //     });
    // }



}

main()