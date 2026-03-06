#!/bin/bash
set -euo pipefail

INSTALL_DIR="${HOME}/.local/bin"
BINARY_NAME="cli-lsp-client"
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Detect OS
OS="$(uname -s | tr '[:upper:]' '[:lower:]')"
case "$OS" in
  darwin) OS="darwin" ;;
  linux) OS="linux" ;;
  *)
    echo "Unsupported OS: $OS"
    exit 1
    ;;
esac

# Detect architecture
ARCH="$(uname -m)"
case "$ARCH" in
  x86_64) ARCH="x64" ;;
  aarch64|arm64) ARCH="arm64" ;;
  *)
    echo "Unsupported architecture: $ARCH"
    exit 1
    ;;
esac

echo "Detected: ${OS}-${ARCH}"
echo "Installing to: ${INSTALL_DIR}/${BINARY_NAME}"

# Change to project directory
cd "$SCRIPT_DIR"

# Install dependencies
echo "Installing dependencies..."
bun install

# Build the project
echo "Building project..."
bun run build

# Create install directory
mkdir -p "$INSTALL_DIR"

# Copy the appropriate binary
BINARY_PATH="dist/${BINARY_NAME}-${OS}-${ARCH}/bin/${BINARY_NAME}"
if [[ ! -f "$BINARY_PATH" ]]; then
  echo "Error: Binary not found at ${BINARY_PATH}"
  exit 1
fi

cp "$BINARY_PATH" "${INSTALL_DIR}/${BINARY_NAME}"
chmod +x "${INSTALL_DIR}/${BINARY_NAME}"

echo "Installed ${BINARY_NAME} to ${INSTALL_DIR}/${BINARY_NAME}"

# Check if install dir is in PATH
if [[ ":$PATH:" != *":${INSTALL_DIR}:"* ]]; then
  echo ""
  echo "Add this to your shell profile to use ${BINARY_NAME}:"
  echo "  export PATH=\"\$HOME/.local/bin:\$PATH\""
fi
