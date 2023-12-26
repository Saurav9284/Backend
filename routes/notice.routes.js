const {Router} = require("express")

require("dotenv").config()

const {NoticeModel} = require("../models/Notice.model")


const noticeController = Router();


noticeController.get("/", async (req,res)=>{
    const notice = await NoticeModel.find({userId: req.body.userId})
    res.send(notice);
})



noticeController.post("/create", async (req,res)=>{
    const {title, body , category, date, userId} = req.body;
    const notice = new NoticeModel({
        title,
        body,
        category,
        date,
        userId
    })
    try {
        await notice.save();
        res.send({msg: "Notice Created!!"})
    } catch (error) {
        res.send({msg: "Something went wrong"})
        console.log(error)
    }
});


noticeController.delete("/delete/:noteId", async (req,res)=> {
    const {noteId} = req.params;
    const deleteNote = await NoticeModel.findOneAndDelete({_id: noteId, userId: req.body.userId})
    if(deleteNote){
        res.send({msg: "Deleted"})
    }
    else{
        res.send({msg: "Not deleted"})
    }
});


noticeController.patch("/edit/:noteId", async (req,res)=> {
    const {noteId} = req.params;
    const editedNote = await NoteModel.findOneAndUpdate({_id: noteId, userId: req.body.userId},{...req.body})
    if(editedNote){
        res.send({msg: "Updated"})
    }
    else{
        res.send({msg: "Not Updated"})
    }
});

module.exports = {
    noticeController
}