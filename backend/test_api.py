"""
HoneyDew2026 API Tests
Run: pytest backend/test_api.py -v
"""

import pytest
from fastapi.testclient import TestClient
import sys
import os

sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from backend.app.main import app

client = TestClient(app)


class TestHealthEndpoints:
    """Health check endpoints"""

    def test_root(self):
        """Test root endpoint returns 200"""
        response = client.get("/")
        assert response.status_code == 200

    def test_api_health(self):
        """Test /api/health endpoint"""
        response = client.get("/api/health")
        assert response.status_code == 200
        data = response.json()
        assert "status" in data


class TestProductsAPI:
    """Products API endpoints"""

    def test_get_products(self):
        """Test GET /api/products returns list"""
        response = client.get("/api/products/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_products_with_limit(self):
        """Test products with limit parameter"""
        response = client.get("/api/products/?limit=5")
        assert response.status_code == 200
        data = response.json()
        assert len(data) <= 5

    def test_get_product_by_id(self):
        """Test get single product by ID"""
        # First get all products
        response = client.get("/api/products/")
        products = response.json()
        
        if len(products) > 0:
            product_id = products[0]["id"]
            response = client.get(f"/api/products/{product_id}")
            assert response.status_code == 200
            data = response.json()
            assert data["id"] == product_id


class TestFarmsAPI:
    """Farms API endpoints"""

    def test_get_farms(self):
        """Test GET /api/farms returns list"""
        response = client.get("/api/farms/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)

    def test_get_farm_by_id(self):
        """Test get single farm by ID"""
        response = client.get("/api/farms/")
        farms = response.json()
        
        if len(farms) > 0:
            farm_id = farms[0]["id"]
            response = client.get(f"/api/farms/{farm_id}")
            assert response.status_code == 200
            data = response.json()
            assert data["id"] == farm_id


class TestCategoriesAPI:
    """Categories API endpoints"""

    def test_get_categories(self):
        """Test GET /api/categories returns list"""
        response = client.get("/api/categories/")
        assert response.status_code == 200
        data = response.json()
        assert isinstance(data, list)


class TestErrorHandling:
    """Error handling tests"""

    def test_nonexistent_product(self):
        """Test 404 for nonexistent product"""
        response = client.get("/api/products/999999")
        assert response.status_code == 404

    def test_nonexistent_farm(self):
        """Test 404 for nonexistent farm"""
        response = client.get("/api/farms/999999")
        assert response.status_code == 404

    def test_invalid_query_param(self):
        """Test handling of invalid query params"""
        response = client.get("/api/products/?limit=invalid")
        # Should either return 422 or handle gracefully
        assert response.status_code in [200, 422]


if __name__ == "__main__":
    pytest.main([__file__, "-v"])
