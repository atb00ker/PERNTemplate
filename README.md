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
2. Install backend dependencies:

```bash
npm install --save express sequelize pg pg-hstore cors ws
```

3. Install react dependencies:

```bash
npm install --save react react-dom react-router-dom react-use-websocket
npm install --save typescript @types/node @types/react @types/react-dom @types/jest
npm install --save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin
npm install --save-dev @babel/core babel-loader @babel/preset-env @babel/preset-react @babel/preset-typescript
npm install --save-dev css-loader style-loader scss-loader file-loader mini-css-extract-plugin
npm install --save axios scss
```

4. Initialize and configure database using `npx sequelize-cli init`.
5. Migrate after creating initial migration file `npx sequelize-cli db:migrate`.

## PERN Notes

1. `process.exit()` can be used to exit `repl`.
2. `node-inspector` might be a good resource for the future!
3. Look into: [passportJs](http://www.passportjs.org/) for authentication.
4. Tutorial followed [Youtube @ freeCodeCamp video](https://www.youtube.com/watch?v=G8uL0lFFoN0)
