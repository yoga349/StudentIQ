from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import joblib


app = FastAPI(
    title="StudentIQ ML API",
    description="Machine Learning API for student performance prediction",
    version="1.0.0"
)


# Load trained model
model = joblib.load("models/student_performance_model.pkl")


class StudentData(BaseModel):
    studytime: int
    failures: int
    absences: int
    G1: int
    G2: int
    Medu: int
    Fedu: int
    higher: str
    internet: str
    schoolsup: str
    famsup: str


@app.get("/")
def root():
    return {
        "message": "StudentIQ ML API is running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy",
        "model": "loaded"
    }


@app.post("/predict")
def predict(data: StudentData):

    input_data = pd.DataFrame([{
        "studytime": data.studytime,
        "failures": data.failures,
        "absences": data.absences,
        "G1": data.G1,
        "G2": data.G2,
        "Medu": data.Medu,
        "Fedu": data.Fedu,
        "higher": data.higher,
        "internet": data.internet,
        "schoolsup": data.schoolsup,
        "famsup": data.famsup
    }])

    prediction = model.predict(input_data)[0]

    return {
        "predicted_score": round(float(prediction), 2)
    }