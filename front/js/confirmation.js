/**
 * Main function of confirmation.html
 */
const main = async () => {

    // Récuperation de l'id de la commande dans l'URL
    var url = new URL(window.location.href)
    const orderId = url.searchParams.get('id')

    // Affichage de l'id de la commande
    document.getElementById('orderId').innerText = orderId
}

// Appel de la fonction main pour la page confirmation.html
main()