import React from 'react';
import './Dashboard.css';
import StatsCard from './StatsCard';

interface DashboardStats {
  libros_totales: number;
  prestamos_activos: number;
  usuarios: number;
  devoluciones_pendientes: number;
}

const Dashboard: React.FC = () => {
  const stats: DashboardStats = {
    libros_totales: 1250,
    prestamos_activos: 45,
    usuarios: 320,
    devoluciones_pendientes: 12,
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Panel de Control</h1>
        <p>Bienvenido al administrador de la Biblioteca UPP</p>
      </div>

      <div className="stats-grid">
        <StatsCard
          title="Libros Totales"
          value={stats.libros_totales}
          icon="📚"
          color="blue"
        />
        <StatsCard
          title="Préstamos Activos"
          value={stats.prestamos_activos}
          icon="📋"
          color="green"
        />
        <StatsCard
          title="Usuarios"
          value={stats.usuarios}
          icon="👥"
          color="purple"
        />
        <StatsCard
          title="Devoluciones Pendientes"
          value={stats.devoluciones_pendientes}
          icon="⚠️"
          color="red"
        />
      </div>

      <div className="dashboard-content">
        <div className="recent-activity">
          <h2>Actividad Reciente</h2>
          <div className="activity-list">
            <div className="activity-item">
              <span className="activity-icon">➕</span>
              <div>
                <p className="activity-title">Nuevo libro agregado</p>
                <p className="activity-time">Hace 2 horas</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">📌</span>
              <div>
                <p className="activity-title">Préstamo completado</p>
                <p className="activity-time">Hace 5 horas</p>
              </div>
            </div>
            <div className="activity-item">
              <span className="activity-icon">✅</span>
              <div>
                <p className="activity-title">Devolución registrada</p>
                <p className="activity-time">Hace 1 día</p>
              </div>
            </div>
          </div>
        </div>

        <div className="quick-actions">
          <h2>Acciones Rápidas</h2>
          <div className="actions-grid">
            <button className="action-btn primary">
              ➕ Agregar Libro
            </button>
            <button className="action-btn secondary">
              📝 Nuevo Préstamo
            </button>
            <button className="action-btn secondary">
              👤 Nuevo Usuario
            </button>
            <button className="action-btn secondary">
              📊 Ver Reportes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
