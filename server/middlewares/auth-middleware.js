import tokenService from '../service/token-service.js'

export default function (req, res, next) {
    try {
        const accessToken = req.headers.authorization
        if (!accessToken) {
            return next(res.status(500).json({ message: 'Create error1' }))
        }
        const userData = tokenService.validateAccessToken(accessToken)
        
        if (!userData) {
            return next(res.status(500).json({ message: 'Create error2' }))
        }
        req.user = userData
        next()
    } catch (e) {
        return next(res.status(500).json({ message: 'Create error (catch)' }))
    }
}





