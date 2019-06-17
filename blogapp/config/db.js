if (process.env.NODE_ENV == 'production') {
    module.exports = { mongoURI: 'mongodb://<hiagofss>:<GAME98over>@ds127899.mlab.com:27899/blogapp_prod'}
} else {
    module.exports = { mongoURI: 'mongodb://localhost/blogapp'}
}