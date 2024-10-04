import mongoose from "mongoose"


const userSchema = mongoose.Schema({
  fullname:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true
  },
  password:{
    type:String,
    required:true
  },
  orders:[
    {
        type:mongoose.Schema.Types.ObjectId,
        required:"Order"
    }
  ],
  wishList:[
     {
        type:mongoose.Schema.Types.ObjectId,
        ref:"wishList"
     }
    ],
    isAdmin:{
        type:Boolean,
        default:false
    },
    hasShippingAddress:{
        type:Boolean,
        default:false
    },
    shippingAddress:{
        firstName:{
            type:String
        },
        lastName:{
            type:String
        },
        address:{
            type:String
        },
        city:{
            type:String
        },
        postalCode:{
            type:String
        },
        country:{
            type:String 
        },
        phone:{
            type:String
        }
    }
},{
    timestamps:true
})


const User = mongoose.model("User",userSchema)

export default User