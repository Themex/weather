from sqlalchemy import Column, TIMESTAMP, Numeric, Integer, CheckConstraint
from .database import Base


class Weather(Base):
    __tablename__ = "weather"
    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(TIMESTAMP, unique=True, index=True)
    humidity = Column(Numeric, CheckConstraint('humidity >= 0 and humidity <= 100'), index=True)
    temperature = Column(Numeric, CheckConstraint('temperature >= -273'), index=True)
    pressure = Column(Numeric, index=True)
