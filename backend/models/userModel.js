import mongoose from "mongoose";

// User Schema

const userSchema = mongoose.Schema({
    username:{
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
        
    },
    // isVerified:{
    //     type: Boolean,
    //     default: false
    // },
    // emailToken:{
    //     type: String,

    // },
    isAdmin:{
        type: Boolean,
        required: true,
        default: false,
    },
},
{ timestamps: true }
);

const User = mongoose.model('User',userSchema);

export default User;
