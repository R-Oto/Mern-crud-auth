import User from "../models/usersModel.js";
import bcryptjs from "bcryptjs";

export const registerUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.status(400).json({ error: "Email is already used!" }); // Change to 400 for user error
        }

        const salt = await bcryptjs.genSalt();
        const hashed = await bcryptjs.hash(password, salt);

        const user = await User.create({ email, password: hashed });
        res.status(201).json({ message: "User created" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Email not found" }); // Change message for clarity
        }

        const match = await bcryptjs.compare(password, user.password);
        if (!match) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        res.status(200).json({ email });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
