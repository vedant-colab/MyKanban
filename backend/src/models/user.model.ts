import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    role : "admin" | "user";
    comparePassword: (candidatePassword: string) => Promise<boolean>;
}

const userSchema = new Schema<IUser>(
    {
        name: {
            type: String,
            required: [true, "Name is required"],
        },
        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: [true, "Password is required"],
            minlength: 6,
        },
        role: {
            type: String,
            enum: ["admin", "user"],
            default: "user",
          },
    },
    {
        timestamps: true,
    }
);

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});


// Compare password method
userSchema.methods.comparePassword = async function (
    candidatePassword: string
) {
    // console.log(candidatePassword)
    console.log(this.password)
    return await bcrypt.compare(candidatePassword, this.password);
};

const User = model<IUser>("User", userSchema);
export default User;