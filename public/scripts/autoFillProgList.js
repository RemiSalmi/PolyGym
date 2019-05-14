{
    const idUser = document.getElementById('inputIdUser').value
    const adresse = '/programmes/utilisateurs/' + idUser
    let Request = new XMLHttpRequest()
    Request.open("GET", adresse, true)
    Request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
    Request.onreadystatechange = function () {
        if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
            const tabProgs = Request.response
            let select = document.getElementById('inputIdProg')
            var progs = JSON.parse(tabProgs)
            progs.forEach(element => {
                select.innerHTML += '<option value=' + element.id + '>' + element.lib + '</option>'
            });
        }
        if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
            console.log('erreur lors de l\'obtention des programmes')

        }
    }
    Request.send()
}