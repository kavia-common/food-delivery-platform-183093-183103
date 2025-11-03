import React, { useContext, useEffect, useMemo, useState } from 'react';
import './styles/global.css';
import Header from './components/Layout/Header.jsx';
import Footer from './components/Layout/Footer.jsx';
import CartSidebar from './components/Layout/CartSidebar.jsx';
import Button from './components/UI/Button.jsx';
import Card from './components/UI/Card.jsx';
import Input from './components/UI/Input.jsx';
import ProtectedRoute from './routes/ProtectedRoute.jsx';
import { AuthContext, AuthProvider } from './context/AuthContext.jsx';
import { bindAuthRuntime } from './utils/authRuntime';

// Tiny in-file page components to keep logic simple and avoid extra deps/router
function HomePage() {
  return (
    <div className="u-container" style={{ display: 'grid', gap: 20 }}>
      <section className="u-gradient-soft" style={{ borderRadius: 16, border: '1px solid var(--color-border)', padding: '28px 20px' }}>
        <h1 style={{ margin: 0, fontSize: 28 }}>Discover great food near you</h1>
        <p style={{ marginTop: 8, color: 'var(--color-text-muted)' }}>
          Browse restaurants, explore menus, and get your favorites delivered fast.
        </p>
        <div style={{ display: 'flex', gap: 10, marginTop: 16, flexWrap: 'wrap' }}>
          <Input placeholder="Search restaurants or dishes" aria-label="Search restaurants" />
          <Button>Search</Button>
          <Button variant="success">I'm Feeling Hungry</Button>
        </div>
      </section>

      <section style={{ display: 'grid', gap: 16 }}>
        <h2 style={{ margin: 0 }}>Popular Restaurants</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 16 }}>
          {['Sushi Place', 'Pasta House', 'Taco Town', 'Burger Hub'].map((name) => (
            <Card
              key={name}
              title={name}
              subtitle="Free delivery over $20"
              footer={<a className="u-link" href="/restaurants">View menu →</a>}
            >
              <div style={{ height: 120, borderRadius: 12, background: '#f3f4f6', border: '1px solid var(--color-border)' }} />
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

function RestaurantsPage() {
  return (
    <div className="u-container" style={{ display: 'grid', gap: 20 }}>
      <h1 style={{ margin: 0 }}>Restaurants</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
        {Array.from({ length: 8 }).map((_, i) => (
          <Card
            key={i}
            title={`Restaurant ${i + 1}`}
            subtitle="Fast delivery • 4.5 ★"
            footer={<Button>View</Button>}
          >
            <div style={{ height: 120, borderRadius: 12, background: '#f3f4f6', border: '1px solid var(--color-border)' }} />
          </Card>
        ))}
      </div>
    </div>
  );
}

function LoginPage() {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!email || !password) {
      setError('Please enter email and password.');
      return;
    }
    try {
      setSubmitting(true);
      await login(email, password);
      // Redirect to returnTo if provided, else home
      const params = new URLSearchParams(window.location.search);
      const returnTo = params.get('returnTo');
      window.location.assign(returnTo || '/');
    } catch (err) {
      setError(err?.message || 'Login failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="u-container" style={{ maxWidth: 440 }}>
      <Card title="Welcome back" subtitle="Login to continue">
        <form style={{ display: 'grid', gap: 12 }} onSubmit={onSubmit} noValidate>
          <Input
            type="email"
            name="email"
            label="Email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            name="password"
            label="Password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error ? (
            <div style={{ color: 'var(--color-error)', fontSize: 14 }}>{error}</div>
          ) : null}
          <Button type="submit" disabled={submitting}>{submitting ? 'Logging in...' : 'Login'}</Button>
          <p style={{ margin: 0, fontSize: 14 }}>
            New here? <a className="u-link" href="/register">Create account</a>
          </p>
        </form>
      </Card>
    </div>
  );
}

function RegisterPage() {
  const { register } = useContext(AuthContext);
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMsg('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    try {
      setSubmitting(true);
      await register({ email, password, full_name: fullName || null });
      setSuccessMsg('Registration successful. Please log in.');
      // Redirect to login after a short delay
      setTimeout(() => {
        window.location.assign('/login');
      }, 800);
    } catch (err) {
      setError(err?.message || 'Registration failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="u-container" style={{ maxWidth: 480 }}>
      <Card title="Create your account" subtitle="Join and start ordering">
        <form style={{ display: 'grid', gap: 12 }} onSubmit={onSubmit} noValidate>
          <Input type="text" name="name" label="Full name" placeholder="Jane Doe" value={fullName} onChange={(e) => setFullName(e.target.value)} />
          <Input type="email" name="email" label="Email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} required />
          <Input type="password" name="password" label="Password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} required />
          {error ? <div style={{ color: 'var(--color-error)', fontSize: 14 }}>{error}</div> : null}
          {successMsg ? <div style={{ color: 'var(--color-success)', fontSize: 14 }}>{successMsg}</div> : null}
          <Button type="submit" variant="success" disabled={submitting}>{submitting ? 'Creating...' : 'Sign up'}</Button>
          <p style={{ margin: 0, fontSize: 14 }}>
            Already have an account? <a className="u-link" href="/login">Login</a>
          </p>
        </form>
      </Card>
    </div>
  );
}

function OrderStatusPage() {
  return (
    <div className="u-container" style={{ maxWidth: 680, display: 'grid', gap: 16 }}>
      <Card title="Order Status" subtitle="Track your delivery in real-time">
        <div className="u-surface" style={{ padding: 16, borderRadius: 12 }}>
          <div style={{ display: 'grid', gap: 8 }}>
            <div><strong>Order #</strong> 123456</div>
            <div><strong>Status:</strong> On the way 🚗</div>
            <div><strong>ETA:</strong> 18-25 mins</div>
          </div>
        </div>
        <div style={{ height: 180, borderRadius: 12, background: '#eef2ff', border: '1px solid var(--color-border)', marginTop: 12 }} />
      </Card>
    </div>
  );
}

// PUBLIC_INTERFACE
function AppInner() {
  // Light theme by default per guide
  const [theme] = useState('light');
  const auth = useContext(AuthContext);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.style.background = 'var(--color-bg)';
    document.body.style.color = 'var(--color-text)';
  }, [theme]);

  // Bind runtime for api helper access to token and base URL
  useEffect(() => {
    bindAuthRuntime({
      API_BASE: auth.API_BASE,
      token: () => auth.token,
      logout: auth.logout,
    });
  }, [auth]);

  // Minimal pathname based routing
  const path = typeof window !== 'undefined' ? window.location.pathname : '/';
  const Page = useMemo(() => {
    if (path.startsWith('/restaurants')) return RestaurantsPage;
    if (path.startsWith('/login')) return LoginPage;
    if (path.startsWith('/register')) return RegisterPage;
    if (path.startsWith('/order')) {
      // Protect order status
      return () => (
        <ProtectedRoute>
          <OrderStatusPage />
        </ProtectedRoute>
      );
    }
    return HomePage;
  }, [path]);

  return (
    <div className="app-shell">
      <Header />
      <main className="app-main">
        <Page />
      </main>
      <CartSidebar />
      <Footer />
    </div>
  );
}

// PUBLIC_INTERFACE
function App() {
  return (
    <AuthProvider>
      <AppInner />
    </AuthProvider>
  );
}

export default App;
