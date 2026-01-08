# Étape 1 : image de base officielle Playwright (avec tous les navigateurs)
FROM mcr.microsoft.com/playwright:v1.56.0-jammy

# Installer Java (pour Allure)
RUN apt-get update && apt-get install -y default-jre && apt-get clean


# Dossier de travail
WORKDIR /app

# Copie uniquement les fichiers de dépendances pour optimiser le cache Docker
COPY package*.json ./

# Installation des dépendances du projet (Playwright, Allure, etc.)
RUN npm ci --quiet

# Copie du reste du projet
COPY . .

# Installe Allure globalement (pour génération de rapports)
RUN npx playwright install --with-deps
RUN npm install -g allure-commandline --save-dev

# Définit l’environnement d’exécution
ENV NODE_ENV=recette

# Commande par défaut : exécute les tests Playwright avec Allure
CMD ["npx", "playwright", "test", "--reporter=line,allure-playwright"]
