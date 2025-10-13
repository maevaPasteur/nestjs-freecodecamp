export default () => ({
    appName: process.env.APP_NAME || 'NestJS',
    port: process.env.PORT || 3000,
})