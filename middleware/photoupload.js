const multer =require("multer")

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads")
    },
    filename:(req,file,cb)=>{
        cb(null,`image-${Date.now()}.${file.originalname}`)
    }
})

const filefilter = (req,file,callback)=>{
    if(file.mimetype ==="image/png" || file.mimetype==="image/jpg" || file.mimetype === "image/jpeg"){
        callback(null,true);
    }
    else{
        callback(null,false)
        callback(new Error("images allowed only"))
    }
}

const upload = multer({
    storage:storage,
    fileFilter:filefilter
})

module.exports =upload