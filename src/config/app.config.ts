export default () => ({
    appName: process.env.APP_NAME || 'NestJS',
    port: process.env.PORT || 3000,
    jwtSecret: process.env.JWT_SECRET,
    jwtRefresh: process.env.JWT_REFRESH,
    mode: process.env.MODE || 'dev',
})