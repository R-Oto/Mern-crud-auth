import mongoose from "mongoose";
import Post from "../models/postsModel.js";

export const getPost = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json({ posts });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const addPost = async (req, res) => {
    const { title, body } = req.body;
    if (!title || !body) {
        return res.status(400).json({ error: "All fields are required" });
    }
    try {
        const post = await Post.create({ title, body });
        res.status(201).json({ message: "Post Created", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const deletePost = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Incorrect Id" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        await post.deleteOne();
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const updatePost = async (req, res) => {
    const { id } = req.params;
    const { title, body } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: "Incorrect Id" });
    }

    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({ error: "Post not found" });
        }

        // Update the post with the new data
        post.title = title !== undefined ? title : post.title;
        post.body = body !== undefined ? body : post.body;
        await post.save();

        res.status(200).json({ message: "Post updated", post });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
