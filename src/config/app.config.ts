export default () => ({
    appName: process.env.APP_NAME || 'NestJS',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefresh: process.env.JWT_REFRESH,
    mode: process.env.MODE || 'dev',
    cloudinaryName: process.env.CLOUDINARY_NAME,
    cloudinaryApiKey: process.env.CLOUDINARY_API_KEY,
    cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET,
})