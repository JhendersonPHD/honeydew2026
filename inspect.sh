#!/bin/bash
# HoneyDew2026 Inspect Script
# Usage: ./inspect.sh [product|farm|category|order|review]

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
API_BASE="http://localhost:8017/api"

if [ -z "$1" ]; then
    echo "Usage: ./inspect.sh [product|farm|category|order|review|all]"
    echo ""
    echo "Examples:"
    echo "  ./inspect.sh product          # List all products"
    echo "  ./inspect.sh farm            # List all farms"
    echo "  ./inspect.sh product 3       # Get product ID 3"
    echo "  ./inspect.sh all             # Full system dump"
    exit 1
fi

ENTITY="$1"
ID="${2:-}"

case "$ENTITY" in
    product)
        if [ -n "$ID" ]; then
            echo "=== Product #$ID ==="
            python3 -c "import urllib.request, json; print(json.dumps(json.loads(urllib.request.urlopen('$API_BASE/products/$ID').read()), indent=2))"
        else
            echo "=== All Products ==="
            python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/products/').read()); [print(f\"{p['id']:>3} | {p['name']:<30} | \${p['price']:.2f} | farm={p.get('farm_id','')}\") for p in data]"
        fi
        ;;
    farm)
        if [ -n "$ID" ]; then
            echo "=== Farm #$ID ==="
            python3 -c "import urllib.request, json; print(json.dumps(json.loads(urllib.request.urlopen('$API_BASE/farms/$ID').read()), indent=2))"
        else
            echo "=== All Farms ==="
            python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/farms/').read()); [print(f\"{f['id']:>3} | {f['name']:<30} | {f.get('location','')}\") for f in data]"
        fi
        ;;
    category)
        if [ -n "$ID" ]; then
            echo "=== Category #$ID ==="
            python3 -c "import urllib.request, json; print(json.dumps(json.loads(urllib.request.urlopen('$API_BASE/categories/$ID').read()), indent=2))"
        else
            echo "=== All Categories ==="
            python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/categories/').read()); [print(f\"{c['id']:>3} | {c['name']:<20} | icon={c.get('icon','')}\") for c in data]"
        fi
        ;;
    all)
        echo "========================================="
        echo "   HoneyDew2026 Full System Inspection"
        echo "========================================="
        echo ""
        echo "--- Products ---"
        python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/products/').read()); print(f'Total: {len(data)} products'); [print(f\"  {p['id']:>3} | {p['name']:<30} | \${p['price']:.2f}\") for p in data[:10]]"
        echo ""
        echo "--- Farms ---"
        python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/farms/').read()); print(f'Total: {len(data)} farms'); [print(f\"  {f['id']:>3} | {f['name']:<30}\") for f in data]"
        echo ""
        echo "--- Categories ---"
        python3 -c "import urllib.request, json; data=json.loads(urllib.request.urlopen('$API_BASE/categories/').read()); print(f'Total: {len(data)} categories'); [print(f\"  {c['id']:>3} | {c['name']:<20}\") for c in data]"
        ;;
    *)
        echo "Unknown entity: $ENTITY"
        echo "Valid: product, farm, category, order, review, all"
        exit 1
        ;;
esac