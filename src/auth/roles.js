// Where each role lands after logging in. When you add a role on the server
// (server/config/roles.js), add its home page here and a route in App.jsx.
export const ROLE_HOME = {
  admin: '/admin',
};

export const homeForRole = (role) => ROLE_HOME[role] || '/';
