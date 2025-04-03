import mongoose from "mongoose";

const SalesReportSchema = mongoose.Schema({
    itemId :{
        type: String,
        required: true,
        unique: true
    },
    itemName :{
        type :String,
        required :true,
    },
    price :{
        type :String,
        required :true,
    },
    net_price_for_item :{
        type :String,
        required :true,
    },
    Sales_Quntity:{
        type:Number,
        required :true,
    },
    profite :{
        type:Number,
        required :true,
    }
        

})
const SalesReport = mongoose.model("SalesReports",SalesReportSchema );
export default SalesReport;