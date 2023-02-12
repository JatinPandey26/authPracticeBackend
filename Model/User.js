import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

UserSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
})

UserSchema.methods.getJWTToken = async function(){
    console.log(this._id);
    return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
}

UserSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}

export const User = mongoose.model("User", UserSchema);
