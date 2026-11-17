import logoIcon from '../../assets/logo-icon.png';

// Shared frame for login / forgot-password / set-password.
export default function AuthCard({ title, subtitle, onSubmit, children }) {
  const Tag = onSubmit ? 'form' : 'div';
  return (
    <main className="auth-page">
      <Tag className="auth-card" onSubmit={onSubmit} noValidate={onSubmit ? true : undefined}>
        <img src={logoIcon} alt="Topicks" className="auth-card__logo" />
        <h1>{title}</h1>
        {subtitle && <p className="auth-card__sub">{subtitle}</p>}
        {children}
      </Tag>
    </main>
  );
}
