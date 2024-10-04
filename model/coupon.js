import mongoose from "mongoose";

const couponSchema = mongoose.Schema({
        code: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        discount: {
          type: Number,
          required: true,
          default: 0,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
      },
      {
        timestamps: true,
        toJSON: { virtuals: true },
       }
)

couponSchema.virtual("isExpired").get(function(){
  return this.endDate<Date.now()
})

couponSchema.virtual("daysLeft").get(function(){
  const daysLeft = Math.ceil((this.endDate-Date.now())/(1000*60*60*24)) + " Days left"
  return daysLeft
})

const Coupon = mongoose.model("Coupon",couponSchema)




export default Coupon



