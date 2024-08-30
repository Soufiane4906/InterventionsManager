import bcrypt from "bcryptjs";
import mongoose, { Schema } from "mongoose";

const customerSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    interventions: [{ type: Schema.Types.ObjectId, ref: "Intervention" }],

  },
  { timestamps: true }
);



const customer = mongoose.model("customer", customerSchema);

export default customer;
