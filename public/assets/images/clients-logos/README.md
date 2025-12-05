# Logos de Clientes - Grupo CPS

Esta carpeta contiene todos los logos de los clientes que confían en Grupo CPS.

## Estructura de Carpetas

```
clients-logos/
├── Constructoras y desarrolladoras/
│   ├── Arca.jpeg
│   ├── CIEMSA.png
│   ├── Ebital.png
│   ├── Enkel.svg
│   ├── Stiler.jpg
│   └── Teyma.svg
├── Cooperativas/
│   └── Fecovi.jpg
├── Estado/
│   ├── ASSE.png
│   ├── Antel.svg
│   ├── BSE.png
│   ├── MSP.png
│   ├── MTOP.png
│   ├── MTSS.png
│   ├── Mides.jpg
│   └── UDELAR.png
└── Privados/
    ├── Proa Carrasco.png
    ├── Sinergia.jpg
    └── Summum.png
```

## Formato de Logos

### Especificaciones Técnicas
- **Formatos aceptados**: PNG, JPG, JPEG, SVG
- **Fondo recomendado**: Transparente (PNG) o blanco
- **Resolución mínima**: 300x150 px
- **Resolución óptima**: 600x300 px
- **Ratio recomendado**: 2:1 o similar
- **Peso máximo**: 500KB por logo

### Diseño Visual
- El logo debe ser legible en tamaño pequeño
- Preferiblemente con fondo transparente
- Si tiene fondo, que sea blanco o muy claro
- Evitar logos con mucho detalle fino
- Los SVG son ideales por su escalabilidad

## Cómo Agregar un Nuevo Cliente

### Paso 1: Preparar el Logo
1. Optimiza el logo para web (comprime la imagen)
2. Guarda el archivo en la carpeta correspondiente:
   - `Constructoras y desarrolladoras/` - Para constructoras y desarrolladoras inmobiliarias
   - `Cooperativas/` - Para cooperativas
   - `Estado/` - Para instituciones estatales
   - `Privados/` - Para empresas privadas

### Paso 2: Actualizar el JSON
Edita el archivo `assets/data/clients.json` y agrega la información del nuevo cliente:

```json
{
  "nombre": "Nombre del Cliente",
  "logo": "Categoria/nombre-archivo.png",
  "categoria": "Constructoras"
}
```

**Ejemplo real:**
```json
{
  "nombre": "Nueva Constructora",
  "logo": "Constructoras y desarrolladoras/nueva-constructora.png",
  "categoria": "Constructoras"
}
```

### Paso 3: Verificar
1. Guarda los cambios
2. Recarga la página web
3. El nuevo logo debería aparecer automáticamente en el carrusel

## Categorías Disponibles

1. **Constructoras** - Empresas constructoras y desarrolladoras
2. **Cooperativas** - Cooperativas de vivienda
3. **Estado** - Instituciones estatales y gubernamentales
4. **Privados** - Empresas privadas en general

## Troubleshooting

### El logo no aparece
- Verifica que la ruta en el JSON coincida con la ubicación del archivo
- Revisa que el formato del archivo sea compatible (PNG, JPG, JPEG, SVG)
- Asegúrate de que el nombre del archivo no tenga caracteres especiales

### El logo se ve pixelado
- Usa una imagen de mayor resolución (mínimo 300x150 px)
- Considera usar formato SVG para mejor calidad

### El logo se ve demasiado grande o pequeño
- El carrusel ajusta automáticamente los logos a 180x90 px (desktop)
- En móviles se ajusta a 120x60 px
- Mantén un ratio de aspecto similar a 2:1 para mejor visualización

## Clientes Actuales

### Constructoras y Desarrolladoras (6)
- Arca
- CIEMSA
- Ebital
- Enkel
- Stiler
- Teyma

### Cooperativas (1)
- Fecovi

### Estado (8)
- ASSE
- Antel
- BSE
- MSP
- MTOP
- MTSS
- Mides
- UDELAR

### Privados (3)
- Proa Carrasco
- Sinergia
- Summum

**Total: 18 clientes**

## Características del Carrusel

- **Scroll automático**: Se desplaza continuamente de derecha a izquierda
- **Infinite loop**: Cuando termina, vuelve a empezar sin cortes
- **Pausa al hover**: Se detiene cuando pasas el cursor sobre un logo
- **Efecto de escala**: Los logos se agrandan sutilmente al hacer hover
- **Responsive**: Se adapta automáticamente a móviles y tablets
- **Carga dinámica**: Los logos se cargan desde el JSON automáticamente

## Optimización de Imágenes

Para optimizar los logos y mejorar el rendimiento:

1. **Online**: Usa herramientas como TinyPNG o Squoosh
2. **SVG**: Para logos vectoriales, usa SVGOMG
3. **Dimensiones**: Redimensiona a ~600x300 px antes de subir
4. **Compresión**: Usa calidad 80-85% para JPG

## Notas Importantes

- Los logos aparecen en escala de grises (filtro) y al hacer hover recuperan el color
- El carrusel muestra 6-8 logos simultáneamente en desktop
- En móviles muestra 3-4 logos
- El efecto de fade en los bordes está implementado para una transición suave
- No es necesario reiniciar el servidor, solo recargar la página
