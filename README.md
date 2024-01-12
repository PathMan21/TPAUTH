
1. D'abord installer les dépendances npm
2. Ensuite démarrer le serveur avec node app.js (le port d'écoute est 3000)
3. Installer postman
4. Une fois dans postman vous créer une nouvelle requête POST et on inscrit : http://localhost:3000/login
5. On se dirige en dessous on sélectionne Body et raw, et on y inscris par exemple
{
  "userId": "777",
  "password": "admin_password"
}

pour admin

6. On appui sur send
7. On récupère le token
8. on créer une nouvelle requête GET on va Autorisation et on prend BEARER token
9. Et la on met notre token
10. Et magie ! ça marche, on récupère notre post !
