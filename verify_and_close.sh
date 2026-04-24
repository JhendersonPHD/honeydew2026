#!/usr/bin/env bash
curl -s http://localhost:8018/api/health
curl -s http://localhost:8018/api/products | jq '. | length'
curl -s http://localhost:8018/api/categories | jq '. | length'
curl -s http://localhost:3016/ | head -n 1
