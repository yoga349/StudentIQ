# StudentIQ 🎓

## Student Performance Prediction & Analytics Platform

StudentIQ is an end-to-end Machine Learning and full-stack web application designed to predict a student's expected final academic performance based on previous grades, study habits, attendance, academic support, and other student-related factors.

The project combines **Machine Learning, Python, FastAPI, Node.js, Express, React, and MongoDB** into a complete application that provides real-time predictions, academic performance classification, risk assessment, personalized recommendations, and prediction history.

---

## 🚀 Features

- 🎓 Student performance prediction
- 🤖 Machine Learning based final score prediction
- 📊 Exploratory Data Analysis
- 🧠 Gradient Boosting regression model
- 📈 Model comparison and evaluation
- 🔬 Cross-validation
- ⚠️ Academic risk assessment
- 💡 Personalized recommendations
- 📋 Prediction history
- 📉 Prediction score trend visualization
- 💾 MongoDB prediction storage
- ⚡ FastAPI ML inference service
- 🔗 REST API integration
- 🎨 Responsive React interface
- 📱 Dashboard for prediction analytics

---

# 🧠 Machine Learning

StudentIQ uses the **Student Performance Dataset** containing:

- **395 student records**
- **33 features**

The target variable used for prediction is:

```text
G3
```

`G3` represents the student's final academic grade.

## Main Features

The model uses academic, behavioral, and demographic information including:

- Study time
- Previous failures
- Absences
- First period grade (G1)
- Second period grade (G2)
- Mother's education
- Father's education
- Higher education intention
- Internet access
- School support
- Family support

---

# 🔬 Machine Learning Pipeline

The Machine Learning workflow follows a complete end-to-end pipeline:

```text
Student Performance Dataset
            ↓
Exploratory Data Analysis
            ↓
Data Cleaning & Preprocessing
            ↓
Feature Selection
            ↓
Train / Test Split
            ↓
Model Training
            ↓
Model Comparison
            ↓
Cross Validation
            ↓
Best Model Selection
            ↓
Model Persistence
            ↓
FastAPI ML Service
            ↓
Real-Time Prediction
```

---

# 🤖 Models Evaluated

Three regression algorithms were evaluated:

| Model | MAE | RMSE | R² |
|---|---:|---:|---:|
| Linear Regression | 1.403 | 2.156 | 0.773 |
| Random Forest | 1.142 | 1.881 | 0.827 |
| **Gradient Boosting** | **1.107** | **1.808** | **0.841** |

## Best Model

The **Gradient Boosting Regressor** achieved the best performance among the evaluated models.

### Test Set Performance

```text
MAE  : 1.107
RMSE : 1.808
R²   : 0.841
```

The R² score of approximately **0.84** indicates that the model explains a substantial portion of the variation in the final student grades within the test data.

---

# 🔄 Cross Validation

5-fold cross-validation was performed to evaluate the stability of the selected Gradient Boosting model.

```text
Cross-validation R² scores:

0.702
0.853
0.874
0.819
0.781
```

### Cross-validation Result

```text
Mean R² = 0.806
Standard Deviation = 0.061
```

The cross-validation results provide additional evidence that the model performs consistently across different subsets of the dataset.

---

# 📊 Feature Analysis

Correlation analysis showed that previous academic performance was strongly related to the final grade.

The strongest correlations with `G3` included:

```text
G2          0.905
G1          0.801
Failures   -0.360
Medu        0.217
Fedu        0.152
Studytime   0.098
Absences    0.034
```

This indicates that previous academic performance, particularly `G2`, is an important predictor of the final academic result.

---

# 🏗️ System Architecture

StudentIQ uses a multi-layer architecture combining a React frontend, Node.js backend, FastAPI ML service, and MongoDB database.

```text
                         STUDENTIQ
                             │
                             ▼
                     React Frontend
                             │
                           Axios
                             │
                             ▼
                    Node.js / Express
                       │           │
                       │           │
                       ▼           ▼
                   MongoDB      FastAPI
                 Predictions    ML Service
                                   │
                                   ▼
                          Gradient Boosting
                                   │
                                   ▼
                          Predicted Final Score
                                   │
                         ┌─────────┴─────────┐
                         ▼                   ▼
                    Risk Level       Recommendations
```

---

# 🔄 Application Flow

When a student submits their information, the following process occurs:

