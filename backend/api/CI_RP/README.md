# Energy Forecast API

A lightweight, cost‑optimized FastAPI service that predicts carbon intensity and renewable energy percentage for Portugal (PT) based on live data from the ElectricityMaps API. It exposes two endpoints for live history data, normalized model inputs, and LSTM‑based prediction classes.

## Features

* **Power Breakdown**: Fetches the last 24 hours of renewable percentage history and returns:

  * raw history data (timestamps & values)
  * normalized input sequence for the model
  * predicted class (0–5 scale)

* **Carbon Intensity**: Fetches the last 24 hours of carbon intensity history and returns:

  * raw history data (timestamps & values)
  * normalized input sequence for the model
  * predicted class (0–5 scale)

* **Secure**: API key never committed; loaded from `.env` at runtime.

* **Tested & CI/CD**: GitHub Actions pipeline runs lint/tests, builds Docker image, pushes to Docker Hub, and deploys to Google Cloud Run.

* **Dev‑friendly**: `uv by Astrall` tasks for local development, Docker build/push, deploy, and tests.

## Prerequisites

* **Python 3.9+**
* **Docker** (for container builds)
* **GitHub account** (for CI/CD secrets)
* **Google Cloud project** with Cloud Run enabled
* **Docker Hub account**

## Environment Variables

Create a file named `.env` in the project root (already in `.gitignore`):

```dotenv
ELECTRICITYMAP_API_KEY=czG7nq1wv9OHi1phrXUn
# Optional defaults:
# ELECTRICITYMAP_BASE_URL=https://api.electricitymap.org/v3
# ELECTRICITYMAP_REGION=PT
```bash

## Project Structure

```MD031
my-energy-api/
├── .env
├── .gitignore
├── app/
│   ├── main.py      # FastAPI application
│   ├── utils.py     # data fetch, preprocessing, model load/predict
│   └── models/      # model & scaler artifacts
├── requirements.txt
├── Dockerfile
├── uv.yaml          # uv by Astrall task definitions
└── .github/
    └── workflows/
        └── deploy.yml
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your‑username>/my-energy-api.git
cd my-energy-api
```

### 2. Install dependencies

```bash
python -m venv .venv
source .venv/bin/activate
pip install --upgrade pip
pip install -r requirements.txt
```

### 3. Run locally

```bash
uv start         # starts FastAPI with autoreload
# or:
uvicorn app.main:app --reload
```

Open your browser at `http://localhost:8080/api/power-breakdown` or `/api/carbon-intensity`.

### 4. Using Docker

Build and run with Docker:

```bash
docker build -t your-dockerhub-username/energy-api:latest .
docker run --env-file .env -p 8080:8080 your-dockerhub-username/energy-api:latest
```

### 5. uv by Astrall Tasks

All tasks defined in `uv.yaml`:

```bash
uv start    # start local server
uv build    # build Docker image
uv push     # push image to Docker Hub
uv deploy   # deploy to Google Cloud Run
uv test     # run pytest
```

## CI/CD (GitHub Actions)

Secrets to configure in GitHub:

* `ELECTRICITYMAP_API_KEY`
* `DOCKERHUB_USERNAME` & `DOCKERHUB_TOKEN`
* `GCP_PROJECT` & `GCP_SA_KEY`

On push to `main`, the pipeline:

1. Installs dependencies & runs tests
2. Builds & pushes Docker image to Docker Hub
3. Authenticates with GCP & deploys to Cloud Run

## Deployment

After pushing a new Docker tag, manual deploy:

```bash
gcloud run deploy my-energy-api \
  --image docker.io/your-dockerhub-username/energy-api:latest \
  --region europe-west1 \
  --allow-unauthenticated
```

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/foo`)
3. Commit your changes (`git commit -am 'Add feature'`)
4. Push to the branch (`git push origin feature/foo`)
5. Open a Pull Request

## License

[MIT](LICENSE)
