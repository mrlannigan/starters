const path = require('path');
const WORKSPACE_PATH = process.env.WORKSPACE_PATH || path.resolve(__dirname, '..');
const DEFAULT_ENV = {
    NODE_ENV: 'development'
};

module.exports = {
    apps: [
        {
            name: 'ui',
            cwd: path.join(WORKSPACE_PATH, 'ui-looking-glass'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'run scripts/start.js',
            instances: 1,
            autorestart: false,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PREVENT_BROWSER: 'on'
            }
        },
        {
            name: 'api',
            cwd: path.join(WORKSPACE_PATH, 'api-looking-glass'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start:watch',
            instances: 1,
            autorestart: false,
            watch: false,
            max_memory_restart: '1G',
            env: DEFAULT_ENV
        },
        {
            name: 'unicornmock',
            cwd: path.join(WORKSPACE_PATH, 'api-looking-glass/.docker/mocks/service-unicorn'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start',
            instances: 1,
            autorestart: false,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: 3011
            }
        },
        {
            name: 'ml-data',
            cwd: path.join(WORKSPACE_PATH, 'service-ml-data'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start:watch',
            instances: 1,
            autorestart: false,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: '3009'
            }
        },
        {
            name: 'login',
            cwd: path.join(WORKSPACE_PATH, 'service-login'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: '3002'
            }
        },
        {
            name: 'email',
            cwd: path.join(WORKSPACE_PATH, 'service-email'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: '3005'
            }
        },
        {
            name: 'pdf',
            cwd: path.join(WORKSPACE_PATH, 'service-pdf'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: '3007',
                EXPORT_SERVER_PATH: 'http://localhost:7801'
            }
        },
        {
            name: 'annotations',
            cwd: path.join(WORKSPACE_PATH, 'service-annotations'),
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'nvmrun.sh'),
            args: 'exec npm run start',
            instances: 1,
            autorestart: true,
            watch: false,
            max_memory_restart: '1G',
            env: {
                ...DEFAULT_ENV,
                PORT: '3012',
            }
        },
        {
            name: 'postgres',
            cwd: '/usr/local/var/postgres',
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'bashrun.sh'),
            args: 'postgres -D /usr/local/var/postgres',
            instances: 1,
            max_memory_restart: '1G',
            autorestart: true,
        },
        {
            name: 'redis',
            cwd: '/tmp',
            interpreter: '/bin/bash',
            script: path.join(__dirname, 'bashrun.sh'),
            args: '/usr/local/bin/redis-server',
            instances: 1,
            max_memory_restart: '1G',
            autorestart: true,
        },
    ],
};