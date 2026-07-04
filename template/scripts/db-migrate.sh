#!/usr/bin/env bash
set -euo pipefail

REMOTE=false
ENV=""

while [[ $# -gt 0 ]]; do
  case "$1" in
    --remote) REMOTE=true; shift ;;
    --env) ENV="$2"; shift 2 ;;
    *) echo "Unknown option: $1"; exit 1 ;;
  esac
done

if [ "$REMOTE" = true ]; then
  CMD="wrangler d1 migrations apply DB"
  if [ -n "$ENV" ]; then
    CMD="$CMD --env $ENV"
  fi
else
  CMD="drizzle-kit push"
fi

echo "Running: $CMD"
eval "$CMD"
