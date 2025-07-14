import mongoose from "mongoose";

const PackageSchema = mongoose.Schema({
    PackageName: {
        type: String,
        required: true,
    },
    PackagePrice: {
        type: Number,
        required: true,
    },
    PackageItems: {
        type: String,  // Changed from String to Array of Strings
        required: true,
    },
    PackageFeatured: {
        type: Boolean,
        default: false,
    },
   
    
});

const Package = mongoose.model("Package", PackageSchema);
export default Package;