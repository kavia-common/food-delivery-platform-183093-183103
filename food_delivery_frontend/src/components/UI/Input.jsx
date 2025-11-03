import React from 'react';

// PUBLIC_INTERFACE
export default function Input({ label, hint, id, ...props }) {
  /** Accessible input with label and optional hint */
  const inputId = id || props.name || `input-${Math.random().toString(36).slice(2)}`;
  return (
    <div style={{ display: 'grid', gap: 6 }}>
      {label && <label htmlFor={inputId} style={{ fontSize: 14, fontWeight: 600 }}>{label}</label>}
      <input id={inputId} className="input" {...props} />
      {hint && <span style={{ color: 'var(--color-text-muted)', fontSize: 12 }}>{hint}</span>}
    </div>
  );
}
