{
    let btns = document.getElementsByClassName('updtBtn')
    let btnsSave = document.getElementsByClassName('updtSaveBtn')
    let btnCancel = document.getElementsByClassName('cancelBtn')

    for (let i = 0; i < btns.length; i++) {
        btns[i].addEventListener("click", updtMode)
    }

    for (let i = 0; i < btns.length; i++) {
        btnsSave[i].addEventListener("click", updtProg)
    }    

    for (let i = 0; i < btns.length; i++) {
        btnCancel[i].addEventListener("click", cancelUpdt)
    }  

    function cancelUpdt(event){
        event.target.classList.add('d-none')
        event.target.parentNode.lastElementChild.classList.add('d-none')
        event.target.parentNode.children[2].classList.remove('d-none')
        event.target.parentNode.children[0].children[0].children[0].children[2].classList.add('d-none')
        event.target.parentNode.children[0].children[0].children[2].children[2].classList.add('d-none')
    }

    function updtMode(event){
        event.target.classList.add('d-none')
        event.target.parentNode.children[3].classList.remove('d-none')

        event.target.parentNode.lastElementChild.classList.remove('d-none')
        
        event.target.parentNode.children[0].children[0].children[0].children[2].classList.remove('d-none')
        event.target.parentNode.children[0].children[0].children[2].children[2].classList.remove('d-none')
    }

    function updtProg(event){
        const idProg = document.getElementById('idProg').innerHTML
        const nbSerie = Math.abs(event.target.parentNode.children[0].children[0].children[0].children[2].children[0].value)
        const nbRep = Math.abs(event.target.parentNode.children[0].children[0].children[2].children[2].children[0].value)
        const idEx = event.target.parentNode.parentNode.children[0].children[0].innerHTML

        let Request = new XMLHttpRequest()
        const address = '/programmes/mesProgrammes/' + idProg
        Request.open("PUT", address, true)
        Request.setRequestHeader("Content-type", "application/x-www-form-urlencoded")
        Request.onreadystatechange = function () {
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
                document.location.reload()
            }
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
                document.getElementById('error').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">'+JSON.parse(Request.response).error +'<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
            }
        }
        payLoad = "inputNbRep=" + nbRep + "&" + "inputNbSerie=" + nbSerie + "&" + "idEx=" + idEx
        console.log(payLoad)
        Request.send(payLoad)
        
    }
}