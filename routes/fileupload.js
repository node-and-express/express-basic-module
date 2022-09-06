const express=require('express');
const router=express.Router();
const fs=require('fs');
const multer=require('multer');
const upload = multer({ dest: 'public/uploads/' });

router.get('/',(req,res)=>{
    res.render('fileupload');
});

router.post('/',upload.single('image'),(req,res,next)=>{
    console.log(req.file);
    const newPath=`public/uploads/${Date.now()}${req.file.originalname}`;
    fs.rename(req.file.path,newPath,()=>{
        res.json('File Uploaded Successfully');
    });
});


module.exports=router;