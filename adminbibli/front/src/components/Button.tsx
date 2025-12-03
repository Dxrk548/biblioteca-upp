import React from 'react';
import './Button.css';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'ghost';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: string;
  isLoading?: boolean;
  children: React.ReactNode;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'medium',
      icon,
      isLoading = false,
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        className={`btn btn-${variant} btn-${size}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {icon && <span className="btn-icon">{icon}</span>}
        <span className="btn-text">{isLoading ? '⏳' : children}</span>
      </button>
    );
  }
);

Button.displayName = 'Button';

export default Button;
