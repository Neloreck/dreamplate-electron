# Dreamplate electron client application starter

### Install:
- `npm install`
- `./run setup`
####  or
- `npm install -g pnpm typescript`
- `./run setup`

### Start working:
- `./run watch-assets:dev --server` - to start serving renderer, process and preload scripts with dev server 
- `./run electon` - to start electron application
### or
- `./run watch-assets:dev` - to start watching renderer, process and preload scripts
- `./run electon` - to start electron application

### Build assets:
- `./run build-assets`
- `Open target/dist folder and check output`

### Package app
- todo

### CLI Scripts
- `./run help` [print avaliable commands with description]
- `./run verify` [run unit tests, linter and type checker]
- `./run COMMAND_NAME` [run specific cli script]

### What is used:
- Custom CLI
- Webpack (babel loader)
- React
- Dreamstate (store manager)
- JSS, theming with basic functionality
- Typescript
- Jest for unit testing
- React fast refresh for HMR
- HBS (template, global styles)

### Architecture and general approach:

Current architecture is intended to separate logical modules/scopes with reducing of memory/cpu/network usage.

File 'src/application/modules/modules.json' is used for separating modules and declaration of application routes.

Such approach allows to:
- Reduce initial load without importing lazy components right after first JS evaluation
- Reduce bundle size with improved npm modules caching related to specific routes
- Reduce general codebase complexity with better modular system
- Clean up used memory amount since every module will trigger soft page reload

* Shared reusable logic takes place: src/lib
* Shared reusable api logic: src/api
* Shared application level code: src/application/main
* Specific module code: src/application/modules/{MODULE_NAME}

### General project tree

- **cli** [project commands and everything runnable]

- _build_ [webpack build configuration and scripts]
  - config [configuration]
  - loaders [webpack loaders for files processing]
  - public [public files that will be copied to target dist]
  - template [project template specific scripts and configs]

- _test_ [jest testing configuration and runner]
  - config [configuration]
<br/>
<br/>
- **src** [project source code]

- _renderer_[application specific code]
  - initialization [inline pre-executed code with first priority]
  - main [application specific code shared between all modules]
  - modules [folder with application modules]
    - GENERIC MODULE (*)

- _process_[electron process specific code]

- _bridge_[preload script specific code]

- _lib_ - [shared utils and code samples that can be reused later]
  - GENERIC_LIB (*)

- _api_ [project client api mule, everything related to data exchange]
  - GENERIC_DESTINATION (*)

---

+ **GENERIC_DESTINATION** [specific api destination or route that includes api exchange and models declaration]
+ **GENERIC_MODULE** [specific application module that implements application route -> feature]
+ **GENERIC_LIB** [specific library module that includes sharable code between applications]
