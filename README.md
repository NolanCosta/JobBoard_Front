# JOBBOARD

Ce projet est une application web de type Job Board développée avec React. Elle permet aux utilisateurs de consulter et de postuler à des offres d'emploi, ainsi que de gérer leurs profils et leurs entreprises.

## Installation

Pour installer les dépendances du projet, exécutez la commande suivante :

```sh
npm install
```

Ce guide vous explique comment installer et configurer un projet **React** à partir de zéro. Suivez ces étapes pour démarrer rapidement avec React dans votre environnement de développement **VS Code**.

## Prérequis

Avant de commencer, assurez-vous que vous avez les éléments suivants installés sur votre machine :

- **Node.js** : React nécessite Node.js pour fonctionner. Vous pouvez le télécharger et l'installer depuis le site officiel : [Node.js](https://nodejs.org/).
- **npm** (ou **yarn**) : npm est le gestionnaire de paquets qui vient avec Node.js. Si vous préférez utiliser Yarn, vous pouvez également l'installer.

Vérifiez si Node.js et npm sont correctement installés en exécutant les commandes suivantes dans votre terminal :

```bash
node -v
npm -v

```

Dans le terminal, exécutez la commande suivante pour démarrer le serveur de développement :


```bash

npm start

```

Une nouvelle fenêtre du navigateur s'ouvrira automatiquement avec votre application React fonctionnant en local à l'adresse suivante : http://localhost:3000.

### Structure du projet

```java
.env
.gitignore
[package.json]
public/
    index.html
    manifest.json
    robots.txt
[README.md]
src/
    App.css
    App.js
    App.test.js
    assets/
        css/
        image/
    components/
        admin/
        advertisement.jsx
        context/
        custom/
        layout/
        loader/
    index.css
    index.js
    pages/
        Admin/
        AdvertisementPage.jsx
        ApplyAdvertisementPage.jsx
        Auth/
        CompanyPage.jsx
        CreateCompanyPage.jsx
        EditCompanyPage.jsx
        EditProfilePage.jsx
        HomePage.jsx
        JobsPage.jsx
        ...
    reportWebVitals.js
    service/
        ...
    setupTests.js
```
Détails des fichiers importants
src/App.js : Le composant principal de votre application React.
public/index.html : Le fichier HTML dans lequel votre application sera rendue.
package.json : Le fichier de configuration contenant les dépendances et les scripts de votre projet.


Pour ajouter des bibliothèques tierces, utilisez npm. Par exemple, pour installer React Router, exécutez :

```bash

npm install react-router-dom

```

## Étape 2 : Comprendre les composants

Composants
Les composants sont situés dans le dossier src/components. Voici quelques exemples de composants :

- `advertisement.jsx` : Ce composant affiche une publicité.
- `admin` : Ce dossier contient les composants liés à l'administration.

React est basé sur l'architecture des composants. Les composants sont des morceaux réutilisables de code qui représentent une partie de l'interface utilisateur. Voici comment cela fonctionne :

### Création d'un Composant

Pour créer un nouveau composant, suivez ces étapes :

1. Dans le dossier `src`, créez un nouveau fichier pour votre composant, par exemple `advertisement.js`.


advertisement.jsx : Ce composant affiche plusieurs card. Il est utilisé pour montrer les annonces d'emploi aux utilisateurs.

2. Dans ce fichier, écrivez le code suivant :

   ```javascript
   import React from 'react';

   function Advertisement() {
       return (
           <div>
               <h1>Annonce!</h1>
           </div>
       );
   }

   export default Advertisement;

```javascript 

`admin` : Ce dossier contient les composants liés à l'administration, tels que la gestion des utilisateurs et des annonces. 

`context`: Ce dossier contient les contextes React utilisés pour gérer l'état global de l'application.

`custom` : Ce dossier contient des composants personnalisés réutilisables dans l'application. 

`layout` : Ce dossier contient les composants de mise en page, comme les en-têtes, les pieds de page, et les barres de navigation.

`loader` : Ce dossier contient les composants de chargement, utilisés pour indiquer à l'utilisateur que des données sont en cours de chargement. 

```
#### Admin 

`AdminUser.jsx`

``` 
Ce composant permet de gérer les utilisateurs. Il offre des fonctionnalités pour ajouter, supprimer et modifier les utilisateurs.

Ce composant permet de gérer les utilisateurs. Il offre des fonctionnalités pour ajouter, supprimer et modifier les utilisateurs. Voici les principales fonctionnalités :

Affichage de la liste des utilisateurs :

Le composant récupère la liste des utilisateurs depuis une API et les affiche dans une liste ou un tableau.
Ajout d'un utilisateur :

Le composant fournit un formulaire permettant d'ajouter un nouvel utilisateur. Lors de la soumission du formulaire, une requête POST est envoyée à l'API pour créer l'utilisateur.
Modification d'un utilisateur :

Le composant permet de sélectionner un utilisateur existant et de modifier ses informations. Lors de la soumission du formulaire de modification, une requête PUT est envoyée à l'API pour mettre à jour les informations de l'utilisateur.
Suppression d'un utilisateur :

