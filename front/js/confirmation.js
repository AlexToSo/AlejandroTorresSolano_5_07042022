const main = async () => {

    var url = new URL(window.location.href)
    const orderId = url.searchParams.get('id')

    document.getElementById('orderId').innerText = orderId
}

main()