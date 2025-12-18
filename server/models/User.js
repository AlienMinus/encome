import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    passwords: {
      type: [String],
      required: true,
    },
    role: {
      type: String,
      required: true,
      default: 'customer',
      enum: ['customer', 'admin'] // Ensures only these two roles can be assigned
    },
  },
  { timestamps: true }
);

// Define a virtual property to get the current password
userSchema.virtual('currentPassword').get(function() {
  return this.passwords[this.passwords.length - 1];
});

export default mongoose.model("User", userSchema);
