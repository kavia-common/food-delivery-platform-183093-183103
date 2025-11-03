import React from 'react';

// PUBLIC_INTERFACE
export default function Button({ variant = 'primary', className = '', ...props }) {
  /** Reusable Button using theme classes */
  const classes = ['btn'];
  if (variant === 'primary') classes.push('btn-primary');
  if (variant === 'success') classes.push('btn-success');
  if (variant === 'outline') classes.push('btn-outline');
  if (className) classes.push(className);
  return <button className={classes.join(' ')} {...props} />;
}