Le composant permet de supprimer un utilisateur en envoyant une requête DELETE à l'API.
```

 - Détails des fonctionnalitées : 

1 - Affichage de la liste des utilisateurs :

- Utilisation de `useEffect`pour récupérer les utilisateurs depuis l'API lors du montage du composant.
- Affichage des utilisateurs dans une liste avec des boutons pour modifier et supprimer chaque utilisateur.

2 - Ajout d'un utilisateur :

- Formulaire avec des champs pour le nom et l'email.
- Gestion de l'état du formulaire avec `useState`.
- Envoi d'une requête POST à l'API pour ajouter un nouvel utilisateur.
- Mise à jour de la liste des utilisateurs avec le nouvel utilisateur ajouté.

3 - Modification d'un utilisateur :

- Sélection d'un utilisateur à modifier en cliquant sur le bouton "Modifier".
- Formulaire pré-rempli avec les informations de l'utilisateur sélectionné.
- Gestion de l'état du formulaire de modification avec `useState`.
- Envoi d'une requête PUT à l'API pour mettre à jour les informations de l'utilisateur.
- Mise à jour de la liste des utilisateurs avec les informations modifiées.

4 - Suppression d'un utilisateur :

- - Envoi d'une requête DELETE à l'API pour supprimer l'utilisateur.
Mise à jour de la liste des utilisateurs en supprimant l'utilisateur supprimé.

Ces fonctionnalités permettent à l'administrateur de gérer efficacement les utilisateurs de l'application JOBBOARD.

idem pour les composants : `AdminApply.jsx` , `AdminCompany.jsx`, `AdminJobs.jsx` . 

#### Layout 

`Header.jsx`

Le composant Header.jsx est responsable de l'affichage de l'en-tête de l'application. Voici les principales fonctionnalités de ce composant :

1 - Affichage du logo et du titre de l'application :

- Le logo et le titre de l'application sont affichés en haut de la page. 

2- Navigation principale :

- Le composant `Header` inclut une barre de navigation avec des liens vers les principales sections de l'application, telles que les offres d'emploi, le profil utilisateur, et l'administration.
- Les liens de navigation sont créés en utilisant le composant NavLink de react-router-dom pour permettre une navigation sans rechargement de page.

`Footer.jsx`

Le composant Footer.jsx est responsable de l'affichage du pied de page de l'application. Voici les principales fonctionnalités de ce composant :

Affichage des informations :

- Le pied de page affiche les contacts des responsables du site ainsi que le footer pour indiquer les droits d'auteur de l'application.

- Le logo partenaire Epitech.

- Les liens linkedins.

### Pages 

Les pages sont situées dans le dossier src/pages. Voici une description détaillée de chaque page :

`AdvertisementPage.jsx` : Cette page affiche les annonces complète. Elle utilise le composant Advertisement pour afficher les annonces d'emploi.

`ApplyAdvertisementPage.jsx` : Cette page permet de postuler à une annonce . Elle contient un formulaire que les utilisateurs peuvent remplir pour postuler à une offre d'emploi.

`CompanyPage.jsx` : Cette page affiche les informations d'une entreprise. Elle montre les détails de l'entreprise et les offres d'emploi disponibles.

`CreateCompanyPage.jsx` : Cette page permet de créer une nouvelle entreprise. Elle contient un formulaire pour ajouter les informations de l'entreprise.

`EditCompanyPage.jsx` : Cette page permet de modifier les informations d'une entreprise existante. Elle contient un formulaire pré-rempli avec les informations actuelles de l'entreprise.

`EditProfilePage.jsx`: Cette page permet de modifier le profil de l'utilisateur. Elle contient un formulaire pour mettre à jour les informations personnelles de l'utilisateur.

`HomePage.jsx` : Page d'accueil de l'application. Elle affiche un aperçu des offres d'emploi et des entreprises.

`JobsPage.jsx` : Cette page affiche les offres d'emploi disponibles. Elle permet aux utilisateurs de parcourir et de filtrer les offres d'emploi.

### Services 

Les services sont situés dans le dossier src/service. Ils contiennent la logique métier et les appels API nécessaires pour le fonctionnement de l'application.


### Assets 

Les assets de notre projet JOBBOARD sont situés dans le dossier assets et contiennent les ressources utilisées par l'application, telles que les fichiers CSS, les images, et d'autres fichiers multimédias:

`CSS`

Ce sous-dossier contient les fichiers CSS utilisés pour styliser le site. Voici quelques exemples de fichiers CSS que l'on pourrait trouver dans ce dossier :

- Footer.css : Le fichier CSS spécifique pour styliser le composant Footer.
- Header.css : Le fichier CSS spécifique pour styliser le composant Header.

`Ìmage`

Ce sous-dossier contient les images utilisées du site. Voici quelques exemples de types d'images que l'on pourrait trouver dans ce dossier :

- Logo du site 
- Les icons utilisées du site

exemple de notre stucture : 

```
assets/
    image/
        logo.png
        addusers.png
        epitech.jpg
        send.png
        profile.png
        ...
```

Les dossiers assets est essentiel à l'organisation du projet Jobboard, pour gerer les ressources et de les séparer.

### technologies utilisées : 
```
React : Une bibliothèque JavaScript pour construire des interfaces utilisateur.
React Router : Une bibliothèque pour gérer la navigation dans l'application.
Redux : Une bibliothèque pour la gestion de l'état global de l'application.
Redux Thunk : Un middleware pour gérer les actions asynchrones dans Redux.
CSS Modules : Une technique pour écrire des styles CSS modulaires et réutilisables.
Webpack : Un module bundler pour compiler le code JavaScript.
Node.js : Un environnement d'exécution JavaScript côté serveur.
npm : Un gestionnaire de paquets pour installer les dépendances du projet.
```

### Conclusion
Ce projet JOBBOARD est une application de gestion d'offres d'emploi, développée avec React. Elle permet aux utilisateurs de consulter et de postuler à des offres d'emploi, ainsi que de gérer leurs profils et leurs entreprises.