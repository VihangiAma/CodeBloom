
import mongoose from "mongoose";

const revenueReportSchema = mongoose.Schema({
    SectionId: {
        type: String,
        required: true,
        unique: true,
      },
      SectionName: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },
});
const revenueReport = mongoose.model("revenueReportsNew",revenueReportSchema );
export default revenueReport;