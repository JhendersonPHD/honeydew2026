"""
CFO Financial Dashboard — HoneyDew2026
FastAPI router providing CFO-level financial KPIs and reporting endpoints.
"""

from fastapi import APIRouter, Query
from datetime import datetime, timedelta
from typing import Optional
import json

from app.services.financial_report_service import (
    calculate_financial_metrics,
    generate_pnl_report,
    FinancialSummary,
)

router = APIRouter(prefix="/api/cfo", tags=["cfo", "financial"])

# In-memory cache for demo (replace with DB queries in production)
MOCK_ORDERS = []
MOCK_PRODUCTS = []

@router.get("/dashboard", response_model=FinancialSummary)
async def get_financial_dashboard(
    start_date: Optional[str] = Query(None, description="YYYY-MM-DD start of period"),
    end_date: Optional[str] = Query(None, description="YYYY-MM-DD end of period"),
):
    """
    CFO Dashboard — returns revenue metrics, top/low products, category breakdown, and inventory value.
    """
    if end_date is None:
        end_date = datetime.now().strftime("%Y-%m-%d")
    if start_date is None:
        start_date = (datetime.now() - timedelta(days=30)).strftime("%Y-%m-%d")

    # In production: query from Shopify API or local DB
    return calculate_financial_metrics(MOCK_ORDERS, MOCK_PRODUCTS, start_date, end_date)

@router.get("/pnl")
async def get_pnl_statement(
    period: str = Query("monthly", description="Period label for the P&L statement"),
    cost_of_goods_sold: float = Query(0, description="COGS for the period"),
    operating_expenses: float = Query(0, description="Total operating expenses"),
    marketing: float = Query(0, description="Marketing spend"),
    other: float = Query(0, description="Other expenses"),
):
    """
    Profit & Loss Statement — CFO View.
    Provide cost figures as query params (in production, pull from accounting system).
    """
    return generate_pnl_report(
        MOCK_ORDERS,
        {"cost_of_goods_sold": cost_of_goods_sold, "operating_expenses": operating_expenses, "marketing": marketing, "other": other},
        period=period,
    )

@router.get("/health")
async def cfo_health():
    return {"status": "ok", "service": "CFO-Dashboard", "timestamp": datetime.now().isoformat()}
