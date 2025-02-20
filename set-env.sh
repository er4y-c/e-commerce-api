#!/bin/bash
# Usage: ./set-env.sh development | production
ENV=${1:-development}

if [ "$ENV" == "development" ]; then
    TARGET=".env.development"
elif [ "$ENV" == "production" ]; then
    TARGET=".env.production"
else
    echo "Usage: $0 development | production"
    exit 1
fi

ln -sf $TARGET .env
echo "Linked $TARGET to .env"
