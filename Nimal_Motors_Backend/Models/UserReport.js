import mongoose from "mongoose";

const UserReportSchema = mongoose.Schema({

    customerName:
     { 
        type: String,
        required: true
     },
    vehicleID: { 
        type: String,
        required: true 
    },
    serviceDate: { 
        type: Date,
        required: true
     },
    serviceTime: {
         type: String,
         required: true
    },
    description: { 
      type: String, 
      required: true,
      maxlength: 100 
    },


});
const UserReport = mongoose.model("UserReports", UserReportSchema);
export default UserReport ;