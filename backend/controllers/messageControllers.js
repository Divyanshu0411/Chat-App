const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");
const User = require("../models/userModel");
const Chat = require("../models/chatModel");

const allMessages = asyncHandler(async (req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name pic email")
            .populate("chat");
        res.json(messages);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});

// Removed the execPopulate() calls.
// After creating the message, we use Message.findById() to fetch the newly created message and populate it in one step.
// The User.populate() call remains the same as it doesn't use execPopulate().


const sendMessage = asyncHandler(async (req, res, next) => {
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.status(400).json({ message: "Invalid data passed into request" });
    }

    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        let message = await Message.create(newMessage);

        message = await Message.findById(message._id)
            .populate("sender", "name pic")
            .populate("chat");

        message = await User.populate(message, {
            path: "chat.users",
            select: "name pic email",
        });

        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.json(message);
    } catch (error) {
        next(error);
    }
});

module.exports = { allMessages, sendMessage };
