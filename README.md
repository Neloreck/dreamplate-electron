# x-core electron desktop application boilerplate

### Install:

  - `npm install`
  
## Development (parallel):

  - `npm run watch:main`
  - `npm run watch:renderer`
  - `npm run start:dev`
  
### What is used:

  - Custom CLI
  - Electron
  - React (MaterialUI, dreamstate as contextStore)
  - Typescript (decorators, OOP style, newest features, awt loader with babel)
  - Webpack, lazy loading, tree shaking, chunks + modular architecture, aliases
  - Jest
  - SCSS (globals), JSS (components), customized theme

  
### Commands:

  - `npm run start` - start electron in prod mode
  - `npm run start:dev` - start electron in dev mode
  - `npm run build` - build renderer and main process (prod mode)
  - `npm run build:dev` - build renderer and main process (dev mode)
  - `npm run build:renderer` - build renderer (prod mode)
  - `npm run build:renderer:dev` - build renderer (dev mode)
  - `npm run build:main` - build main process code (prod mode)
  - `npm run build:main:dev` - build main process code (dev mode)
  - `npm run test` - test project, lint ts files
  - `npm run cli ${SCRIPT_NAME_THERE}` - run cli script, use cli.json for scripts adding
