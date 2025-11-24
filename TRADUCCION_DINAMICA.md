# Elementos Dinámicos que Requieren Traducción

Este documento describe los elementos que se generan dinámicamente en JavaScript y requieren traducciones adicionales para funcionar correctamente con el sistema i18n.

## Archivo: js/obras.js

### 1. Mensaje de "No se encontraron obras" (líneas 151-156)
**Ubicación en código:**
```javascript
grid.innerHTML = `
    <div class="no-obras-message">
        <h3>No se encontraron obras</h3>
        <p>No hay obras que coincidan con los filtros seleccionados.</p>
    </div>
`;
```

**Traducciones necesarias:**
- `obrasPage.noResults.title` - "No se encontraron obras"
- `obrasPage.noResults.description` - "No hay obras que coincidan con los filtros seleccionados. Prueba con otros criterios de búsqueda."

**Solución:**
```javascript
grid.innerHTML = `
    <div class="no-obras-message">
        <h3 data-i18n="obrasPage.noResults.title">${t('obrasPage.noResults.title')}</h3>
        <p data-i18n="obrasPage.noResults.description">${t('obrasPage.noResults.description')}</p>
    </div>
`;
```

---

### 2. Texto del loader de imágenes (línea 167)
**Ubicación en código:**
```javascript
<div class="obra-image-loader">
    <div class="obra-spinner"></div>
    <p>Cargando obras</p>
</div>
```

**Traducción necesaria:**
- `obrasPage.loadingImage` - "Cargando imagen..."

**Solución:**
```javascript
<div class="obra-image-loader">
    <div class="obra-spinner"></div>
    <p data-i18n="obrasPage.loadingImage">${t('obrasPage.loadingImage')}</p>
</div>
```

---

### 3. Badge de estado de obra (línea 189-191)
**Ubicación en código:**
```javascript
<span class="obra-status-badge status-${obra.estado.toLowerCase().replace(' ', '-')}">
    ${obra.estado}
</span>
```

**Traducciones necesarias:**
- `projects.status.completed` - "Completada"
- `projects.status.inProgress` - "En Progreso"

**Solución:**
Necesita mapeo de estado:
```javascript
const statusKey = obra.estado === 'Completada' ? 'projects.status.completed' : 'projects.status.inProgress';
<span class="obra-status-badge status-${obra.estado.toLowerCase().replace(' ', '-')}" data-i18n="${statusKey}">
    ${t(statusKey)}
</span>
```

---

### 4. Labels en tarjetas de obras (líneas 208-213)
**Ubicación en código:**
```javascript
<div class="obra-detail-item">
    <span class="detail-label">Ubicación</span>
    <span class="detail-value">${obra.ubicacion}</span>
</div>
<div class="obra-detail-item">
    <span class="detail-label">Superficie</span>
    <span class="detail-value">${obra.superficie}</span>
</div>
```

**Traducciones necesarias:**
- `projects.details.location` - "Ubicación"
- `projects.details.area` - "Superficie"

**Solución:**
```javascript
<div class="obra-detail-item">
    <span class="detail-label" data-i18n="projects.details.location">${t('projects.details.location')}</span>
    <span class="detail-value">${obra.ubicacion}</span>
</div>
<div class="obra-detail-item">
    <span class="detail-label" data-i18n="projects.details.area">${t('projects.details.area')}</span>
    <span class="detail-value">${obra.superficie}</span>
</div>
```

---

### 5. Botón "Ver Detalles" (línea 217)
**Ubicación en código:**
```javascript
<button class="btn-ver-mas" onclick="openModal(${obra.id}); event.stopPropagation();">Ver Detalles</button>
```

**Traducción necesaria:**
- `obrasPage.card.viewMore` - "Ver más detalles"

**Solución:**
```javascript
<button class="btn-ver-mas" onclick="openModal(${obra.id}); event.stopPropagation();" data-i18n="obrasPage.card.viewMore">
    ${t('obrasPage.card.viewMore')}
</button>
```

---

### 6. Modal - Título "Descripción del Proyecto" (línea 685)
**Ubicación en código:**
```javascript
<h3 style="color: var(--white); margin-bottom: 1rem; font-size: 1.3rem;">
    <svg>...</svg>
    Descripción del Proyecto
</h3>
```

**Traducción necesaria:**
- `obrasPage.modal.description` - "Descripción del proyecto"

**Solución:**
```javascript
<h3 style="color: var(--white); margin-bottom: 1rem; font-size: 1.3rem;">
    <svg>...</svg>
    <span data-i18n="obrasPage.modal.description">${t('obrasPage.modal.description')}</span>
</h3>
```

