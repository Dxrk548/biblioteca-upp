# 📚 Sistema de Administración de Biblioteca UPP

Una aplicación web profesional para la administración de la biblioteca de la Universidad Popular Autónoma de Puebla.

## 🎯 Características

- **Dashboard**: Panel de control con estadísticas en tiempo real
- **Gestión de Libros**: CRUD completo para administrar el catálogo
- **Gestión de Usuarios**: Administración de usuarios y permisos
- **Préstamos**: Control de préstamos y devoluciones
- **Reportes**: Análisis e informes de la biblioteca
- **Interfaz Moderna**: Diseño responsivo y profesional

## 📁 Estructura de Componentes

### Componentes Principales

#### `Navbar.tsx`
Navegación lateral con menú desplegable.
- Menú colapsable en dispositivos móviles
- Indicador de sección activa
- Información del usuario

#### `Dashboard.tsx`
Panel principal con:
- Tarjetas de estadísticas (StatsCard)
- Actividad reciente
- Acciones rápidas

#### `BooksTable.tsx`
Tabla completa para gestión de libros:
- Visualización de datos
- Acciones de editar/eliminar
- Indicadores de estado

### Componentes Reutilizables

#### `Card.tsx`
Contenedor genérico para contenido:
- Variantes: default, highlighted, minimal
- Header y footer opcionales
- Click handler personalizable

#### `Button.tsx`
Botón versátil y accesible:
- Variantes: primary, secondary, danger, success, ghost
- Tamaños: small, medium, large
- Estado de carga

#### `StatsCard.tsx`
Tarjeta para mostrar estadísticas:
- Código de color por tipo
- Icono y valor
- Efecto hover interactivo

#### `Modal.tsx`
Modal reutilizable para formularios:
- Campos configurables
- Validación básica
- Estilos profesionales

#### `Alert.tsx`
Componentes de alerta/notificación:
- Tipos: success, error, warning, info
- Auto-cierre opcional
- Animación suave

## 🎨 Paleta de Colores

- **Primario**: `#265cf2` a `#0026fd` (Gradiente azul)
- **Éxito**: `#10b981`
- **Peligro**: `#ef4444`
- **Advertencia**: `#f59e0b`
- **Info**: `#3b82f6`

## 📱 Responsividad

La aplicación es completamente responsiva:
- Desktop: Navegación lateral completa
- Tablet: Menú colapsable
- Móvil: Menú oculto por defecto

## 🚀 Uso Rápido

### Instalación
\`\`\`bash
npm install
\`\`\

### Desarrollo
\`\`\`bash
npm run dev
\`\`\`

### Build
\`\`\`bash
npm run build
\`\`\`

## 📝 Ejemplos de Uso

### Importar Componente Card
\`\`\`tsx
import Card from './components/Card';

<Card title="Mi Tarjeta" icon="📚">
  Contenido aquí
</Card>
\`\`\`

### Importar Botón
\`\`\`tsx
import Button from './components/Button';

<Button variant="primary" size="medium" onClick={() => {}}>
  Guardar
</Button>
\`\`\`

### Usar Modal
\`\`\`tsx
import Modal from './components/Modal';

<Modal
  isOpen={isOpen}
  title="Nuevo Libro"
  fields={[
    { name: 'titulo', label: 'Título', type: 'text', required: true }
  ]}
  onSubmit={handleSubmit}
  onClose={closeModal}
/>
\`\`\`

## 🛠️ Tecnologías

- React 19.2.0
- TypeScript
- Vite
- CSS3 (Sin frameworks CSS externos)

## 📚 Documentación Adicional

Consulta los archivos CSS individuales para información sobre estilos y personalizaciones.

## ✨ Próximas Mejoras

- [ ] Integración con API backend
- [ ] Autenticación y autorización
- [ ] Sistema de búsqueda avanzada
- [ ] Exportación de reportes (PDF, Excel)
- [ ] Notificaciones en tiempo real
- [ ] Modo oscuro
- [ ] Internacionalización (i18n)

## 📞 Créditos

Desarrollado por: Yovani, Baldemar y JoseManuel

## 📄 Licencia

© 2025 Biblioteca UPP. Todos los derechos reservados.
