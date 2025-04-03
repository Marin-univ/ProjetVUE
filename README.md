# ProjetVUE

Projet développé par **Noa Fonteny** et **Marin Chesneau**.

Ce projet est une application développée en **Vue.js** pour la partie client et en **Node.js avec Express** pour la partie serveur. Une base de données SQLite est utilisée pour stocker les informations.

---

## 💁‍♂️ Structure du projet

Le projet est organisé comme suit :

```
Projet/
│—— Client/        # Code source du client Vue.js
│—— Serveur/       # Code source du serveur Node.js
│—— questionnaire.db  # Base de données SQLite
│—— README.md      # Documentation du projet
```

### 🖥️ Client (Vue.js)

Le dossier **Client/** contient l'application front-end développée avec **Vue.js**.  
Elle est utilisée pour afficher l'interface utilisateur et interagir avec le serveur via des requêtes API.

#### 📌 Installation et Lancement du Client

1. Accédez au dossier `Client` :
   ```sh
   cd Client
   ```
2. Installez les dépendances :
   ```sh
   npm install
   ```
3. Démarrez le serveur de développement :
   ```sh
   npm run dev --host
   ```

---

### 🌐 Serveur (Node.js + Express)

Le dossier **Serveur/** contient le back-end du projet, qui est un serveur API développé avec **Node.js** et **Express**.

#### 📌 Installation et Lancement du Serveur

1. Accédez au dossier `Serveur` :
   ```sh
   cd Serveur
   ```
2. Installez les dépendances :
   ```sh
   pip install Flask
   ```
3. Démarrez le serveur :
   ```sh
   flask run
   ```

---


## 🛠️ Technologies utilisées

### Front-end :
- Vue.js
- Vite
- Axios (pour les requêtes HTTP)
- Tailwind CSS (pour le style)

### Back-end :
- Node.js
- Express.js
- SQLite3

---


## 📢 Auteurs

Projet réalisé par :
- **Noa Fonteny**
- **Marin Chesneau**

