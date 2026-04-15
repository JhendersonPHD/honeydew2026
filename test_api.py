#!/usr/bin/env python3
"""
HoneyDew2026 API Test Suite
Tests all API endpoints for correctness
"""

import requests
import sys
from typing import Dict, List, Tuple

# Configuration
BASE_URL = "http://localhost:8017"
API_BASE = f"{BASE_URL}/api"

# Colors
GREEN = '\033[0;32m'
RED = '\033[0;31m'
YELLOW = '\033[1;33m'
NC = '\033[0m'

class APITester:
    def __init__(self):
        self.results: List[Tuple[str, bool, str]] = []
        self.session = requests.Session()
        self.session.headers.update({"Content-Type": "application/json"})
    
    def log(self, name: str, passed: bool, details: str = ""):
        status = f"{GREEN}PASS{NC}" if passed else f"{RED}FAIL{NC}"
        symbol = "✓" if passed else "✗"
        print(f"  {symbol} {name}: {status}")
        if details and not passed:
            print(f"    {YELLOW}{details}{NC}")
        self.results.append((name, passed, details))
    
    def test_health(self) -> bool:
        """Test health endpoint"""
        try:
            r = self.session.get(f"{BASE_URL}/health", timeout=5)
            self.log("Health endpoint", r.status_code == 200, f"Status: {r.status_code}")
            return r.status_code == 200
        except Exception as e:
            self.log("Health endpoint", False, str(e))
            return False
    
    def test_products_list(self) -> bool:
        """Test products list endpoint"""
        try:
            r = self.session.get(f"{API_BASE}/products/", timeout=5)
            data = r.json()
            passed = r.status_code == 200 and isinstance(data, list)
            self.log("Products list", passed, f"Status: {r.status_code}, Type: {type(data)}")
            if passed and data:
                print(f"    Found {len(data)} products")
            return passed
        except Exception as e:
            self.log("Products list", False, str(e))
            return False
    
    def test_products_detail(self) -> bool:
        """Test single product endpoint"""
        try:
            # First get a product ID
            r = self.session.get(f"{API_BASE}/products/", timeout=5)
            products = r.json()
            if not products:
                self.log("Products detail", False, "No products to test")
                return False
            
            product_id = products[0].get("id")
            if not product_id:
                self.log("Products detail", False, "Product has no ID")
                return False
            
            r = self.session.get(f"{API_BASE}/products/{product_id}", timeout=5)
            passed = r.status_code == 200
            self.log("Products detail", passed, f"Status: {r.status_code}")
            return passed
        except Exception as e:
            self.log("Products detail", False, str(e))
            return False
    
    def test_farms_list(self) -> bool:
        """Test farms list endpoint"""
        try:
            r = self.session.get(f"{API_BASE}/farms/", timeout=5)
            data = r.json()
            passed = r.status_code == 200 and isinstance(data, list)
            self.log("Farms list", passed, f"Status: {r.status_code}")
            return passed
        except Exception as e:
            self.log("Farms list", False, str(e))
            return False
    
    def test_categories_list(self) -> bool:
        """Test categories list endpoint"""
        try:
            r = self.session.get(f"{API_BASE}/categories/", timeout=5)
            data = r.json()
            passed = r.status_code == 200 and isinstance(data, list)
            self.log("Categories list", passed, f"Status: {r.status_code}")
            return passed
        except Exception as e:
            self.log("Categories list", False, str(e))
            return False
    
    def test_cors_headers(self) -> bool:
        """Test CORS headers"""
        try:
            r = self.session.get(f"{API_BASE}/products/", timeout=5)
            has_cors = "access-control-allow-origin" in r.headers or "Access-Control-Allow-Origin" in r.headers
            self.log("CORS headers", has_cors, f"Headers: {list(r.headers.keys())}")
            return has_cors
        except Exception as e:
            self.log("CORS headers", False, str(e))
            return False
    
    def run_all_tests(self) -> bool:
        """Run all API tests"""
        print("\n" + "="*50)
        print("  HoneyDew2026 API Test Suite")
        print("="*50 + "\n")
        
        print("Running tests...\n")
        
        self.test_health()
        self.test_products_list()
        self.test_products_detail()
        self.test_farms_list()
        self.test_categories_list()
        self.test_cors_headers()
        
        # Summary
        print("\n" + "="*50)
        total = len(self.results)
        passed = sum(1 for _, p, _ in self.results if p)
        failed = total - passed
        
        print(f"  Results: {passed}/{total} passed, {failed}/{total} failed")
        print("="*50 + "\n")
        
        return failed == 0


if __name__ == "__main__":
    tester = APITester()
    success = tester.run_all_tests()
    sys.exit(0 if success else 1)
