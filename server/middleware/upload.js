// import multer from "multer";

// // Multer storage configuration
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images"); // Save files in 'images' directory
//   },
//   filename: (req, file, cb) => {
//     cb(null, Date.now() + "-" + file.originalname); // Unique filenames
//   },
// });

// const upload = multer({ storage: storage });
// export default upload;
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import multer from "multer";

// Cloudinary configuration
cloudinary.config({
  cloud_name: "dbcygr0pi",
  api_key: "385875383263773",
  api_secret: "W_CxI96dDTcXmDMWlcafVW8iTmY",
});

// Cloudinary storage setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "products", // Folder in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png"], // Allow only specific file types
    public_id: (req, file) => Date.now() + "-" + file.originalname, // Unique filenames
  },
});

const upload = multer({ storage });
export default upload;
