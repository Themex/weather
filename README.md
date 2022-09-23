Первый старт
```shell
   docker-compose up -d --build 
```

Второй старт
```shell
    docker-compose up -d
```

Для простоты каждый раз при запуске приложения на Python
автоматически генерируются фейковый данные.

Данные хранятся за каждый час.

Если запрошен период содержащий в себе более 48 часов, данные усредняются.;

Python: FastAPI, sqlalchemy
React: echarts-for-react, react-datetimepicker, fetch
Postgresql 13