# Energy Forecast API

A lightweight, cost-optimized FastAPI service that fetches live data from ElectricityMaps for Portugal (PT) and runs two LSTM models to forecast:

* **Renewable Percentage** (`/api/renewable-percentage`): percentage of renewable energy over the last 24 hours, normalized and classified (0–5).
* **Carbon Intensity** (`/api/carbon-intensity`): carbon intensity over the last 24 hours (gCO₂eq/kWh), normalized and classified (0–5).

Interactive API docs are available at `/docs` when running the service.

---

## Features

* **Live Data Fetch**: Pulls historical data (24 h) via ElectricityMaps API.
* **Normalization**: Applies MinMaxScaler to model inputs.
* **Prediction**: Runs pretrained TensorFlow LSTM models and returns a forecast class.
* **Single Service**: Both endpoints hosted in one FastAPI app.
* **Self-Documenting**: Swagger UI with rich metadata, summaries, and response schemas.
* **Secure**: All secrets are loaded from a gitignored `.env` file.
* **CI/CD**: GitHub Actions pipeline for tests, container build, Docker Hub push, and Cloud Run deploy.
* **Developer Tooling**: `uv.yaml` tasks via **uv by Astrall** for dev, build, push, deploy, and tests.

---

## Prerequisites

* Python 3.9+
* Docker (for building images locally)
* GitHub account with repository secrets set
* Google Cloud project with Cloud Run enabled
* Docker Hub account

---

## Environment Variables

Create a `.env` file at the project root (already included in `.gitignore`):

```dotenv
# ElectricityMaps API key
ELECTRICITYMAP_API_KEY=czG7nq1wv9OHi1phrXUn
# Optional overrides (defaults shown)
ELECTRICITYMAP_BASE_URL=https://api.electricitymap.org/v3
ELECTRICITYMAP_REGION=PT

# Model & scaler paths (if you moved the files)
SCALER_RP_PATH=models/renewable_percentage/scaler_renewable_percentage.pkl
MODEL_RP_PATH=models/renewable_percentage/model_renewable_percentage.keras
SCALER_CI_PATH=models/carbon_intensity/scaler_carbon_intensity.pkl
MODEL_CI_PATH=models/carbon_intensity/model_carbon_intensity.keras
```

---

## Project Structure

```
my-energy-api/
├── .env                   # Environment variables (gitignored)
├── .gitignore
├── app/
│   ├── main.py            # FastAPI endpoints
│   ├── utils.py           # Data fetch, preprocessing, model load & predict
│   └── models/            # Subfolders with model & scaler artifacts
│       ├── renewable_percentage/
│       │   ├── model_renewable_percentage.keras
│       │   └── scaler_renewable_percentage.pkl
│       └── carbon_intensity/
│           ├── model_carbon_intensity.keras
│           └── scaler_carbon_intensity.pkl
├── requirements.txt       # Python dependencies
├── Dockerfile
├── uv.yaml                # uv by Astrall task definitions
└── .github/
    └── workflows/
        └── deploy.yml     # GitHub Actions CI/CD pipeline
```

---

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/<your-username>/my-energy-api.git
cd my-energy-api
```

### 2. Install Python deps

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Run locally

```bash
uv start        # Uses uv by Astrall: uvcorn with reload
# or directly:
uvicorn app.main:app --reload
```

Open [http://localhost:8080/docs](http://localhost:8080/docs) to explore endpoints.

### 4. Docker workflow

```bash
# Build image
docker build -t your-dockerhub-username/energy-api:latest .

# Run container
docker run --env-file .env -p 8080:8080 your-dockerhub-username/energy-api:latest
```

### 5. uv by Astrall Tasks

All tasks are defined in `uv.yaml`:

* `uv start`  — run local dev server
* `uv build`  — build Docker image
* `uv push`   — push image to Docker Hub
* `uv deploy` — deploy to Google Cloud Run
* `uv test`   — run tests with pytest

---

## CI/CD (GitHub Actions)

### Repository Secrets

* `ELECTRICITYMAP_API_KEY`
* `DOCKERHUB_USERNAME`
* `DOCKERHUB_TOKEN`
* `GCP_PROJECT`
* `GCP_SA_KEY`

The `deploy.yml` workflow performs:

1. Checkout & install Python deps
2. Run tests
3. Build & push Docker image
4. Authenticate GCP & deploy to Cloud Run

---

## Deployment

To manually deploy a new version:

```bash
gcloud run deploy my-energy-api \
  --image docker.io/your-dockerhub-username/energy-api:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit & push
4. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
