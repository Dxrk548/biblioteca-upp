import React from 'react';
import './Card.css';

interface CardProps {
  title?: string;
  children: React.ReactNode;
  icon?: string;
  footer?: React.ReactNode;
  onClick?: () => void;
  variant?: 'default' | 'highlighted' | 'minimal';
}

const Card: React.FC<CardProps> = ({
  title,
  children,
  icon,
  footer,
  onClick,
  variant = 'default',
}) => {
  return (
    <div className={`card card-${variant}`} onClick={onClick}>
      {(title || icon) && (
        <div className="card-header">
          {icon && <span className="card-icon">{icon}</span>}
          {title && <h3 className="card-title">{title}</h3>}
        </div>
      )}
      <div className="card-content">{children}</div>
      {footer && <div className="card-footer">{footer}</div>}
    </div>
  );
};

export default Card;
