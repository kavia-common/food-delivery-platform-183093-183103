import React from 'react';

// PUBLIC_INTERFACE
export default function CartSidebar() {
  /** Placeholder cart sidebar, styling only */
  return (
    <aside className="app-sidebar">
      <div className="card">
        <h3 className="card-title">Your Cart</h3>
        <p className="card-subtitle">Items you add will appear here.</p>
        <button className="btn btn-primary" style={{ width: '100%' }} aria-disabled>
          Checkout
        </button>
      </div>
    </aside>
  );
}
