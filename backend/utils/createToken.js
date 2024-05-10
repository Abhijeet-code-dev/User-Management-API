import jwt from "jsonwebtoken";

//Creating a Token
const generateToken = (res,userId)=>{
    const token = jwt.sign({userId}, process.env.JWT_SECRET,{expiresIn: "30d",});

    // Setting JWT as an HTTP-Only Cookie

    res.cookie('jwt', token,{
        httpOnly: true,
        secure: process.env.NODE_ENV != 'development',
        sameSite: 'strict',
        maxAge: 30*24*60*60*1000


    })
    return token
};

export default generateToken;