# Eco AI.ly - Carbon Intensity & Renewable Percentage API

A lightweight, cost-optimized FastAPI service, part of the Eco AI.ly platform. It fetches live data from ElectricityMaps for Portugal (PT) and runs two LSTM models to forecast:

* **Renewable Percentage** (`/api/renewable-percentage`): percentage of renewable energy over the last 24 hours, normalized and classified (0–5).
* **Carbon Intensity** (`/api/carbon-intensity`): carbon intensity over the last 24 hours (gCO₂eq/kWh), normalized and classified (0–5).

This API serves as a backend for the Eco AI.ly Next.js web platform, providing crucial data for its dashboards.
Interactive API docs are available at `/docs` when running the service.

---

## Features

* **Live Data Fetch**: Pulls historical data (24 h) via ElectricityMaps API.
* **Normalization**: Applies MinMaxScaler to model inputs.
* **Prediction**: Runs pretrained TensorFlow LSTM models and returns a forecast class.
* **Single Service**: Both endpoints hosted in one FastAPI app.
* **Self-Documenting**: Swagger UI with rich metadata, summaries, and response schemas.
* **Secure**: All secrets are loaded from a gitignored `.env` file.
* **CI/CD**: GitHub Actions pipeline for tests, container build, Docker Hub push, and Google Cloud Run deploy.
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

Create a `.env` file at the root of this API's directory (`backend/api/CI_RP/.env`):

```dotenv
# ElectricityMaps API key
ELECTRICITYMAP_API_KEY=your_electricitymaps_api_key
# Optional overrides (defaults shown)
ELECTRICITYMAP_BASE_URL=https://api.electricitymap.org/v3
ELECTRICITYMAP_REGION=PT

# Model & scaler paths (relative to this directory)
SCALER_RP_PATH=models/renewable_percentage/scaler_renewable_percentage.pkl
MODEL_RP_PATH=models/renewable_percentage/model_renewable_percentage.keras
SCALER_CI_PATH=models/carbon_intensity/scaler_carbon_intensity.pkl
MODEL_CI_PATH=models/carbon_intensity/model_carbon_intensity.keras
```

---

## Project Structure

(Relative to `backend/api/CI_RP/`)
```
.
├── .env                   # Environment variables (gitignored)
├── .gitignore
├── main.py                # FastAPI endpoints
├── utils.py               # Data fetch, preprocessing, model load & predict
├── models/                # Subfolders with model & scaler artifacts
│   ├── renewable_percentage/
│   │   ├── model_renewable_percentage.keras
│   │   └── scaler_renewable_percentage.pkl
│   └── carbon_intensity/
│       ├── model_carbon_intensity.keras
│       └── scaler_carbon_intensity.pkl
├── requirements.txt       # Python dependencies
├── Dockerfile
├── uv.yaml                # uv by Astrall task definitions
└── README.md              # This file
# Note: .github/workflows/ for CI/CD is typically at the monorepo root (Eco-AI.ly/.github/workflows)
```

---

## Getting Started

### 1. Clone the Eco AI.ly repository

```bash
git clone https://github.com/eco-ai-ly/eco-ai-ly.git
cd eco-ai-ly/backend/api/CI_RP
```

### 2. Install Python deps (from `backend/api/CI_RP` directory)

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Run locally (from `backend/api/CI_RP` directory)

```bash
uv start        # Uses uv by Astrall: uvicorn app.main:app --reload --port 8080
# or directly:
uvicorn main:app --reload --port 8080
```

Open [http://localhost:8080/docs](http://localhost:8080/docs) to explore endpoints.

### 4. Docker workflow (from `backend/api/CI_RP` directory)

```bash
# Build image
docker build -t ecoaily/eco-ai-ly-ci-rp-api:latest .

# Run container
docker run --env-file .env -p 8080:8080 ecoaily/eco-ai-ly-ci-rp-api:latest
```

### 5. uv by Astrall Tasks (run from `backend/api/CI_RP` directory)

All tasks are defined in `uv.yaml`:

* `uv start`  — run local dev server
* `uv build`  — build Docker image (e.g., `ecoaily/eco-ai-ly-ci-rp-api`)
* `uv push`   — push image to Docker Hub
* `uv deploy` — deploy to Google Cloud Run (e.g., `eco-ai-ly-ci-rp-api`)
* `uv test`   — run tests with pytest

---

## CI/CD (GitHub Actions)

The CI/CD pipeline is typically defined in `.github/workflows/` at the root of the `eco-ai-ly` repository. It should be configured to build and deploy this specific API.

### Repository Secrets (to be set in `eco-ai-ly/eco-ai-ly` GitHub repo)

* `ELECTRICITYMAP_API_KEY`
* `DOCKERHUB_USERNAME`
* `DOCKERHUB_TOKEN`
* `GCP_PROJECT`
* `GCP_SA_KEY`

The `deploy.yml` workflow performs:

1. Checkout & install Python deps (specific to this API)
2. Run tests (specific to this API)
3. Build & push Docker image (e.g., `ecoaily/eco-ai-ly-ci-rp-api`)
4. Authenticate GCP & deploy to Cloud Run (as `eco-ai-ly-ci-rp-api`)

---

## Deployment

To manually deploy a new version (ensure you are in `backend/api/CI_RP` and authenticated with gcloud):

```bash
# Example using gcloud CLI
gcloud run deploy eco-ai-ly-ci-rp-api \\
  --image docker.io/ecoaily/eco-ai-ly-ci-rp-api:latest \\
  --region europe-west1 \\
  --allow-unauthenticated \\
  --port 8080 \\
  --set-env-vars ELECTRICITYMAP_API_KEY=your_electricitymaps_api_key_from_secret_manager # Or other env vars
```
Make sure your Docker image is pushed to Docker Hub (e.g., `docker.io/ecoaily/eco-ai-ly-ci-rp-api:latest`).

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit & push
4. Open a Pull Request

---

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.
