import React, { useState } from 'react';
import './LoansTable.css';

interface Loan {
  id: number;
  usuario: string;
  libro: string;
  fecha_prestamo: string;
  fecha_devolucion_esperada: string;
  fecha_devolucion_real?: string;
  estado: 'activo' | 'devuelto' | 'atrasado';
}

const LoansTable: React.FC = () => {
  const [loans] = useState<Loan[]>([
    {
      id: 1,
      usuario: 'Juan García',
      libro: 'Clean Code',
      fecha_prestamo: '2024-11-20',
      fecha_devolucion_esperada: '2024-12-04',
      estado: 'activo',
    },
    {
      id: 2,
      usuario: 'María López',
      libro: 'The Pragmatic Programmer',
      fecha_prestamo: '2024-11-15',
      fecha_devolucion_esperada: '2024-11-29',
      fecha_devolucion_real: '2024-11-28',
      estado: 'devuelto',
    },
    {
      id: 3,
      usuario: 'Carlos Rodríguez',
      libro: 'Design Patterns',
      fecha_prestamo: '2024-11-10',
      fecha_devolucion_esperada: '2024-11-24',
      estado: 'atrasado',
    },
    {
      id: 4,
      usuario: 'Ana Martínez',
      libro: 'Clean Code',
      fecha_prestamo: '2024-11-25',
      fecha_devolucion_esperada: '2024-12-09',
      estado: 'activo',
    },
    {
      id: 5,
      usuario: 'Pedro Sánchez',
      libro: 'Refactoring',
      fecha_prestamo: '2024-11-18',
      fecha_devolucion_esperada: '2024-12-02',
      fecha_devolucion_real: '2024-11-30',
      estado: 'devuelto',
    },
  ]);

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, string> = {
      activo: '📌 Activo',
      devuelto: '✅ Devuelto',
      atrasado: '⚠️ Atrasado',
    };
    return badges[estado] || estado;
  };

  return (
    <div className="loans-table-container">
      <div className="table-header">
        <h2>Gestión de Préstamos</h2>
        <button className="btn-add">➕ Nuevo Préstamo</button>
      </div>

      <div className="table-wrapper">
        <table className="loans-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Libro</th>
              <th>Fecha Préstamo</th>
              <th>Devolución Esperada</th>
              <th>Devolución Real</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {loans.map((loan) => (
              <tr key={loan.id}>
                <td>#{loan.id}</td>
                <td className="user-cell">{loan.usuario}</td>
                <td className="book-cell">{loan.libro}</td>
                <td>{loan.fecha_prestamo}</td>
                <td>{loan.fecha_devolucion_esperada}</td>
                <td>{loan.fecha_devolucion_real || '-'}</td>
                <td>
                  <span className={`badge badge-${loan.estado}`}>
                    {getEstadoBadge(loan.estado)}
                  </span>
                </td>
                <td className="actions-cell">
                  <button className="btn-action edit" title="Editar">
                    ✏️
                  </button>
                  {loan.estado === 'activo' && (
                    <button className="btn-action return" title="Marcar como devuelto">
                      🔄
                    </button>
                  )}
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

export default LoansTable;
