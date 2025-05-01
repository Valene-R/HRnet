# HRnet

[English version](#english-version)

## French version

HRnet est une application web interne permettant la gestion des employés d’une grande société financière, WealthHealth.
Ce projet consiste à **convertir une application existante en jQuery vers React**, avec pour objectif :

- de supprimer les anciens plugins jQuery problématiques (datepicker, modal, dropdown, datatable),
- d’améliorer les performances (audits Lighthouse),
- de publier certains composants sous forme de bibliothèques réutilisables.

## Stack technique

- **React** avec **Vite** pour un développement rapide et moderne
- **Tailwind CSS v4** pour le design responsive basé sur les utilitaires
- **React Hook Form** pour une gestion optimisée des formulaires
- **Zustand** pour la gestion d'état, simple et performant
- **React Datepicker** personnalisé pour imiter le comportement du datepicker jQuery
- **`react-custom-modal-tailwindv4`** : composant de modale personnalisée créé et publié sur npm, stylisé avec Tailwind CSS v4
- **PropTypes** pour la validation des props
- **ESLint** et **Prettier** pour garantir la qualité et la cohérence du code
- **Composants réutilisables** : formulaire, champs, modale, table de données, dropdown, etc.

## Fonctionnalités

- Création d’un nouvel employé avec validation des champs
- Ajout automatique dans une table de données dynamique
- Recherche et tri des employés par colonne (nom, département, etc.)
- Affichage de messages de confirmation avec une modale personnalisée
- Sélecteur de date personnalisable (respectant une tranche d’âge)
- Système de pagination intégré
- Modification / mise à jour et suppression d’un employé existant
- Architecture modulaire basée sur des composants React réutilisables

## Composant publié

- [`react-custom-modal-tailwindv4`](https://www.npmjs.com/package/react-custom-modal-tailwindv4) : modale stylisée et entièrement personnalisable publiée sur npm.

## Performances

Des audits Lighthouse ont été réalisés avant/après refonte pour mesurer les gains de performance suite à la suppression des plugins jQuery.

## Installation

```sh
git clone https://github.com/Valene-R/HRnet.git
cd HRnet
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Référence

Projet initial en jQuery : [Repo original HRnet jQuery](https://github.com/OpenClassrooms-Student-Center/P12_Front-end)

---

# HRnet

## English version

[Version française](#french-version)

HRnet is an internal web application used by a large financial company, WealthHealth, to manage employee records.  
This project involves **migrating an existing jQuery application to React**, with the goal of:

- removing outdated jQuery plugins (datepicker, modal, dropdown, datatable),
- improving performance (via Lighthouse audits),
- publishing some components as reusable libraries.

## Tech Stack

- **React** with **Vite** for fast and modern development
- **Tailwind CSS v4** for utility-first responsive styling
- **React Hook Form** for smooth form handling
- **Zustand** for lightweight state management
- **Custom React Datepicker** to replicate jQuery behavior
- **`react-custom-modal-tailwindv4`**: custom modal component published to npm
- **PropTypes** for prop validation
- **ESLint** and **Prettier** for code quality
- **Reusable components**: form, inputs, modal, data table, dropdown, etc.

## Features

- Create new employee with form validation
- Automatically add entries to dynamic data table
- Search and sort employees by column (name, department…)
- Show confirmation messages using a custom modal
- Custom datepicker with age range restriction
- Integrated pagination system
- Edit or delete existing employee
- Modular architecture based on reusable React components

## Published Component

- [`react-custom-modal-tailwindv4`](https://www.npmjs.com/package/react-custom-modal-tailwindv4) : stylish and fully customizable modal published on npm.

## Performance

Lighthouse audits were conducted before and after the redesign to measure performance gains following the removal of jQuery plugins.

## Installation

```sh
git clone https://github.com/Valene-R/HRnet.git
cd HRnet
npm install
npm run dev
```

## Build

```sh
npm run build
npm run preview
```

## Reference

Original jQuery project : [Original repo HRnet jQuery](https://github.com/OpenClassrooms-Student-Center/P12_Front-end)
