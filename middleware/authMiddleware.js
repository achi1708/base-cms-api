const jwt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    const authorization = req.get('authorization')
    let token = ''

    if (authorization && authorization.toLowerCase().startsWith('bearer')) {
        token = authorization.substring(7)
    }else{
        return res.status(401).json({
            error: 'Token invalid'
        })
    }

    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)

        if (!token || !decodedToken.id) {
            return res.status(401).json({ error: 'token missing or invalid' })
        }

        const { id: userId } = decodedToken
        req.userId = userId
        
        next()
    } catch (error) {
        next(error)
    }
}