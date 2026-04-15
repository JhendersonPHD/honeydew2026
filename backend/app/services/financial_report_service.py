"""
Financial Report Service — CFO Module for HoneyDew2026
Generates P&L, revenue breakdown, and KPI dashboards from order/product data.
"""

import json
from datetime import datetime, timedelta
from typing import Optional
from dataclasses import dataclass, asdict

@dataclass
class RevenueMetrics:
    total_revenue: float
    total_orders: int
    average_order_value: float
    revenue_growth_pct: float
    refund_rate_pct: float
    net_revenue: float

@dataclass
class ProductMetrics:
    top_products: list[dict]
    low_performers: list[dict]
    category_revenue: dict[str, float]
    inventory_value: float

@dataclass
class FinancialSummary:
    period_start: str
    period_end: str
    revenue: RevenueMetrics
    products: ProductMetrics
    generated_at: str

def calculate_financial_metrics(
    orders: list[dict],
    products: list[dict],
    start_date: Optional[str] = None,
    end_date: Optional[str] = None
) -> FinancialSummary:
    """Calculate comprehensive financial metrics from orders and products."""
    
    # Default to last 30 days if no dates provided
    if end_date is None:
        end_date = datetime.now().strftime("%Y-%m-%d")
    if start_date is None:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")

    # Filter orders by date range
    filtered_orders = [
        o for o in orders
        if start_date <= o.get("created_at", "")[:10] <= end_date
    ]

    total_revenue = sum(float(o.get("total_price", 0)) for o in filtered_orders)
    total_orders = len(filtered_orders)
    average_order_value = total_revenue / total_orders if total_orders > 0 else 0.0

    # Refunds
    refunded = sum(
        float(o.get("total_price", 0)) 
        for o in filtered_orders 
        if o.get("financial_status") == "refunded"
    )
    refund_rate_pct = (refunded / total_revenue * 100) if total_revenue > 0 else 0.0
    net_revenue = total_revenue - refunded

    # Revenue growth (compare to previous period)
    prev_start = (datetime.strptime(start_date, "%Y-%m-%d") - timedelta(days=30)).strftime("%Y-%m-%d")
    prev_end = (datetime.strptime(start_date, "%Y-%m-%d") - timedelta(days=1)).strftime("%Y-%m-%d")
    prev_orders = [
        o for o in orders
        if prev_start <= o.get("created_at", "")[:10] <= prev_end
    ]
    prev_revenue = sum(float(o.get("total_price", 0)) for o in prev_orders)
    revenue_growth_pct = (
        ((total_revenue - prev_revenue) / prev_revenue * 100)
        if prev_revenue > 0 else 0.0
    )

    # Product metrics
    product_sales: dict[str, float] = {}
    for order in filtered_orders:
        for item in order.get("line_items", []):
            pid = str(item.get("product_id", ""))
            product_sales[pid] = product_sales.get(pid, 0) + float(item.get("price", 0)) * int(item.get("quantity", 0))

    # Map product IDs to names
    product_map = {str(p["id"]): p.get("title", "Unknown") for p in products}
    product_revenue = [(pid, product_map.get(pid, "Unknown"), revenue) for pid, revenue in product_sales.items()]
    product_revenue.sort(key=lambda x: x[2], reverse=True)

    top_products = [
        {"product_id": pid, "name": name, "revenue": round(rev, 2)}
        for pid, name, rev in product_revenue[:10]
    ]
    low_performers = [
        {"product_id": pid, "name": name, "revenue": round(rev, 2)}
        for pid, name, rev in product_revenue[-5:] if rev > 0
    ]

    # Category revenue (from product type/vendor tags if available)
    category_revenue: dict[str, float] = {}
    for p in products:
        cid = str(p.get("id", ""))
        if cid in product_sales:
            cat = p.get("product_type", "Uncategorized") or "Uncategorized"
            category_revenue[cat] = category_revenue.get(cat, 0) + product_sales[cid]

    # Inventory value estimate
    inventory_value = sum(
        float(p.get("variants", [{}])[0].get("price", 0)) * int(p.get("variants", [{}])[0].get("inventory_quantity", 0))
        if p.get("variants") else 0
        for p in products
    )

    return FinancialSummary(
        period_start=start_date,
        period_end=end_date,
        revenue=RevenueMetrics(
            total_revenue=round(total_revenue, 2),
            total_orders=total_orders,
            average_order_value=round(average_order_value, 2),
            revenue_growth_pct=round(revenue_growth_pct, 2),
            refund_rate_pct=round(refund_rate_pct, 2),
            net_revenue=round(net_revenue, 2),
        ),
        products=ProductMetrics(
            top_products=top_products,
            low_performers=low_performers,
            category_revenue={k: round(v, 2) for k, v in category_revenue.items()},
            inventory_value=round(inventory_value, 2),
        ),
        generated_at=datetime.now().isoformat(),
    )

def generate_pnl_report(
    orders: list[dict],
    costs: dict,
    period: str = "monthly"
) -> dict:
    """Generate Profit & Loss statement."""
    total_revenue = sum(float(o.get("total_price", 0)) for o in orders)
    cogs = costs.get("cost_of_goods_sold", 0)
    operating_expenses = costs.get("operating_expenses", 0)
    marketing_spend = costs.get("marketing", 0)
    other_expenses = costs.get("other", 0)

    gross_profit = total_revenue - cogs
    operating_income = gross_profit - operating_expenses - marketing_spend - other_expenses

    return {
        "period": period,
        "gross_revenue": round(total_revenue, 2),
        "cost_of_goods_sold": round(cogs, 2),
        "gross_profit": round(gross_profit, 2),
        "gross_margin_pct": round((gross_profit / total_revenue * 100) if total_revenue > 0 else 0, 2),
        "operating_expenses": round(operating_expenses, 2),
        "marketing_spend": round(marketing_spend, 2),
        "other_expenses": round(other_expenses, 2),
        "operating_income": round(operating_income, 2),
        "operating_margin_pct": round((operating_income / total_revenue * 100) if total_revenue > 0 else 0, 2),
    }

if __name__ == "__main__":
    # Demo with sample data
    sample_orders = [
        {"id": "o1", "total_price": "150.00", "created_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"), "financial_status": "paid", "line_items": [{"product_id": "p1", "title": "Honey Jar", "price": "25.00", "quantity": 6}]},
        {"id": "o2", "total_price": "75.00", "created_at": datetime.now().strftime("%Y-%m-%dT%H:%M:%SZ"), "financial_status": "paid", "line_items": [{"product_id": "p2", "title": "Beeswax", "price": "15.00", "quantity": 5}]},
        {"id": "o3", "total_price": "25.00", "created_at": (datetime.now() - timedelta(days=5)).strftime("%Y-%m-%dT%H:%M:%SZ"), "financial_status": "refunded", "line_items": []},
    ]
    sample_products = [
        {"id": "p1", "title": "Honey Jar", "product_type": "Honey", "variants": [{"price": "25.00", "inventory_quantity": 100}]},
        {"id": "p2", "title": "Beeswax", "product_type": "Wax", "variants": [{"price": "15.00", "inventory_quantity": 50}]},
    ]
    
    report = calculate_financial_metrics(sample_orders, sample_products)
    print(json.dumps(asdict(report), indent=2))
    
    pnl = generate_pnl_report(sample_orders, {"cost_of_goods_sold": 80, "operating_expenses": 200, "marketing": 50, "other": 20})
    print(json.dumps(pnl, indent=2))
