# syntax=docker/dockerfile:1.7

FROM python:3.12-slim AS base
LABEL authors="mrazumovskyy"

ENV PYTHONUNBUFFERED=1 \
    PYTHONDONTWRITEBYTECODE=1 \
    PIP_DISABLE_PIP_VERSION_CHECK=1 \
    PIP_NO_CACHE_DIR=off \
    FPM_VERSION=0.9.0 \
    PATH=/root/.local/bin:$PATH

RUN apt-get update && apt-get install -y --no-install-recommends \
    gfortran \
    wget \
    tar \
    && rm -rf /var/lib/apt/lists/*

RUN wget https://github.com/fortran-lang/fpm/releases/download/v${FPM_VERSION}/fpm-${FPM_VERSION}-linux-x86_64 \
    -O /usr/local/bin/fpm \
    && chmod +x /usr/local/bin/fpm

WORKDIR /app

FROM base AS deps
COPY api-server/requirements.txt /tmp/requirements.txt
RUN --mount=type=cache,target=/root/.cache/pip \
    pip install --user -r /tmp/requirements.txt

FROM base AS production
COPY --from=deps /root/.local /root/.local

COPY api-server /app/api-server
COPY core /app/core
COPY core/entrypoint.sh /usr/local/bin/entrypoint.sh

RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8001

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
