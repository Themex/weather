import datetime
from typing import Optional
from pydantic import BaseModel, Field


class Weather(BaseModel):
    id: Optional[int]
    timestamp: datetime.datetime
    humidity: Optional[float]
    pressure: Optional[float]
    temperature: Optional[float]

    class Config:
        orm_mode = True
