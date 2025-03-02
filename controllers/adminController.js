import adminModel from '../models/admin.model.js'
import jwt from 'jsonwebtoken';

export const adminCredentials = () => async (req, res) => {
    try {
        const user = await adminModel.findById(req.user.id);
        if (!user) return res.status(404).json({ message: "User not found" });
        res.json({ message: "Welcome to the dashboard", user });
    } catch (error) {
        console.log('Error in admin controller', error);
    }
};

export const adminLogin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await adminModel.findOne({username});
        if(!admin) {
            return res.status(404).json({
                message: 'No admin Found!',
                status: false
            })
        }
        const token = jwt.sign({ id: admin._id, email: admin.email }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1hr",
        });
        if(password === admin.password) {
            res.status(201).json({
                success: true,
                message: "Login Successful",
                token
            })
        } else{
            return res.status(404).json({
                message: 'Invalid Credentials',
                status: false
            })
        }
    } catch (error) {
        console.log("Error in login", error);
        res.status(500).json({
            success: false,
            message: "Error in login",
            error
        })
    }
}