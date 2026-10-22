#!/usr/bin/env bash
# Script para iniciar el servidor de desarrollo de Next.js
set -e

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR/frontend"

echo "Iniciando Agente PIMS (Next.js)..."
pnpm dev
