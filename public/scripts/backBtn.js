{
    btn = document.getElementById('backBtn')
    btn.addEventListener("click", goBack)

    function goBack(){
        window.history.back();
    }
}