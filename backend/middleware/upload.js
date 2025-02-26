import multer, { diskStorage } from 'multer';
import { extname } from 'path';

// Set storage engine
const storage = diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Save files in "uploads" directory
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + extname(file.originalname)); // Rename file with timestamp
  }
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith('image/')) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed'), false);
  }
};

// Upload instance
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 } // Limit file size to 5MB
});

export default upload;
