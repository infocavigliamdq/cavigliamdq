/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'http', hostname: 'localhost' },
            { protocol: 'https', hostname: 'res.cloudinary.com' },
            { protocol: 'https', hostname: 'caviglia.vercel.app' },
            { protocol: 'https', hostname: 'caviglia.com' }
        ],
        unoptimized: true
    },
    compress: true,
};

export default nextConfig;
