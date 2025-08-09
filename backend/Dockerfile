FROM php:8.3-cli

WORKDIR /var/www/html

RUN apt-get update \
  && apt-get install -y --no-install-recommends \
       git unzip zip libzip-dev \
  && docker-php-ext-configure zip \
  && docker-php-ext-install zip \
  && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer
ENV COMPOSER_ALLOW_SUPERUSER=1

COPY composer.json composer.lock ./
RUN composer install --no-interaction --prefer-dist --optimize-autoloader

COPY src/ ./src/
COPY public/ ./public/
COPY data/ ./data/

EXPOSE 8080
CMD ["php", "-S", "0.0.0.0:8080", "-t", "public"]