# PERN Template

Template for ProgreSQL-Express-React-Node CRUD application. Created for reference for folks who are new to `nodejs`. Hence, some of the steps in this README are verbose. The documentation is written for debian based distributions.

## Pre-requisites

- nodejs
- npm | yarn
- docker
- docker-compose

## Usage

1. Run `npm install` in the root of the repository.
2. Update the `.env` and update preferences as per requirement.

## Creation

1. Install and setup latest version of node & npm using [nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
2. Install backend dependencies: `npm install --save express sequelize pg pg-hstore`
3. Install react dependencies:

```bash
npm install --save react react-dom
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react
npm install --save-dev css-loader style-loader scss-loader scss file-loader mini-css-extract-plugin
```

4. Initialize and configure database using `npx sequelize-cli init`.
5. Migrate after creating initial migration file `npx sequelize-cli db:migrate`.
