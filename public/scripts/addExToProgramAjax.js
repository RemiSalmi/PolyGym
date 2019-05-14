{
    const formulaire = document.getElementById('addProgForm')
    formulaire.addEventListener("submit", sendReq)

    function sendReq(event) {
        event.preventDefault();
        let Request = new XMLHttpRequest()
        Request.open("POST", '/programmes/exercices', true)
        Request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        Request.onreadystatechange = function () {
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
                document.getElementById('success').innerHTML = JSON.parse(Request.response).success + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                document.getElementById('success').style.display = "block"
            }
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
                document.getElementById('error').innerHTML = JSON.parse(Request.response).error + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                document.getElementById('error').style.display = "block"
            }
        }
        const idProg = document.getElementById('inputIdProg').value
        const nbRep = document.getElementById('inputNbRep').value
        const nbSerie = document.getElementById('inputNbSerie').value
        const idEx = document.getElementById('idEx').innerHTML

        console.log(idProg, nbRep, nbSerie, idEx)
        payLoad = "inputIdProg=" + idProg + "&" + "inputNbRep=" + nbRep + "&" + "inputNbSerie=" + nbSerie + "&" + "idEx=" + idEx
        Request.send(payLoad)

    }
}