
# Web Scraping France Festivals

## Avant de commencer

Avant de lancer le programme il y a quelques vérifications et configurations à réaliser : 
S’assurer que toutes les urls dans la colonne du fichier dédiée aux sites internet sont correctes : 

Il faut que l’url commence par http.. ex: https://www.google.fr/ et non www.google.fr ou google.fr par exemple

Vérifier que toutes les urls dirigent vers une page qui existe (pour éviter l’erreur 404 page non trouvé)

Eviter de préférence les pages facebook, en effet facebook détecte facilement quand une de ses pages est lu par un ordinateur, c’est donc plus difficile d’obtenir des résultats.

De préférence le site doit correspondre à une page qui contient directement des informations sur le festival et non le lien de la page d’accueil de la ville où se déroule le festival ou le site internet de l’association qui l’organise par exemple. 

Vous devez ajouter un fichier excel dans le dossier backend/file et les colonnes du fichier excel doivent être dans un ordre précis pour que le programme puisse mettre les données dans les bonnes colonnes, vous pouvez les trouver dans le dossier backend, le fichier app.js dans la route qui permet de sauvegarder les données dans le fichier excel.

Dans le programme par exemple sont définies par défaut les colonnes : 

Colonne P correspond à la colonne de la saisonnalité
Colonne Z correspond à la discipline
Etc.

Ajouter les identifiants d’un compte facebook existants dans le dossier backend/utils/facebookAccount pour pouvoir lire les pages facebook.

## Installation

Une fois le repository copié dans un dossier de votre ordinateur, dans le terminal se placer sur le dossier backend et installer les paquets avec le manager de paquets npm avec la commande npm install puis entrer la commande suivante pour démarrer le serveur :

```bash
node app 
```
Ouvrez un autre terminal puis se positionner sur le dossier frontend/web-scraping-app et installer les paquets avec npm puis entrer la commande suivante pour lancer l’interface client :

```bash
npm start
```
Dans la fenêtre du navigateur qui s’est ouverte les résultats vont apparaître au bout d’une dizaine de secondes. 

## Utilisation 

Une fois que les résultats apparaissent, pour chaque festival il y a les résultats dans le formulaire à droite et un champ dédié à la discipline, la saisonnalité, l’adresse (numéro de voie, type de voie, nom de la voie …) et commentaire si vous avez un commentaire à ajouter.  

Vous pouvez ajouter un résultat ou le corriger en cliquant sur le bouton correspondant au résultat choisi. 

Les résultats sont surlignés en rouge  et jaune sur les images à gauche qui correspondent aux screenshots de la page de l’url et les pages du même site qui sont jugées intéressantes pour trouver les données. Rouges pour les résultats concernant l’adressage et jaune pour la discipline et saisonnalité. Vous pouvez voir les autres images dans la même zone si il y en a en scrollant vers le bas. Ces images servent de “contextes” pour ajouter ou corriger les résultats si besoin.

Une fois les champs vérifiés et remplis il faut cliquer sur le bouton “ajouter les résultats” même dans le cas où vous n’avez pas modifié le formulaire. Il faudra être attentif à bien cliquer sur ce bouton sur chaque festival, à chaque fois.

Lorsque vous arrivez à la fin de la page, un bouton sauvegarder apparait et il suffit de cliquer dessus pour envoyer les données dans le fichier excel. 
Puis la page suivante se charge et les résultats apparaissent de nouveau avec le formulaire et les images à gauche pour chaque festival.
Quand il n’y a plus de page à charger, il suffit d’enregistrer une dernière fois.

Ensuite vous pouvez récupérer le fichier avec les données ajoutées dans le dossier backend/file. 

## Format des données 

Le programme suit un format précis pour enregistrer les données dans le fichier excel.

Pour la discipline 6 options possibles sous ce format exact  : 
Musique
Cinéma,audiovisuel
Livre,littérature
Pluridisciplinaire
Spectacle vivant
Arts visuels,arts numériques

Pour la saisonnalité 3 options possibles sous ce format exact : 
Saison (21 juin - 5 septembre)
Après-saison (6 septembre - 31 décembre)
Avant-saison (1er janvier - 20 juin)

Pour l’adressage les adresses sont enregistrées sous le format suivant : 

1 Rue de la Mairie

Pour un lieu dit :

Salle Polyvalente de Toulouse
