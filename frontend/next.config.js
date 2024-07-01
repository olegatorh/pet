/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['0.0.0.0'],
        loader: 'default',
        remotePatterns: [
            {
                protocol: 'http',
                hostname: '0.0.0.0', // Adjust if your production environment differs
                port: '8000',
                pathname: '**',
            }
        ],
    },
}

module.exports = nextConfig;
