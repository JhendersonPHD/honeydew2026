module.exports = {
  apps: [{
    name: 'honeydew-frontend',
    script: 'npx',
    args: 'serve dist -l 8019',
    cwd: '/home/jonathon/VexPivot/projects/honeydew2026/frontend',
    instances: 1,
    autorestart: true,
    watch: false,
    max_memory_restart: '500M'
  }]
};
