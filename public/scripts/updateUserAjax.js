{
    const btnUpdtMode = document.getElementById('btnUpdtMode')
    const btnCancel = document.getElementById('btnCancelUpdt')
    const btnUpdt = document.getElementById('btnUpdt')

    btnUpdtMode.addEventListener("click", updtMode)
    btnCancel.addEventListener("click", displayMode)
    btnUpdt.addEventListener("click", update)

    function updtMode(event) {
        event.target.classList.add('d-none')
        document.getElementById('btnDltMode').classList.add('d-none')
        document.getElementById('btnUpdt').classList.remove('d-none')
        document.getElementById('btnCancelUpdt').classList.remove('d-none')
        document.getElementById('displayView').classList.add('d-none')
        document.getElementById('updtView').classList.remove('d-none')
    }

    function displayMode(event) {
        event.target.classList.add('d-none')
        document.getElementById('displayView').classList.remove('d-none')
        document.getElementById('updtView').classList.add('d-none')
        btnUpdtMode.classList.remove('d-none')
        document.getElementById('btnDltMode').classList.remove('d-none')
        document.getElementById('btnUpdt').classList.add('d-none')
    }

    function update(event) {
        const mdp = document.getElementById('inputMdp').value
        const mdp2 = document.getElementById('inputMdp2').value
        console.log(mdp)
        console.log(mdp2)

        if (mdp == mdp2) {
            console.log("ok")
        } else {
            console.log('nop')
            document.getElementById('error').innerHTML = '<div class="alert alert-danger alert-dismissible fade show" role="alert">Les mots de passe ne correspondent pas<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>'
        }
    }

}