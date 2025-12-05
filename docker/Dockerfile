FROM php:8.2-apache

# ==============================
# Configuración base y dependencias del SO
# ==============================

# Instalar dependencias del sistema necesarias para Composer (Git, Unzip, Libzip)
RUN apt-get update && apt-get install -y \
    git \
    unzip \
    libzip-dev \
    && rm -rf /var/lib/apt/lists/*

# ==============================
# Extensiones PHP
# ==============================

# Instalar extensión zip (requerida por Composer) y mysqli
RUN docker-php-ext-install zip mysqli && docker-php-ext-enable mysqli

# Habilitar módulos de Apache
RUN a2enmod rewrite && a2enmod ssl

# ==============================
# Configuración de Apache para desarrollo
# ==============================

# Permitir que Apache use variables de entorno para usuario/grupo
RUN sed -i 's/export APACHE_RUN_USER=www-data/export APACHE_RUN_USER=${APACHE_RUN_USER:-www-data}/' /etc/apache2/envvars && \
    sed -i 's/export APACHE_RUN_GROUP=www-data/export APACHE_RUN_GROUP=${APACHE_RUN_GROUP:-www-data}/' /etc/apache2/envvars

# ==============================
# Instalar Composer
# ==============================
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ==============================
# Configurar directorio de trabajo
# ==============================
WORKDIR /var/www/html

# Copiar composer.json primero para cachear dependencias
COPY composer.json composer.lock* ./

# Instalar dependencias PHP
RUN composer install --no-dev --optimize-autoloader --no-interaction || true

# Copiar el resto del proyecto
COPY public/ .

# ==============================
# Permisos
# ==============================

# Dar permisos amplios para desarrollo (el volumen montado sobrescribirá esto de todos modos)
RUN chmod -R 755 /var/www/html

# ==============================
# Finalización
# ==============================
EXPOSE 80
CMD ["apache2-foreground"]