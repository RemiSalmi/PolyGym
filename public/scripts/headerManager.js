{
    let connexionButton = document.getElementById('navbarDropdownMenuLink')
    let connexionOptions = document.getElementById('connexionOptions')
    let monCompteLink = document.getElementById('monCompteLink')
    let mesProgrammesLink = document.getElementById('mesProgrammesLink')
    if (document.cookie.indexOf('token') == 0) {
        connexionButton.innerHTML = "Déconnexion"
        connexionOptions.innerHTML = '<a class="dropdown-item" href="/utilisateurs/logout">Se déconnecter</a>'

    } else {
        monCompteLink.style.display = 'none'
        mesProgrammesLink.style.display = 'none'
    }
}