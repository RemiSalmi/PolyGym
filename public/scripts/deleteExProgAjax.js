{
    let btns = document.getElementsByClassName('deleteBtn')

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", deleteEx)
    }

    function deleteEx(event) {
        const idEx = event.target.parentNode.firstElementChild.innerHTML
        const idProg = document.getElementById('idProg').innerHTML

        let Request = new XMLHttpRequest()
        const address = '/programmes/mesProgrammes/' + idProg + '/exercices/' + idEx
        Request.open("DELETE", address, true)
        Request.onreadystatechange = function () {
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
                window.location.href = '/programmes/mesProgrammes/' + idProg
            }
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
                document.getElementById('error').innerHTML = JSON.parse(Request.response).error + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                document.getElementById('error').style.display = "block"
            }
        }
        Request.send()
    }
}