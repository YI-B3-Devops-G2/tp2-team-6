# tp2-team-6
# B3 Devops - Projet 1
## Info
Team 6
---
mail: maxime.matheron@ynov.com
github_username: bambin401
---
mail: lucas.herve@ynov.com
github_username: lucas2101-pixel
---
# Pré-requis:
-Node.js
-Docker
-Docker compose

# Installation:
Pour installer le TP, j'ai besoin de rentrer la commande suivante dans un terminal de commande(powershell)
``docker pull bambin401/tp2-team-6_nodejs``

Si on souhaite maintenant utiliser que l'API, il suffit de faire(toujour dans le terminal de commande):
``docker run -p 8080:8080 bambin401/tp2-team-6_nodejs``

# Utilisation

Accès page d'accueil de l'API:
``localhost:8080/``

Accès page de status de l'API:
``localhost:8080/status``

# CircleCi
## Build
 ``docker-compose -f ./docker-compose.dev.yaml build --compress --force-rm --no-cache --pull --parallel``
 Cette commande permet de build l'image.
 
 Si l'on souhaite sauvegarder son image on peut utiliser la commande : 
 ``docker save -o ./${PROJECT_NAME}_nodejs.tar project_nodejs``
## upload
Pour charger une image :
``docker load -i /tmp/workspace/${PROJECT_NAME}_nodejs.tar``
Pour renommer une image : 
``docker tag project_nodejs bambin401/${PROJECT_NAME}_nodejs:latest``
Mettre en l'image sur dockerhub:
``docker login -u $USER --password $PASS 
docker push bambin401/${PROJECT_NAME}_nodejs:latest``

## Problème rencontrés:
Dans ce TP, les problèmes que l'on a rencontré pour ce TP sont au niveau de la comprehension de docker et de son utilisation avec CircleCI, nous n'avons malheuresement pas la logique du code car nous sommes spécialisé dans le réseaux, ce fut donc compliquer et long de comprendre la logique de docker.
