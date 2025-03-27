import mongoose from "mongoose";
const userReportSchema =mongoose.Schema(
{

Report_id:{
    type: String,
    required: true,
    unique: true
},
User_id :{
           type :String,
            required :true,
},          

fullName :{
            type : String,
            required :true
        },


visitCount :{
    type :Number

},
customer_amount :{
        type :Number,
            required :true,
            
},
Discount :{
        type :Number,
            required :true,
            //unique :true
}


}


)
const UserReport = mongoose.model('Report', userReportSchema);

export default UserReport;