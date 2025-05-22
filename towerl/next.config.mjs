/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    images: {
        domains: ['localhost', '192.168.0.218', 'cdn.example.com'],
    },
};

export default nextConfig;
