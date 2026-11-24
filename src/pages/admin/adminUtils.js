export const formatDate = (value) =>
  value ? new Date(value).toLocaleString('en-IN', { day: 'numeric', month: 'short', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—';

export const statusOf = (u) => {
  if (!u.isActive) return { label: 'Deactivated', cls: 'off' };
  if (!u.hasPassword) return { label: 'Invite pending', cls: 'pending' };
  return { label: 'Active', cls: 'on' };
};
