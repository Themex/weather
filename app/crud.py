from sqlalchemy.orm import Session
from sqlalchemy import func

from . import models


def get_weathers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Weather).offset(skip).limit(limit).all()


def get_weather_between(db: Session, start_date: str, end_date: str):
    query = db.query(models.Weather)\
        .filter(models.Weather.timestamp >= start_date) \
        .filter(models.Weather.timestamp <= end_date)\
        .order_by(models.Weather.timestamp.asc())

    count = query.count()

    # если запрошена дата содержащая более 48 часов внутри периода
    if count > 48:
        return db.query(
            func.min(models.Weather.id).label('id'),
            func.avg(models.Weather.humidity).label('humidity'),
            func.avg(models.Weather.temperature).label('temperature'),
            func.avg(models.Weather.pressure).label('pressure'),
            func.date_trunc('day', models.Weather.timestamp).label('timestamp')) \
            .filter(models.Weather.timestamp >= start_date) \
            .filter(models.Weather.timestamp <= end_date) \
            .order_by(func.date_trunc('day', models.Weather.timestamp))\
            .group_by(func.date_trunc('day', models.Weather.timestamp)).all()

    return query.all()
