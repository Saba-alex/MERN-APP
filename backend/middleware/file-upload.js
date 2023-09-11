const multer = require("multer");
const uuid = require("uuid").v1;

const MIME_TYPE_MAP = {
  //valid extention
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};

const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null,'uploads/images');//file of storing data or path
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype]; //give the extention we wanna use 
      cb(null, uuid() + "." + ext);//callback
    },
  }),
  fileFilter:(req, file, cb) =>{
    const isValid = !!MIME_TYPE_MAP[file.mimetype];//(the 2 !! mean convert null or undefined and the valid findings into true)
    let error = isValid ? null : new Error('Invalid mime type');
    cb(error,isValid)//sec arg is boolean to accept or reject
  }
});

module.exports = fileUpload;
