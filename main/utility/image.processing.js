const sharp = require("sharp")


class imageProcessing{
    async processImages(input, output, scale, gray, tint, rotate, blur, sharpen, flip, flop, text){

        let final =  sharp(input)

        if(scale.scale){
            final.resize(scale.height, scale.width, {fit : scale.fit,}).toFile(output)
        }

        if(gray.gray){
            final.grayscale().toFile(output)
        }
        if(tint.tint){
            // await sharp(input).resize(height,width, {fit : fitting}).tint({r: 255, g: 0, b: 0}).toFile(output)
            await final.tint({r: tint.R, g: tint.G, b: tint.B}).toFile(output)
            
        }
        if(rotate.rotate){
            // await sharp(input).resize(height,width, {fit : fitting}).rotate(rotate.angle).toFile(output)
            await final.rotate(rotate.angle).toFile(output)
        }
        if(blur.blur){
            // await sharp(input).resize(height,width, {fit : fitting}).blur(blur.level).toFile(output)
            await final.blur(blur.level).toFile(output)
        }
        if(sharpen.sharpen){
            // await sharp(input).resize(height,width, {fit : fitting}).sharpen(sharpen.level).toFile(output)
            await final.sharpen(sharpen.level).toFile(output)
        }
        if(flip.flip){
            // await sharp(input).resize(height,width, {fit : fitting}).flip().toFile(output)
            await final.flip().toFile(output)
        }
        if(flop.flop){
            // await sharp(input).resize(height,width, {fit : fitting}).flop().toFile(output)
            await final.flop().toFile(output)
        }
        if(text.text){
            await final.metadata()
            console.log(await final.metadata())
        }
    }

}
// 

const imageProcessingOBJ = new imageProcessing()

module.exports = imageProcessingOBJ