```text
Student Input
     ↓
React Frontend
     ↓
Node.js / Express API
     ↓
FastAPI ML Service
     ↓
Gradient Boosting Model
     ↓
Predicted Final Score
     ↓
Performance Classification
     ↓
Risk Assessment
     ↓
Personalized Recommendations
     ↓
MongoDB
     ↓
Result Displayed in React
```

---

# 🛠️ Technology Stack

## Frontend

- React
- Vite
- Tailwind CSS
- Axios
- React Router
- Recharts

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

## Machine Learning

- Python
- Pandas
- NumPy
- Scikit-learn
- Joblib
- Jupyter Notebook

## ML API

- FastAPI
- Uvicorn

---

# 📁 Project Structure

```text
StudentIQ/
│
├── Backend/
│   │
│   ├── config/
│   │
│   ├── controllers/
│   │   ├── predictionController.js
│   │   └── predictionHistoryController.js
│   │
│   ├── models/
│   │   └── Prediction.js
│   │
│   ├── routes/
│   │   └── predictionRoutes.js
│   │
│   ├── services/
│   │   └── mlService.js
│   │
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── Frontend/
│   │
│   ├── src/
│   │   │
│   │   ├── components/
│   │   │   ├── PredictionForm.jsx
│   │   │   └── PredictionResult.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Dashboard.jsx
│   │   │   ├── Prediction.jsx
│   │   │   └── PredictionHistory.jsx
│   │   │
│   │   ├── services/
│   │   │   └── predictionService.js
│   │   │
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── package.json
│   └── package-lock.json
│
├── ML/
│   │
│   ├── models/
│   │   └── student_performance_model.pkl
│   │
│   ├── app.py
│   ├── requirements.txt
│   └── ...
│
├── .gitignore
└── README.md
```

---

# 📋 Prediction Output

StudentIQ provides multiple levels of analysis after receiving the student's information.

## 1. Predicted Final Score

The Machine Learning model predicts the expected final grade on a scale of 0–20.

Example:

```text
Predicted Final Score

15.61 / 20
```

---

## 2. Performance Category

The predicted score is converted into an understandable performance category.

The application uses the following categories:

```text
Excellent
Good
Average
Needs Improvement
```

---

## 3. Academic Risk Level

StudentIQ performs a separate risk assessment using the predicted score and important student factors.

Possible risk levels are:

```text
Low
Medium
High
```

Risk assessment considers factors such as:

- Predicted score
- Previous failures
- Absences
- Previous academic grades

---

## 4. Personalized Recommendations

StudentIQ generates recommendations based on the student's academic information.

Recommendations can consider:

- Previous grades
- Study time
- Absences
- Previous failures
- School support
- Family support

Example:

```text
Focus on improving your latest academic performance.

Try to reduce absences and maintain regular attendance.

Consider increasing your weekly study time.
```

---

# 📈 Dashboard

The StudentIQ dashboard provides an overview of prediction activity.

It displays:

- Total predictions
- Average predicted score
- Latest predicted score
- Low-risk prediction count
- Prediction score trend
- Machine Learning model information

The score trend is visualized using a line chart to help observe changes across previous predictions.

---

# 📝 Prediction History

Every successful prediction is stored in MongoDB.

The Prediction History page displays:

- Prediction date
- Prediction time
- Predicted score
- Performance category
- Risk level
- G1
- G2
- Absences

Example:

```text
Date          Score       Performance       Risk
----------------------------------------------------
17 Aug 2026   15.61       Excellent         Low
17 Aug 2026   13.42       Good              Medium
16 Aug 2026   10.85       Average           Medium
```

This allows previous predictions to be reviewed and compared.

---

# 🔌 API Endpoints

## Predict Student Performance

```http
POST /api/predictions/predict
```

This endpoint receives student information and returns:

- Predicted score
- Performance category
- Risk level
- Recommendations

---

## Prediction History

```http
GET /api/predictions/history
```

This endpoint retrieves previously stored predictions from MongoDB.

---

# ⚙️ Installation & Setup

## Prerequisites

Make sure the following are installed:

- Node.js
- npm
- Python 3.x
- MongoDB or MongoDB Atlas
- Git

---

