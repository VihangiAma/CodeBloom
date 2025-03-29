import mongoose from "mongoose";
const StockreportSchema = mongoose.Schema({
    itemId :{
        type: String,
        required: true,
        unique: true
    },
    itemName :{
        type :String,
        required :true,
    },
    Stock:{
        type :String,
        required :true
    },
    OutOfStock :{
        type :String,
        required :true
    },
    Remaining_Stock :{
        type :String,
        required :true
    }
})

const StockReport = mongoose.model('StockReter',StockreportSchema)
export default StockReport;