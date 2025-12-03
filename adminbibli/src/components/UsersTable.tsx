import React, { useState } from 'react';
import './UsersTable.css';

interface User {
  id: number;
  nombre: string;
  email: string;
  carrera: string;
  estado: 'activo' | 'inactivo';
  fecha_registro: string;
}

const UsersTable: React.FC = () => {
  const [users] = useState<User[]>([
    {
      id: 1,
      nombre: 'Juan García',
      email: 'juan@upp.edu.mx',
      carrera: 'Ingeniería en Sistemas',
      estado: 'activo',
      fecha_registro: '2024-01-15',
    },
    {
      id: 2,
      nombre: 'María López',
      email: 'maria@upp.edu.mx',
      carrera: 'Administración',
      estado: 'activo',
      fecha_registro: '2024-02-20',
    },
    {
      id: 3,
      nombre: 'Carlos Rodríguez',
      email: 'carlos@upp.edu.mx',
      carrera: 'Contabilidad',
      estado: 'inactivo',
      fecha_registro: '2023-11-10',
    },
    {
      id: 4,
      nombre: 'Ana Martínez',
      email: 'ana@upp.edu.mx',
      carrera: 'Derecho',
      estado: 'activo',
      fecha_registro: '2024-03-05',
    },
    {
      id: 5,
      nombre: 'Pedro Sánchez',
      email: 'pedro@upp.edu.mx',
      carrera: 'Ingeniería Civil',
      estado: 'activo',
      fecha_registro: '2024-01-25',
    },
  ]);

  const getEstadoBadge = (estado: string) => {
    return estado === 'activo' ? '✅ Activo' : '⛔ Inactivo';
  };

  return (
    <div className="users-table-container">
      <div className="table-header">
        <h2>Gestión de Usuarios</h2>
        <button className="btn-add">➕ Agregar Usuario</button>
      </div>

      <div className="table-wrapper">
        <table className="users-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Carrera</th>
              <th>Estado</th>
              <th>Fecha de Registro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>#{user.id}</td>
                <td className="name-cell">{user.nombre}</td>
                <td className="email-cell">{user.email}</td>
                <td>{user.carrera}</td>
                <td>
                  <span className={`badge badge-${user.estado}`}>
                    {getEstadoBadge(user.estado)}
                  </span>
                </td>
                <td>{user.fecha_registro}</td>
                <td className="actions-cell">
                  <button className="btn-action edit" title="Editar">
                    ✏️
                  </button>
                  <button className="btn-action delete" title="Eliminar">
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UsersTable;