# 1. Clone the Repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
cd StudentIQ
```

Replace `YOUR_GITHUB_REPOSITORY_URL` with your GitHub repository URL.

---

# 2. Backend Setup

Navigate to the Backend directory:

```bash
cd Backend
```

Install dependencies:

```bash
npm install
```

Create a `.env` file inside the `Backend` directory:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

---

# 3. Machine Learning Setup

Open a new terminal.

Navigate to the ML directory:

```bash
cd ML
```

Create a Python virtual environment:

```bash
python -m venv venv
```

Activate the virtual environment on Windows:

```bash
venv\Scripts\activate
```

Install the required Python packages:

```bash
pip install -r requirements.txt
```

Start the FastAPI ML service:

```bash
uvicorn app:app --reload --port 8000
```

The ML service will run on:

```text
http://127.0.0.1:8000
```

---

# 4. Frontend Setup

Open another terminal.

Navigate to the Frontend directory:

```bash
cd Frontend
```

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

The frontend will run on:

```text
http://localhost:5173
```

---

# ▶️ Running the Complete Application

StudentIQ requires three services to run simultaneously.

### Terminal 1 — ML Service

```bash
cd ML
venv\Scripts\activate
uvicorn app:app --reload --port 8000
```

### Terminal 2 — Backend

```bash
cd Backend
npm run dev
```

### Terminal 3 — Frontend

```bash
cd Frontend
npm run dev
```

Then open:

```text
http://localhost:5173
```

---

# 🔐 Environment Variables

Do not commit your actual `.env` file to GitHub.

Create a `.env.example` file instead:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Never expose:

- MongoDB credentials
- API keys
- Passwords
- Secret tokens

---

# 🧪 Model Reproducibility

The project uses:

```text
scikit-learn==1.8.0
```

The version is pinned to maintain compatibility with the saved Machine Learning model.

Install the exact dependencies using:

```bash
pip install -r requirements.txt
```

---

# 🎯 Project Objectives

The main objectives of StudentIQ are:

1. Apply Machine Learning to student performance prediction.
2. Analyze academic and behavioral factors affecting student performance.
3. Compare multiple regression algorithms.
4. Select the best-performing Machine Learning model.
5. Build a complete ML pipeline from preprocessing to inference.
6. Integrate a trained ML model into a full-stack web application.
7. Provide meaningful academic performance insights.
8. Store and visualize previous predictions.
9. Demonstrate communication between multiple application services.
10. Build a practical real-world Machine Learning application.

---

# 💡 Why StudentIQ?

Traditional student management systems mainly store student information and academic records.

StudentIQ goes one step further by using Machine Learning to analyze student information and estimate future academic performance.

Instead of only answering:

```text
"What are the student's previous marks?"
```

StudentIQ attempts to answer:

```text
"What could the student's final performance look like?"
```

and provides additional insights such as:

```text
Predicted Score
      ↓
Performance Level
      ↓
Academic Risk
      ↓
Recommendations
```

---

# 🔮 Future Improvements

The current version focuses on student performance prediction and analytics.

Possible future improvements include:

- Student authentication
- Teacher dashboard
- Admin dashboard
- Student profiles
- Subject-wise performance prediction
- Attendance analytics
- Explainable AI using SHAP
- Automated model retraining
- Cloud deployment
- Student-specific performance tracking
- Advanced academic analytics
- Notification system
- Model monitoring

---

# 📚 Learning Outcomes

Through this project, the following concepts were implemented:

### Machine Learning

- Data preprocessing
- Exploratory Data Analysis
- Feature selection
- Regression
- Model comparison
- Cross-validation
- Model evaluation
- Model persistence

### Backend Development

- REST APIs
- Express.js
- MongoDB
- Mongoose
- API communication
- ML service integration

### Frontend Development

- React
- Component-based architecture
- State management
- API integration
- React Router
- Responsive UI
- Data visualization

### ML Deployment

- FastAPI
- Uvicorn
- Python virtual environments
- Model serving
- Communication between Node.js and Python services

---

# 📊 Project Results

The final selected Gradient Boosting model achieved:

```text
Test R²  : 0.841
MAE      : 1.107
RMSE     : 1.808
```

Cross-validation achieved:

```text
Mean R²  : 0.806
Std      : 0.061
```

The complete model is integrated into the StudentIQ web application through a FastAPI service.

---

# 👨‍💻 Author

**Monish Pawar**

StudentIQ was developed as an academic Machine Learning mini-project and portfolio project demonstrating the integration of Machine Learning with full-stack web development.

---

# 📄 License

This project is developed for educational, academic, and portfolio purposes.
