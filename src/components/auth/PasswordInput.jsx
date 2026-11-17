import { useState } from 'react';
import { FiEye, FiEyeOff, FiLock } from 'react-icons/fi';

export default function PasswordInput({ label, name, value, onChange, autoComplete = 'current-password', autoFocus }) {
  const [show, setShow] = useState(false);
  return (
    <label className="auth-field">
      <span>{label}</span>
      <div className="auth-input">
        <FiLock aria-hidden />
        <input type={show ? 'text' : 'password'} name={name} autoComplete={autoComplete} value={value} onChange={onChange} required autoFocus={autoFocus} />
        <button type="button" className="auth-input__toggle" onClick={() => setShow((s) => !s)} aria-label={show ? 'Hide password' : 'Show password'}>
          {show ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
    </label>
  );
}
