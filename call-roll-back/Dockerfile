FROM python:3.9.2

WORKDIR /app

ADD . .

RUN ["ls", "-al"]
RUN ["python", "-m", "pip", "install", "-r", "requirements.txt"]

EXPOSE 5001

CMD python api.py