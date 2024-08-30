const nextConfig = {
    // Output the static files to somewhere more obvious
    experimental: {
        // This is experimental but can
        // be enabled to allow parallel threads
        // with nextjs automatic static generation
        workerThreads: false,
        cpus: 4
    },
    images: {
        domains: ['localhost']
    },
    distDir: 'build',
}

module.exports = nextConfig