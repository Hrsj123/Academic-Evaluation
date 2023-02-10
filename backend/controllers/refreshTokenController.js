const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();


const handleRefreshToken = async (req, res) => {
    const cookies = req.cookies; 
    if (!cookies?.jwt) return res.sendStatus(401);  

    const refreshToken = cookies.jwt;                                      
    res.clearCookie('jwt', { httpOnly: true, SameSite: 'None', secure: true });     // Delete old refresh token <-- We will send back a new one
    
    // Check if user exists in DB
    const foundUser = await User.findOne({ refreshToken: refreshToken }).exec();                 // refreshToken --> An array
    // Detected refresh token reuse:    (If we get no user with the client-side refreshToken --> It's already been used so it's deleted!)
    if (!foundUser) { // (Hacked or Expired refresh Token)
        jwt.verify(
            refreshToken, 
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => { 
                if (err) return res.sendStatus(403);     // Expired token   -> Forbidden (As soon as the token is expired: If is deleted from the users db!)
                // ⚠⚠⚠ if (!err) --> Someone is illegally attempting to use a refresh token, which would be valid if we did not invalidated it!!!
                const hackedUser = await User.findOne({ username: decoded.username }).exec();
                hackedUser.refreshToken = [];           // Remove all the refresh tokens!!!        
                const result = await hackedUser.save();
                console.log(result); 
            }   // Since refreshToken is set to empty array ---> User has to login again when their access token is expired!
        ); 
        return res.sendStatus(403);  // Forbidden!
    }
    
    const newRefreshTokenArray = foundUser.refreshToken.filter(rt => rt !== refreshToken);

    // Evaluare jwt
    jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET,
        async (err, decoded) => {
            if (err) {          // If old refresh (recieved) token is expired! ---> So we will not issue new ewfresh token!
                foundUser.refreshToken = [...newRefreshTokenArray];
                const result = await foundUser.save();
            } 
            if (err || foundUser.username !== decoded.username) return res.sendStatus(403);
            
            // Refresh token was still valid
            const roles = foundUser.roles;
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
            
            // Creating new refresh token
            const newRefreshToken = jwt.sign(   
                { "username": foundUser.username },
                process.env.REFRESH_TOKEN_SECRET,
                { expiresIn: '1d' }
            );
            // Save refresh token in DB (So we can invalidate the refresh token If the current user desides to log out!)
            foundUser.refreshToken = [...newRefreshTokenArray, newRefreshToken];
            const result = await foundUser.save();
            console.log(result);
            
            // Setting new refresh token cookie!
            res.cookie('jwt', newRefreshToken, { httpOnly: true, SameSite: 'None', /*secure: true,*/ maxAge: 24*60*60*1000 });  // secure: true ---
            
            res.json({ roles, accessToken });
        }
    )
}

module.exports = { handleRefreshToken } 