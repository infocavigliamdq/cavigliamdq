/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['localhost', 'res.cloudinary.com', 'caviglia.vercel.app','caviglia.com'],  // Agrega dominios adicionales si es necesario
        unoptimized: true
    },
    compress: true,
};

export default nextConfig;
