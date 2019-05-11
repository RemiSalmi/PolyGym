module.exports = class Utilisateur {
    constructor(id,nom,prenom,mail,mdp){
        this.id =id;
        this.nom = nom;
        this.prenom = prenom;
        this.mail = mail;
        this.mdp = mdp;
    }
}