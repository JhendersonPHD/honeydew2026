from sqlalchemy import create_engine, Column, Integer, String, Float, Boolean, ForeignKey, DateTime
from sqlalchemy.orm import declarative_base, sessionmaker, relationship
from datetime import datetime

SQLALCHEMY_DATABASE_URL = "sqlite:///./honeydew.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, connect_args={"check_same_thread": False}
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password_hash = Column(String)
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    is_admin = Column(Boolean, default=False)

class Address(Base):
    __tablename__ = "addresses"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    label = Column(String)
    street = Column(String)
    city = Column(String)
    state = Column(String)
    zip_code = Column(String)
    country = Column(String)
    is_default = Column(Boolean, default=False)

class Farm(Base):
    __tablename__ = "farms"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    slug = Column(String, unique=True)
    description = Column(String)
    story = Column(String)
    location = Column(String)
    lat = Column(Float)
    lng = Column(Float)
    images = Column(String)
    contact = Column(String)
    rating = Column(Float)
    is_verified = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)

class Category(Base):
    __tablename__ = "categories"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    slug = Column(String, unique=True)
    description = Column(String)
    image = Column(String)
    parent_id = Column(Integer, ForeignKey("categories.id"), nullable=True)
    sort_order = Column(Integer)

class Product(Base):
    __tablename__ = "products"
    id = Column(Integer, primary_key=True, index=True)
    shopify_product_id = Column(String)
    farm_id = Column(Integer, ForeignKey("farms.id"))
    category_id = Column(Integer, ForeignKey("categories.id"))
    name = Column(String)
    slug = Column(String, unique=True)
    description = Column(String)
    price = Column(Float)
    compare_at_price = Column(Float)
    cost_per_item = Column(Float)
    unit = Column(String)
    sku = Column(String)
    barcode = Column(String)
    inventory_quantity = Column(Integer)
    weight = Column(Float)
    images = Column(String)
    tags = Column(String)
    is_seasonal = Column(Boolean, default=False)
    is_featured = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    seo_title = Column(String)
    seo_description = Column(String)

class ProductVariant(Base):
    __tablename__ = "product_variants"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    shopify_variant_id = Column(String)
    name = Column(String)
    sku = Column(String)
    price = Column(Float)
    inventory = Column(Integer)
    options = Column(String)

class ProductReview(Base):
    __tablename__ = "product_reviews"
    id = Column(Integer, primary_key=True, index=True)
    product_id = Column(Integer, ForeignKey("products.id"))
    user_id = Column(Integer, ForeignKey("users.id"))
    rating = Column(Integer)
    title = Column(String)
    body = Column(String)
    is_verified = Column(Boolean, default=False)

class Order(Base):
    __tablename__ = "orders"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    order_number = Column(String, unique=True)
    status = Column(String)
    subtotal = Column(Float)
    shipping = Column(Float)
    tax = Column(Float)
    total = Column(Float)
    shipping_address = Column(String)
    payment = Column(String)

class OrderItem(Base):
    __tablename__ = "order_items"
    id = Column(Integer, primary_key=True, index=True)
    order_id = Column(Integer, ForeignKey("orders.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    variant_id = Column(Integer, ForeignKey("product_variants.id"), nullable=True)
    quantity = Column(Integer)
    unit_price = Column(Float)
    total = Column(Float)

class Cart(Base):
    __tablename__ = "cart"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    session_id = Column(String)
    product_id = Column(Integer, ForeignKey("products.id"))
    variant_id = Column(Integer, ForeignKey("product_variants.id"), nullable=True)
    quantity = Column(Integer)

# Growth & Engagement Models

class Referral(Base):
    __tablename__ = "referrals"
    id = Column(Integer, primary_key=True, index=True)
    referrer_id = Column(Integer, ForeignKey("users.id"))
    referred_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    referral_code = Column(String)
    reward_earned = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)

class RewardPoint(Base):
    __tablename__ = "reward_points"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    points = Column(Integer)
    transaction_type = Column(String) # 'earned' or 'redeemed'
    order_id = Column(Integer, ForeignKey("orders.id"), nullable=True)
    description = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class NotificationPreference(Base):
    __tablename__ = "notification_preferences"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    order_updates = Column(Boolean, default=True)
    promotions = Column(Boolean, default=False)
    farm_news = Column(Boolean, default=False)
    back_in_stock = Column(Boolean, default=True)

class NPSFeedback(Base):
    __tablename__ = "nps_feedback"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    score = Column(Integer)
    comments = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)

class StockAlert(Base):
    __tablename__ = "stock_alerts"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    product_id = Column(Integer, ForeignKey("products.id"))
    email = Column(String)
    notified = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)

Base.metadata.create_all(bind=engine)
