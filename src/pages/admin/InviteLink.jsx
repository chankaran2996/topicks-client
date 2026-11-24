import { useState } from 'react';
import { FiCheck, FiCopy } from 'react-icons/fi';

// Shows the result of an invite. When email isn't configured, the admin gets the link to share by hand.
export default function InviteLink({ invite, email, onClose }) {
  const [copied, setCopied] = useState(false);
  if (!invite) return null;

  if (invite.emailed) {
    return (
      <div className="auth-notice admin-invite">
        Set-password link emailed to <b>{email}</b> (valid {invite.expiresInHours} hours).{' '}
        <button type="button" className="auth-link" onClick={onClose}>Dismiss</button>
      </div>
    );
  }

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(invite.link);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  };

  return (
    <div className="admin-alert admin-invite">
      <div>
        <p>
          Email isn’t set up, so send this set-password link to <b>{email}</b> yourself (WhatsApp works).
          It’s valid for {invite.expiresInHours} hours and works once.
        </p>
        <div className="admin-invite__row">
          <input readOnly value={invite.link} onFocus={(e) => e.target.select()} aria-label="Set-password link" />
          <button type="button" className="btn btn--red btn--sm" onClick={copy}>
            {copied ? <><FiCheck /> Copied</> : <><FiCopy /> Copy</>}
          </button>
        </div>
        <button type="button" className="auth-link" onClick={onClose}>Done</button>
      </div>
    </div>
  );
}
