import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) return createError(401, 'Unautherized')

    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) return createError(403, 'Token is not valid')

        req.user = user
        next()
    })
}