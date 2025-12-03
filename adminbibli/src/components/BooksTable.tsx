import React, { useState } from 'react';
import './BooksTable.css';

interface Book {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  cantidad: number;
  disponibles: number;
  estado: 'disponible' | 'parcial' | 'agotado';
}

interface BooksTableProps {
  onEdit?: (book: Book) => void;
  onDelete?: (bookId: number) => void;
}

const BooksTable: React.FC<BooksTableProps> = ({ onEdit, onDelete }) => {
  const [books] = useState<Book[]>([
    {
      id: 1,
      titulo: 'Clean Code',
      autor: 'Robert C. Martin',
      isbn: '978-0132350884',
      cantidad: 5,
      disponibles: 3,
      estado: 'disponible',
    },
    {
      id: 2,
      titulo: 'The Pragmatic Programmer',
      autor: 'David Thomas',
      isbn: '978-0135957059',
      cantidad: 3,
      disponibles: 0,
      estado: 'agotado',
    },
    {
      id: 3,
      titulo: 'Design Patterns',
      autor: 'Gang of Four',
      isbn: '978-0201633610',
      cantidad: 4,
      disponibles: 2,
      estado: 'parcial',
    },
  ]);

  const getEstadoBadge = (estado: string) => {
    const badges: Record<string, string> = {
      disponible: '✅ Disponible',
      parcial: '⚠️ Parcial',
      agotado: '❌ Agotado',
    };
    return badges[estado] || estado;
  };

  return (
    <div className="books-table-container">
      <div className="table-header">
        <h2>Gestión de Libros</h2>
        <button className="btn-add">➕ Agregar Libro</button>
      </div>

      <div className="table-wrapper">
        <table className="books-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>ISBN</th>
              <th>Total</th>
              <th>Disponibles</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td className="title-cell">{book.titulo}</td>
                <td>{book.autor}</td>
                <td className="isbn-cell">{book.isbn}</td>
                <td>{book.cantidad}</td>
                <td>{book.disponibles}</td>
                <td>
                  <span className={`badge badge-${book.estado}`}>
                    {getEstadoBadge(book.estado)}
                  </span>
                </td>
                <td className="actions-cell">
                  <button
                    className="btn-action edit"
                    onClick={() => onEdit?.(book)}
                    title="Editar"
                  >
                    ✏️
                  </button>
                  <button
                    className="btn-action delete"
                    onClick={() => onDelete?.(book.id)}
                    title="Eliminar"
                  >
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

export default BooksTable;
