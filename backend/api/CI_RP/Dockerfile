### Dockerfile
# Build stage
FROM python:3.9-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --user --no-cache-dir -r requirements.txt

# Runtime stage
FROM python:3.9-slim
WORKDIR /app
# Copy installed deps
COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH
# Copy code
COPY app ./app
# Copy your models directory (locally mount or include in build)
COPY models ./models

# Environment variables defaults (override in CI/CD or Cloud Run)
ENV ELECTRICITYMAP_API_KEY="YOUR_KEY_HERE"
ENV ELECTRICITYMAP_BASE_URL="https://api.electricitymap.org/v3"
ENV ELECTRICITYMAP_REGION="PT"

CMD ["app.main:app", "--host", "0.0.0.0", "--port", "8080"]