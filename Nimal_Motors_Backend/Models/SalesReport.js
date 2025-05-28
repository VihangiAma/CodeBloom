import mongoose from "mongoose";

const SalesReportSchema = mongoose.Schema({
  
  date: {
    type: Date,
    default: Date.now,
  },
  Section:{
     type: String,
    default: "",

  },
   Description: {
    type: String,
    default: "",
  },
  Amount: {
    type: Number,
    required: true,
   
  },
});
const SalesReport = mongoose.model("NewSalesReports", SalesReportSchema);
export default SalesReport;
