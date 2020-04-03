#!/usr/bin/env bash
echo "building container"
echo "docker-compose build"
docker-compose build

echo "running server"
echo "docker-compose up --detach"
docker-compose up --detach
