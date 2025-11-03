import React from 'react';

// PUBLIC_INTERFACE
export default function Card({ title, subtitle, children, footer, style }) {
  /** Simple card surface */
  return (
    <div className="card" style={style}>
      {title && <h3 className="card-title">{title}</h3>}
      {subtitle && <p className="card-subtitle">{subtitle}</p>}
      <div>{children}</div>
      {footer && <div style={{ marginTop: 16 }}>{footer}</div>}
    </div>
  );
}
