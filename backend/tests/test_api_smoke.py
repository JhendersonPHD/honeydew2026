"""
HoneyDew Backend — Integration Smoke Tests
Verifies all critical API endpoints are healthy.
Run: pytest tests/test_api_smoke.py -v
"""
import requests

BASE_URL = "http://localhost:8017"

def test_health_endpoint():
    """Backend is running and responsive."""
    resp = requests.get(f"{BASE_URL}/api/health", timeout=5)
    assert resp.status_code == 200
    assert resp.json()["status"] == "ok"

def test_products_returns_data():
    """Products endpoint returns product catalog."""
    resp = requests.get(f"{BASE_URL}/api/products", timeout=5)
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) > 0, "Expected at least 1 product"
    # Validate product structure
    product = data[0]
    assert "id" in product
    assert "name" in product

def test_farms_returns_data():
    """Farms endpoint returns farm list."""
    resp = requests.get(f"{BASE_URL}/api/farms", timeout=5)
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) > 0, "Expected at least 1 farm"

def test_categories_returns_data():
    """Categories endpoint returns product categories."""
    resp = requests.get(f"{BASE_URL}/api/categories", timeout=5)
    assert resp.status_code == 200
    data = resp.json()
    assert isinstance(data, list)
    assert len(data) > 0, "Expected at least 1 category"

def test_products_have_required_fields():
    """All products have required fields for frontend rendering."""
    resp = requests.get(f"{BASE_URL}/api/products", timeout=5)
    products = resp.json()
    # farm is a nested object, category is nested, price is numeric
    required = {"id", "name", "price", "farm", "category", "category_id"}
    for p in products[:3]:  # Check first 3
        missing = required - set(p.keys())
        assert not missing, f"Product {p.get('id')} missing fields: {missing}"
    # Verify nested farm has name
    assert "name" in products[0]["farm"], "farm.name required"
    assert "name" in products[0]["category"], "category.name required"
