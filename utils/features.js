import jwt from 'jsonwebtoken'

export const sendCookie = (admin, res, message, statusCode = 200) => {

    const token = jwt.sign({_id: admin._id}, process.env.JWT_SECRET_KEY);

    res.status(statusCode).cookie("token", token, {
        maxAge: 15 * 60 * 1000,
    }).json({
        success: true,
        message
    })
}