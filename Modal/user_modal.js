import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      // Make password optional for OAuth users
      required: function() {
        return !this.googleId; // Password is required only if googleId is not present
      },
    },
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows multiple documents without this field
    },
    MobileNumber:{
      type: String,
      sparse: true, 
    }
    ,location:{
      type:String,
      sparse:true,
    }
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);

export default User;