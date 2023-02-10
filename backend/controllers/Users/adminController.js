const bcrypt = require('bcrypt');
const Admin = require('../../models/User');

// GET
const getAdmins = async (req, res) => {
    const teachers = await Admin.find({ roles: 1234 }).select('firstName lastName username -_id');
    return res.send(teachers);
}

// POST     ----> Should be a protected route (Added by admin only)
const handleNewAdmin = async (req, res) => {
    const { firstName, lastName, password, email, phoneNo } = req.body;
    
    // Validation
    if (!firstName || !lastName || !password) return res.status(400).json({ 'message': 'firstName, lastName and password are required!' });
    
    // Validation: Check for duplicate username in db
    const duplicate = await Admin.findOne({ firstName: firstName, lastName: lastName }).exec();     
    if (duplicate) return res.sendStatus(409);

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);           // 10: Salt rounds

        // Create the new teacher
        const admin = await Admin.create({
            firstName: firstName,
            lastName: lastName,
            roles: [1234],
            email: email,
            phoneNo: phoneNo,
            password: hashedPwd
        });
        console.log('-----------------\n', admin, '\n-----------------');

        return res.status(201).json({ 'message': `New admin created : ${firstName} ${lastName}` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    } 

}

// PUT
const updateAdmin = (req, res) => {

}

// DELETE
const removeAdmin = (req, res) => {

}

module.exports = { 
    getAdmins,
    handleNewAdmin,
    updateAdmin,
    removeAdmin
}