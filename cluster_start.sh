#!/bin/bash

sudo docker compose up -d

echo "$(tput setaf 6)"
echo "Creating atl topic...$(tput setaf 2)"

../kafka/./bin/kafka-topics.sh --bootstrap-server=localhost:19092 --create --topic atl --partitions 47 --replication-factor 2

echo "$(tput setaf 6)Creating agtp topic...$(tput setaf 2)"

../kafka/./bin/kafka-topics.sh --bootstrap-server=localhost:19092 --create --topic agpt --partitions 47 --replication-factor 2
