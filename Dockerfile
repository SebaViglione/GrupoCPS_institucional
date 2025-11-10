FROM php:8.2-apache

# ==============================
# Configuración base
# ==============================

# Instalar extensiones PHP necesarias
RUN docker-php-ext-install mysqli && docker-php-ext-enable mysqli

# Habilitar módulos de Apache
RUN a2enmod rewrite && a2enmod ssl

# ==============================
# Instalar Composer (desde imagen oficial)
# ==============================
COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

# ==============================
# Copiar archivos del proyecto
# ==============================
WORKDIR /var/www/html
COPY . .

# ==============================
# Permisos y dependencias
# ==============================
RUN chown -R www-data:www-data /var/www/html

# Instalar dependencias PHP (PHPMailer, etc.)
RUN composer install --no-dev --optimize-autoloader --no-interaction

# ==============================
# Exponer el puerto del servidor
# ==============================
EXPOSE 80

# ==============================
# Comando por defecto
# ==============================
CMD ["apache2-foreground"]
