import React, { useState } from 'react';
import './Modal.css';

interface FormData {
  [key: string]: string | number;
}

interface ModalProps {
  isOpen: boolean;
  title: string;
  fields: Array<{
    name: string;
    label: string;
    type: 'text' | 'email' | 'number' | 'textarea' | 'select';
    required?: boolean;
    options?: Array<{ value: string; label: string }>;
  }>;
  onSubmit: (data: FormData) => void;
  onClose: () => void;
  submitText?: string;
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  title,
  fields,
  onSubmit,
  onClose,
  submitText = 'Guardar',
}) => {
  const [formData, setFormData] = useState<FormData>(
    fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {})
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData(fields.reduce((acc, field) => ({ ...acc, [field.name]: '' }), {}));
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{title}</h2>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <form className="modal-form" onSubmit={handleSubmit}>
          {fields.map((field) => (
            <div key={field.name} className="form-group">
              <label htmlFor={field.name}>{field.label}</label>
              {field.type === 'textarea' ? (
                <textarea
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                  rows={4}
                />
              ) : field.type === 'select' ? (
                <select
                  id={field.name}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                >
                  <option value="">Seleccionar...</option>
                  {field.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  id={field.name}
                  type={field.type}
                  name={field.name}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required={field.required}
                />
              )}
            </div>
          ))}

          <div className="modal-footer">
            <button type="button" className="btn-cancel" onClick={onClose}>
              Cancelar
            </button>
            <button type="submit" className="btn-submit">
              {submitText}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
