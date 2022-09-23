from typing import List
from fastapi import FastAPI, Depends, Request, Response
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session

import datetime

from .models import Weather
from random import randrange


from . import schemas, crud, models
from .database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)

Weather.__table__.drop(engine)
Weather.__table__.create(engine)


for i in range(90 * 24):
    today = datetime.datetime.today() - datetime.timedelta(hours=i)
    humidity = randrange(0, 101)
    temperature = randrange(-273, 10000)
    pressure = randrange(-10000, 10000)
    engine.execute(
        "INSERT INTO weather (timestamp, humidity, temperature, pressure) VALUES ('" + str(today.isoformat()) + "', " + str(humidity)+ ", "+ str(temperature) + ", " + str(pressure) + ")")

@app.middleware("http")
async def db_session_middleware(request: Request, call_next):
    response = Response("Internal Server Error", 500)
    try:
        request.state.db = SessionLocal()
        response = await call_next(request)
    finally:
        request.state.db.close()

    return response


# Database
def get_db(request: Request):
    return request.state.db


@app.get("/weather", response_model=List[schemas.Weather])
def read_weathers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    weather = crud.get_weathers(db, skip, limit)
    return weather


@app.get("/weather/between", response_model=List[schemas.Weather])
def read_weathers(start_date: str, end_date: str, db: Session = Depends(get_db)):
    weather = crud.get_weather_between(db, start_date, end_date)
    return weather
