# Centiva – Frontend Nuxt 3 (SSR)

Ce dépôt contient **le frontend du test technique Centiva**, développé en **Nuxt 3 avec rendu serveur (SSR)**, conformément aux exigences du document fourni.

> ⚠️ Ce README ne concerne **que le frontend**.
> Le backend Laravel possède son propre fichier `README.md` dans son dépôt dédié : **https://github.com/ibanson/centiva-laravel-api**

---

## Objectifs du frontend

- Consommer les endpoints exposés par l’API Laravel.
- Afficher les équipes, les courtiers, et leurs relations.
- Utiliser **Nuxt 3 en mode SSR** pour charger les données côté serveur.
- Fournir une interface sobre, propre et agréable, sans passer un temps excessif sur le CSS.

---

## Choix techniques

### Nuxt 3 — un choix naturel pour le SSR

Le document du test demande explicitement un **rendu serveur (SSR)**.
Nuxt 3 s’est donc imposé comme choix naturel, car il offre :

- un SSR complet prêt à l’emploi ;
- la possibilité d’utiliser `useFetch()` exécuté côté serveur ;
- une structure claire pour les pages, composants et composables.

---

## Tailwind CSS — rapidité et propreté

Le test précise qu’il ne faut pas « sur‑investir » le CSS, tout en gardant une interface agréable visuellement.

Pour cela, **Tailwind CSS** a été utilisé, car il permet :

- de styliser rapidement sans multiplier les fichiers CSS ;
- de garder le markup lisible ;
- d’obtenir une UI cohérente avec peu d’efforts.

### Organisation Tailwind

La configuration principale se trouve dans :

```txt
assets/css/themes/tailwind.css
```

On y retrouve la structure standard Tailwind :

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Puis des **layers personnalisés** dans `@layer components` pour définir des styles récurrents (par exemple des variantes de boutons et d’éléments typographiques).
L’objectif est d’éviter la répétition de classes et de garder une mini « charte graphique » cohérente.

---

## 🗂️ Architecture Nuxt 3

### Pages

Les principales pages implémentées sont :

| Route           | Description                                    |
|-----------------|------------------------------------------------|
| `/teams`        | Liste toutes les équipes                      |
| `/teams/[id]`   | Affiche une équipe et la liste de ses courtiers |
| `/brokers`      | Liste tous les courtiers                      |
| `/brokers/[id]` | Affiche un courtier et l’équipe à laquelle il appartient |

Toutes ces pages utilisent `useFetch()` en mode SSR pour récupérer les données avant rendu.

---

## Réutilisation avec `TeamList.vue`

Pour éviter la duplication de logique entre plusieurs vues affichant les équipes, un composant réutilisable a été créé :

```txt
components/TeamList.vue
```

Ce composant permet de :

- centraliser l’affichage de la liste des équipes ;
- garantir une présentation homogène ;
- faciliter la réutilisation (ex. sur la page `/teams` et d’autres vues si nécessaire).

---

## Alias de chemins

Pour améliorer la lisibilité et éviter les imports relatifs du type `../../../components/...`, plusieurs alias ont été configurés (dans `nuxt.config`), par exemple :

```txt
~components   →  /components
~composables  →  /composables
~utils        →  /utils (si utilisé)
```

Ces alias simplifient les imports et rendent le code plus clair.

---

## Composables

Deux composables principaux structurent la logique partagée :

### 1️⃣ `useApiFetch.ts`

- Encapsule `useFetch()`.
- Centralise la configuration des appels à l’API Laravel.
- Permet d’unifier la gestion des options et des erreurs.
- Compatible avec une exécution côté serveur (SSR).

### 2️⃣ `useSnackbar.ts`

- Gère un petit **snackbar** (message de confirmation / erreur).
- Fournit un feedback visuel après certaines actions (ex. succès d’un appel API).
- Peut être utilisé depuis n’importe quelle page ou composant.

---

## ⚠️ Dépendance au backend Laravel

Ce frontend dépend de l’API Laravel, disponible ici :
**https://github.com/ibanson/centiva-laravel-api**

Avant de lancer Nuxt, assurez-vous que le serveur Laravel est démarré :

```bash
php artisan serve
# ou l’équivalent selon votre environnement
```

Sans l’API active, les pages `/teams` et `/brokers` ne pourront pas charger les données.

---

## Démarrage (frontend uniquement)

```bash
# Installation des dépendances
npm install   # ou pnpm install / yarn install

# Lancement du serveur de dev
npm dev       # ou pnpm run dev / yarn dev
```

L’application sera accessible à l’URL affichée par Nuxt (par défaut http://localhost:3000).

---

## Résumé

Ce frontend met en œuvre :

- un **rendu serveur réel** avec Nuxt 3 ;
- une UI propre grâce à Tailwind, sans surinvestir le CSS ;
- une structure claire : pages, composants réutilisables, composables dédiés ;
- des alias pour rendre les imports plus lisibles.

Il constitue une base simple, maintenable et conforme aux attentes du test technique Centiva pour la partie frontend.
