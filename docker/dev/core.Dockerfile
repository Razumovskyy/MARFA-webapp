FROM python:3.12
LABEL authors="mrazumovskyy"

RUN apt-get update && apt-get install -y \
    gfortran \
    wget \
    tar \
    && rm -rf /var/lib/apt/lists/*

# Install FPM (adjust the version and URL if needed)
ENV FPM_VERSION=0.9.0
RUN wget https://github.com/fortran-lang/fpm/releases/download/v${FPM_VERSION}/fpm-${FPM_VERSION}-linux-x86_64 \
    -O /usr/local/bin/fpm \
    && chmod +x /usr/local/bin/fpm

WORKDIR /app

COPY ./api-server/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Copy the entrypoint script
COPY ./core/entrypoint.sh /usr/local/bin/entrypoint.sh
RUN chmod +x /usr/local/bin/entrypoint.sh

EXPOSE 8000
# Set the entrypoint
CMD ["/usr/local/bin/entrypoint.sh"]