---

### 7. Modal - Labels de detalles (líneas 697, 709, 719, 729)
**Ubicación en código:**
```javascript
<span class="modal-detail-label">
    <svg>...</svg>
    Estado
</span>
<span class="modal-detail-label">
    <svg>...</svg>
    Ubicación
</span>
<span class="modal-detail-label">
    <svg>...</svg>
    Superficie
</span>
<span class="modal-detail-label">
    <svg>...</svg>
    Cliente
</span>
```

**Traducciones necesarias:**
- `obrasPage.modal.status` - "Estado"
- `obrasPage.modal.location` - "Ubicación"
- `obrasPage.modal.area` - "Superficie"
- `obrasPage.modal.client` - "Cliente"

**Solución:**
```javascript
<span class="modal-detail-label">
    <svg>...</svg>
    <span data-i18n="obrasPage.modal.status">${t('obrasPage.modal.status')}</span>
</span>
// ... y así para los demás
```

---

### 8. Mensaje de error (líneas 590-595)
**Ubicación en código:**
```javascript
grid.innerHTML = `
    <div class="no-obras-message">
        <h3>Error al cargar las obras</h3>
        <p>No se pudieron cargar las obras. Por favor, intenta nuevamente más tarde.</p>
    </div>
`;
```

**Traducciones necesarias:**
- `errors.loadProjects` - "Error al cargar los proyectos. Por favor, intenta nuevamente."

**Solución:**
```javascript
grid.innerHTML = `
    <div class="no-obras-message">
        <h3 data-i18n="common.error">${t('common.error')}</h3>
        <p data-i18n="errors.loadProjects">${t('errors.loadProjects')}</p>
    </div>
`;
```

---

## Archivo: js/main.js

### 1. Loader de clientes (línea 319)
**Ubicación en código:**
```javascript
carousel.innerHTML = '<div class="clients-loader"><div class="loader-spinner"></div></div>';
```

**Traducción necesaria:**
- `clients.loading` - "Cargando clientes..."

**Solución:**
```javascript
carousel.innerHTML = `<div class="clients-loader">
    <div class="loader-spinner"></div>
    <p data-i18n="clients.loading">${t('clients.loading')}</p>
</div>`;
```

---

### 2. Formulario de contacto - Estados (líneas 594-607)
**Ubicación en código:**
```javascript
responseEl.textContent = "Enviando...";
// ...
responseEl.textContent = text;
// ...
responseEl.textContent = "Error de conexión. Intenta nuevamente.";
```

**Traducciones necesarias:**
- `contact.form.sending` - "Enviando..."
- `contact.form.success` - "¡Mensaje enviado con éxito! Nos pondremos en contacto pronto."
- `contact.form.error` - "Hubo un error al enviar el mensaje. Por favor, intenta nuevamente."

**Solución:**
```javascript
responseEl.textContent = t('contact.form.sending');
// ...
responseEl.textContent = t('contact.form.success');
// ...
responseEl.textContent = t('contact.form.error');
```

---

## Resumen de Cambios Necesarios

Para completar la internacionalización, se deben:

1. **Modificar `js/obras.js`:**
   - Importar/usar la función `t()` del archivo i18n.js
   - Actualizar todas las generaciones dinámicas de HTML para usar traducciones
   - Agregar atributos `data-i18n` a elementos generados dinámicamente

2. **Modificar `js/main.js`:**
   - Actualizar mensajes del formulario de contacto
   - Actualizar loader de clientes

3. **Agregar listener para cambio de idioma:**
   - Cuando el idioma cambie, volver a renderizar las obras para actualizar textos dinámicos
   - Escuchar el evento `languageChanged` y llamar a `renderObras()` nuevamente

### Ejemplo de implementación del listener:

```javascript
// En js/obras.js, agregar al final:
document.addEventListener('languageChanged', (e) => {
    console.log('Language changed to:', e.detail.lang);
    if (obrasData.length > 0) {
        renderObras();
    }
});
```

---

## Notas Importantes

- Todos los textos en español actualmente en el código deben ser reemplazados por llamadas a `t(key)`
- Los elementos generados dinámicamente deben incluir `data-i18n` para que el sistema de traducción los detecte
- Al cambiar el idioma, las tarjetas de obras se deben re-renderizar para mostrar las traducciones correctas
- Los estados de obra ("Completada", "En Progreso") deben mapearse a sus respectivas keys de traducción
