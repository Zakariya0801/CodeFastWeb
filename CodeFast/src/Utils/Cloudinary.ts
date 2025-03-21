import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

    // Configuration
    
    export const uploadImage = async (file: any) => {
        const formData = new FormData();
        console.log("FILE - ", file)
        console.log("FILE TYPE:", file instanceof File);
        formData.append("file", file);
        formData.append(
            "upload_preset",
            "uploadcodefast"
            );
            console.log("FORMDATA", formData)
  
        // Upload to Cloudinary with the complete FormData
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/dlljlngto/image/upload`,
          formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        console.log("CLOUDINARY RESPONSE", cloudinaryResponse)
  
        if (!cloudinaryResponse.data.secure_url) {
            console.log("NOOOOOO")
          throw new Error("Failed to get secure URL from Cloudinary");
        }
        return  cloudinaryResponse.data.secure_url;
    }
