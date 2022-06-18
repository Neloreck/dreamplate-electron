#!/bin/bash

COMMAND=$1
COMMAND_ARGS=${@:2}

# Electron

start_electron() {
  pnpm electron ./target/dist/main.js
}

# Build app in docker [windows, linux]
# Setups container with wine/linux environment to build deb/exe assets
spin_build_docker() {
  docker run --rm -ti \
   --env-file <(env | grep -iE 'DEBUG|NODE_|BUILD_') \
   --env ELECTRON_CACHE="/root/.cache/electron" \
   --env ELECTRON_BUILDER_CACHE="/root/.cache/electron-builder" \
   -v ${PWD}:/project \
   -v ~/.local/share/pnpm:/root/.local/share/pnpm \
   -v ~/.cache/electron:/root/.cache/electron \
   -v ~/.cache/electron-builder:/root/.cache/electron-builder \
   electronuserland/builder:wine
}

# Build windows release
build_windows() {
  pnpm electron-builder -w
}

# Build linux release
build_linux() {
   pnpm electron-builder -l
}

# Execution switch

execute() {
  case "${COMMAND}" in
    "start") start_electron ;;
    "spin-build-docker") spin_build_docker ;;
    "build-windows") build_windows ;;
    "build-linux") build_linux ;;
    *)
      echo 'Command argument is required.'
      exit 1
    ;;
  esac
}

execute
