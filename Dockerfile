FROM python:3.12-slim AS base

LABEL authors="mrazumovskyy"

RUN apt-get update && apt-get install -y --no-install-recommends \
    gfortran \
    wget \
    tar \
    && rm -rf /var/lib/apt/lists/*

ENV FPM_VERSION=0.9.0
RUN wget https://github.com/fortran-lang/fpm/releases/download/v${FPM_VERSION}/fpm-${FPM_VERSION}-linux-x86_64 \
    -O /usr/local/bin/fpm \
    && chmod +x /usr/local/bin/fpm

WORKDIR /app

FROM base AS builder
COPY requirements.txt ./
RUN pip install --no-cache-dir --user -r requirements.txt

FROM base AS production

COPY --from=builder /root/.local /root/.local
ENV PATH=/root/.local/bin:$PATH

COPY . .

COPY entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000

ENTRYPOINT ["/usr/local/bin/entrypoint.sh"]
