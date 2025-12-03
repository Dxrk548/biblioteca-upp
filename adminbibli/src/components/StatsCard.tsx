import React from 'react';
import './StatsCard.css';

interface StatsCardProps {
  title: string;
  value: number;
  icon: string;
  color?: 'blue' | 'green' | 'purple' | 'red';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon, color = 'blue' }) => {
  return (
    <div className={`stats-card ${color}`}>
      <div className="stats-icon">{icon}</div>
      <div className="stats-content">
        <p className="stats-title">{title}</p>
        <p className="stats-value">{value}</p>
      </div>
    </div>
  );
};

export default StatsCard;
