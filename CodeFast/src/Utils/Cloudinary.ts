import axios from 'axios';
import { v2 as cloudinary } from 'cloudinary';

    // Configuration
    
    export const uploadImage = async (file: any) => {
        
        const formData = new FormData();
        formData.append("file", file);
        formData.append(
          "upload_preset",
          import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET
        );
  
        // Upload to Cloudinary with the complete FormData
        const cloudinaryResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/${
            "Codefast"
          }/raw/upload`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
  
        if (!cloudinaryResponse.data.secure_url) {
            console.log("NOOOOOO")
          throw new Error("Failed to get secure URL from Cloudinary");
        }
        return  cloudinaryResponse.data.secure_url;
    }
