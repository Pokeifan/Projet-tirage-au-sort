// Tableau d'étudiants (chaque étudiant est un objet avec son nom et son statut de sélection)
let etudiants = [];

// Sélection des éléments du DOM
const formAjoutEtudiant = document.getElementById('formAjoutEtudiant');
const nomEtudiantInput = document.getElementById('nomEtudiant');
const listeEtudiants = document.getElementById('listeEtudiants');
const messageErreur = document.getElementById('messageErreur');
const messageResultat = document.getElementById('messageResultat');
const tirageBtn = document.getElementById('tirageBtn');
const viderListeBtn = document.getElementById('viderListeBtn');

// Ajouter un étudiant à la liste
formAjoutEtudiant.addEventListener('submit', (e) => {
    e.preventDefault();
    const nomComplet = nomEtudiantInput.value.trim();

    // Validation des erreurs
    if (nomComplet === '') {
        afficherErreur('Le nom ne peut pas être vide.');
        return;
    }
    if (etudiantExiste(nomComplet)) {
        afficherErreur('Cet étudiant existe déjà.');
        return;
    }

    // Ajouter l'étudiant
    const nouvelEtudiant = { nom: nomComplet, estSelectionne: false };
    etudiants.push(nouvelEtudiant);
    afficherListeEtudiants();
    nomEtudiantInput.value = '';  // Vider le champ de saisie
    effacerMessage();  // Effacer les messages d'erreur
});

// Vérifier si un étudiant existe déjà dans la liste
function etudiantExiste(nomComplet) {
    return etudiants.some(etudiant => etudiant.nom === nomComplet);
}

// Afficher la liste des étudiants
function afficherListeEtudiants() {
    listeEtudiants.innerHTML = '';
    etudiants.forEach(etudiant => {
        const li = document.createElement('li');
        li.textContent = etudiant.nom + (etudiant.estSelectionne ? ' (sélectionné)' : '');
        listeEtudiants.appendChild(li);
    });
}

// Tirer au sort un étudiant
tirageBtn.addEventListener('click', () => {
    const nonSelectionnes = etudiants.filter(etudiant => !etudiant.estSelectionne);
    
    if (nonSelectionnes.length === 0) {
        afficherErreur('Tous les étudiants ont déjà été sélectionnés.');
        return;
    }

    // Sélection aléatoire d'un étudiant parmi ceux qui ne sont pas encore sélectionnés
    const indexAleatoire = Math.floor(Math.random() * nonSelectionnes.length);
    const etudiantSelectionne = nonSelectionnes[indexAleatoire];

    // Marquer l'étudiant comme sélectionné
    etudiantSelectionne.estSelectionne = true;
    afficherListeEtudiants();
    messageResultat.textContent = `L'étudiant sélectionné est : ${etudiantSelectionne.nom}`;
    effacerMessage();  // Effacer les messages d'erreur
});

// Vider la liste des étudiants
viderListeBtn.addEventListener('click', () => {
    etudiants = [];
    afficherListeEtudiants();
    messageResultat.textContent = '';
    effacerMessage();
});

// Afficher un message d'erreur
function afficherErreur(message) {
    messageErreur.textContent = message;
}

// Effacer les messages d'erreur
function effacerMessage() {
    messageErreur.textContent = '';
}
