{
    let btns = document.getElementsByClassName('deleteBtn');
    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", deleteProg)
    }

    function deleteProg(event) {
        const idProg = event.target.parentNode.children[0].innerHTML

        console.log(idProg)

        let Request = new XMLHttpRequest()
        const address = '/programmes/mesProgrammes/' + idProg
        Request.open("DELETE", address, true)
        Request.onreadystatechange = function () {
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
                window.location.reload()
            }
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
                document.getElementById('error').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+JSON.parse(Request.response).error +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        }
        Request.send()
    }
}