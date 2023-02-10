const bcrypt = require('bcrypt');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleLogin = async (req, res) => {
    const cookies = req.cookies;
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ 'message': 'Both username and password are required!' });
    
    // Check if user exists in DB
    const foundUser = await User.findOne({ username: username, roles: req.body.roles }).exec();
    if (!foundUser) return res.sendStatus(401);  // Unauthorized!
    
    // Evaluate password
    const match = await bcrypt.compare(password, foundUser.password); 
    if (match) {
        const roles = foundUser.roles;  // An array!
        // Create JWTs
        const accessToken = jwt.sign(
            { 
                "UserInfo": { 
                    "username": foundUser.username,
                    "roles": roles
                }
            },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '20s' }
        );
        const newRefreshToken = jwt.sign(      // refresh token --> Used to get new access token (When refresh token expires -> Need to login again!)
            { "username": foundUser.username },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        const newRefreshTokenArray = 
            !cookies?.jwt                       // No jwt is present in cookies
                ? foundUser.refreshToken
                : foundUser.refreshToken.filter(rt => rt !== cookies.jwt);       // if Cookies with jwt exists (remove it!)
        
        if (cookies?.jwt) res.clearCookie('jwt', { httpOnly: true, SameSite: 'None', secure: true });   

        // Save refresh token in DB (So we can invalidate the refresh token If the current user desides to log out!)
        foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
        const result = await foundUser.save();
        // console.log(result);

        res.cookie('jwt', newRefreshToken, { httpOnly: true, SameSite: 'None', /*secure: true,*/ maxAge: 24*60*60*1000 });  // secure: true ---
        
        res.json({ accessToken });  
        
    } else {
        res.sendStatus(401);
    }

}

module.exports = { handleLogin }