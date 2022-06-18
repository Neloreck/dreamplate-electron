#!/bin/bash

COMMAND=$1
COMMAND_ARGS=${@:2}

# Assets

build_assets() {
  pnpm rimraf ./target/dist || exit 1
  pnpm ts-node --project ./cli/tsconfig.json ./cli/build/BuildAssetsRunner.ts --analyze ${COMMAND_ARGS}
}

watch_assets() {
  pnpm ts-node --project ./cli/tsconfig.json ./cli/build/BuildAssetsRunner.ts --watch ${COMMAND_ARGS}
}

build_assets_dev() {
  export NODE_ENV=development
  build_assets
}

build_assets_prod() {
  export NODE_ENV=production
  build_assets
}

watch_assets_dev() {
  export NODE_ENV=development
  watch_assets
}

watch_assets_prod() {
  export NODE_ENV=production
  watch_assets
}

# Execution switch

execute() {
  case "${COMMAND}" in
    # Process
    "build-assets-dev") build_assets_dev ;;
    "build-assets-prod") build_assets_prod ;;
    "watch-assets-dev") watch_assets_dev ;;
    "watch-assets-prod") watch_assets_prod ;;
    *)
      echo 'Command argument is required.'
      exit 1
    ;;
  esac
}

execute
