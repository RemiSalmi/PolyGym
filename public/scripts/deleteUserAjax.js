{
    const userId = document.getElementById('userId').innerHTML
    const dltBtn = document.getElementsByClassName('dltBtn')[0]

    dltBtn.addEventListener("click", deleteUser)

    function deleteUser(event) {

        let Request = new XMLHttpRequest()
        const address = '/utilisateurs/' + userId
        Request.open("DELETE", address, true)
        Request.onreadystatechange = function () {
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 200) {
                window.location.href = '/'
            }
            if (Request.readyState == XMLHttpRequest.DONE && Request.status == 401) {
                document.getElementById('error').innerHTML = JSON.parse(Request.response).error + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>'
                document.getElementById('error').style.display = "block"
            }
        }
        Request.send()
    }
}