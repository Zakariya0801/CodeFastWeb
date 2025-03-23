const cloudinary = require('cloudinary').v2;


    // Configuration
    cloudinary.config({ 
        cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
        api_key: process.env.CLOUDINARY_API_KEY, 
        api_secret: process.env.CLOUDINARY_API_SECRET
    });
    
    const options = {
        overwrite : true,
        invalidate: true,
        resource_type: "auto"
    }

    const uploadImage = async (file) => {
        console.log("trying to upload ", file)
        try{
            const data = await cloudinary.uploader.upload_stream(file, options);
            console.log(data)
            return data.secure_url;

        }catch(error){
            console.log("error = ", error)
            return "";
        }
        
    }

    module.exports = uploadImage;
