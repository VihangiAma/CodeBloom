import mongoose from "mongoose";

const RevenueAndExpenceSchema = mongoose.Schema({
    SectionId: {
        type: String,
        required: true,
        unique: true,
      },
      SectionName: {
        type: String,
        required: true,
      },
      profite: {
        type: Number,
        required: true,
      },
      itemId: {
        type: String,
        required: true,
        unique: true,
      },
      itemName: {
        type: String,
        required: true,
      },
      amount: {
        type: Number,
        required: true,
      },

});
const RevenueAndExpences = mongoose.model("revenueReportAndExpencenew", RevenueAndExpenceSchema);
export default RevenueAndExpences;
