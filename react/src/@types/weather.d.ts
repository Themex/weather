interface Weather {
    id: number;
    timestamp: string;
    humidity?: number;
    temperature?: number;
    pressure?: number;
}

interface WeatherProp {
    data: Weather[],
    params: (keyof Weather)[];
}