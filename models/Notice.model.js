const mongoose = require("mongoose");

const validCategories = ["parking", "covid", "maintenance"];

const noticeSchema = new mongoose.Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    category: { type: String, enum: validCategories, required: true },
    date: { type: Number, required: true },
    userId : {type: String, required: true }
});

const NoticeModel = mongoose.model("Notice", noticeSchema);

module.exports = {
    NoticeModel
};
