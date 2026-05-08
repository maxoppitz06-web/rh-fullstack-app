# RH Fullstack App

Aplicación full stack de gestión de empleados desarrollada con React, Django REST Framework y MySQL.

## Tecnologías utilizadas

### Frontend
- React
- Vite
- Axios
- Bootstrap

### Backend
- Python
- Django
- Django REST Framework
- PyMySQL
- django-cors-headers

### Base de datos
- MySQL

## Funcionalidades

- Listar empleados
- Crear empleados
- Editar empleados
- Eliminar empleados
- Buscar empleados por nombre o departamento
- Conexión frontend-backend mediante API REST

## Estructura del proyecto

```text
rh-fullstack-app/
├── backend/
└── frontend/
```

## API principal

```text
http://localhost:8080/api/empleados
```

## Ejecución del backend

```bash
cd backend
source .venv/bin/activate
python manage.py runserver 8080
```

## Ejecución del frontend

```bash
cd frontend
npm install
npm run dev
```

## Autor

Max Oppitz