# Stage 1: Build the Next.js frontend
FROM node:20-alpine AS frontend-builder
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Stage 2: Build the Python backend and serve the frontend
FROM python:3.12-slim
WORKDIR /app

# Install system dependencies for any compiled Python packages if necessary
RUN apt-get update && apt-get install -y --no-install-recommends \
    build-essential \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# Copy backend code
COPY src/ ./src/
# Copy the built frontend to the 'static' directory in 'src'
COPY --from=frontend-builder /app/out/ ./src/static/

# Set environment variables
ENV FLASK_APP=src/app.py
ENV PYTHONUNBUFFERED=1

# Expose the default gunicorn port (not strictly required for Render)
EXPOSE 10000

# Run the application using the dynamic $PORT provided by Render
# Added logging to help troubleshoot startup issues
CMD gunicorn --bind 0.0.0.0:$PORT --access-logfile - --error-logfile - --log-level debug src.app:app
