import mongoose, {Schema} from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema (
    {
        userName: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            index: true
        },
        email: {
            type: String,
            required: [true, 'Email is required'],
            unique: true,
            trim: true,
        },
        password: {
            type: String,
            required: [true, 'Password is required']
        },
         
        avatar: {
            type: String,
        },
        
    },
    {
        timestamps: true,
        versionKey: false
    }
 
)

userSchema.pre('save', async function(next) {
    if(!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10)
    next();
  });

  userSchema.methods.isPasswordCorrected = async function(enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
  }

export const User= mongoose.model("User", userSchema);
