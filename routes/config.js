module.exports = function (app) {
    app.use('/', require('./root'));
    app.use('/pool/user', require('./user'));
    app.use('/pool/auth', require('./auth'));
    app.use('/pool/coach', require('./coach'));
    app.use('/pool/history', require('./history'));
    app.use('/pool/file', require('./file'));
    app.use('/pool/package', require('./package'));
    app.use('/pool/event', require('./event'));
    app.use('/pool/group', require('./group'));
    app.use('/pool/race', require('./race'));
}


