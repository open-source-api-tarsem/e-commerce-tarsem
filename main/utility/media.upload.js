const multer = require("multer")


class mediaUpload{
    constructor(destination,fileName,singleFileName, multiMediaObject){
        this.destination = destination,
        this.fileName = fileName,
        this.singleFileName = singleFileName,
        this.multiMediaObject = multiMediaObject
    }

    mediaupload = ()=>{
        if(this.singleFileName.single){
            return multer({storage : multer.diskStorage({
                destination : (req, file, cb)=>{
                    cb(null, this.destination)
                }
                ,
                filename : (req, file, cb)=>{
                    cb(null, this.fileName)
                }
            })}).single(this.singleFileName.field)
        } else if(this.multiMediaObject.multi){
            console.log(this.multiMediaObject.fieldOBJ)
            return multer({storage : multer.diskStorage({
                destination : (req, file, cb)=>{
                    cb(null, this.destination)
                }
                ,
                filename : (req, file, cb)=>{
                    cb(null, `${file.originalname.split(".")[0]}-${this.fileName}`)
                }
            })}).fields(this.multiMediaObject.fieldOBJ)
        }
    }
}


module.exports = mediaUpload

