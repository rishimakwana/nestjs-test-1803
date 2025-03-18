module.exports = {
    apps: [
        {
            name: 'ECOM',
            script: 'dist/main.js',
            interpreter: 'ts-node',
            instances: 1,
            autorestart: true,
            watch: true,
            max_memory_restart: '1G',
            env: {
                NODE_ENV: 'dev',
            },
            env_staging: {
                NODE_ENV: 'staging',
            },
            env_production: {
                NODE_ENV: 'production'
            },
        },
    ],
};
