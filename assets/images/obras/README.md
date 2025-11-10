# Imágenes de Obras

Esta carpeta contiene las imágenes de todas las obras realizadas por Grupo CPS.

## Estructura de Carpetas

Cada obra tiene su propia carpeta identificada por su ID:

- `obra-1/` - Edificio Residencial Torre Sol
- `obra-2/` - Centro Comercial Punta Este
- `obra-3/` - Oficinas Corporativas TechHub
- `obra-4/` - Complejo Industrial LogiPark
- `obra-5/` - Hotel Boutique Océano Azul

## Formato de Imágenes

- **Formato recomendado**: JPG, PNG
- **Resolución mínima**: 1200x800 px
- **Ratio recomendado**: 3:2 o 16:9
- **Peso máximo**: 2MB por imagen

## Nomenclatura

Las imágenes dentro de cada carpeta deben seguir el formato:
- `imagen-1.jpg`
- `imagen-2.jpg`
- `imagen-3.jpg`
- etc.

Ejemplo para obra-1:
```
obra-1/
  ├── imagen-1.jpg (Fachada principal)
  ├── imagen-2.jpg (Vista interior)
  └── imagen-3.jpg (Detalle de carpintería)
```

## Agregar Nueva Obra

1. Crear una nueva carpeta con el ID de la obra: `obra-X/`
2. Agregar las imágenes dentro de la carpeta
3. Actualizar el archivo `assets/data/obras.json` con las referencias a las imágenes
4. Actualizar este README con la nueva obra
