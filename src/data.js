// Edit these to customize your dashboard. No need to touch any component files.

export const uptimeServices = [
  { id: 1, name: 'Digitalway Helpdesk', url: 'https://digitalway-helpdesk.web.app/', status: 'up' },
  { id: 2, name: 'Digitalway NOC', url: 'https://dws-cmts-monitoring-e2cc5.web.app/', status: 'up' },
  { id: 3, name: 'solvedit.dev', url: 'https://solvedit.dev', status: 'up' },
];

// Projects are stored in localStorage so UI edits persist.
// This is the initial seed — only used the first time the app loads.
export const defaultProjects = [
  { id: 1, name: 'Digitalway NOC', status: 'Live' },
  { id: 2, name: 'Digitalway Helpdesk', status: 'In Progress' },
  { id: 3, name: 'Solved. Landing Page', status: 'Live' },
  { id: 4, name: 'Solved. Chatbot', status: 'Live' },
  { id: 5, name: 'Personal Dashboard', status: 'In Progress' },
  { id: 6, name: 'DOCSIS Config Tool', status: 'Planned' },
];

// Tasks reset every day. Edit these to change tomorrow's defaults.
export const defaultTasks = [
  { id: 1, text: 'Check NOC alerts', done: false },
  { id: 2, text: 'Review helpdesk tickets', done: false },
  { id: 3, text: 'Follow up with Brent', done: false },
];

// Homelab milestones — set done: true as you complete them.
export const milestones = [
  { id: 1, text: 'Order power adapter',              done: true  },
  { id: 2, text: 'Install Proxmox on OptiPlex 7060', done: false },
  { id: 3, text: 'Set up Pi-hole LXC container',     done: false },
  { id: 4, text: 'Set up Uptime Kuma LXC container', done: false },
  { id: 5, text: 'Set up Gitea LXC container',       done: false },
  { id: 6, text: 'Configure VLANs on GS108E switch', done: false },
  { id: 7, text: 'Deploy dashboard to Proxmox',      done: false },
  { id: 8, text: 'Set up Wireguard VPN',             done: false },
];

export const quickLinks = [
  { id: 1, name: 'Proxmox', url: 'https://192.168.1.100:8006', icon: '🖥️' },
  { id: 2, name: 'Pi-hole', url: 'http://192.168.1.101/admin', icon: '🛡️' },
  { id: 3, name: 'Uptime Kuma', url: 'http://192.168.1.103:3001', icon: '📊' },
  { id: 4, name: 'GitHub', url: 'https://github.com', icon: '🐱' },
  { id: 5, name: 'Firebase', url: 'https://console.firebase.google.com', icon: '🔥' },
  { id: 6, name: 'Cloudflare', url: 'https://dash.cloudflare.com', icon: '☁️' },
];
