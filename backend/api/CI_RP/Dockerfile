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

CMD ["python", "-m", "uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8080"]