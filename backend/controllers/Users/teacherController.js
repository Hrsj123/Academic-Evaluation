const bcrypt = require('bcrypt');
const Teacher = require('../../models/User');

// GET
const getTeachers = async (req, res) => {
    const teachers = await Teacher.find({ roles: 2345 }).select('firstName lastName username -_id');
    return res.send(teachers);
}

// POST     ----> Should be a protected route (Added by admin only)
const handleNewTeacher = async (req, res) => {
    console.log(req.body);
    const { firstName, lastName, password, email, phoneNo } = req.body;
    // Validation
    if (!firstName || !lastName || !password) return res.status(400).json({ 'message': 'firstName, lastName and password are required!' });
    
    // Validation: Check for duplicate username in db
    const duplicate = await Teacher.findOne({ firstName: firstName, lastName: lastName }).exec();     
    if (duplicate) return res.sendStatus(409);

    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);           // 10: Salt rounds

        // Create the new teacher
        const teacher = await Teacher.create({
            firstName: firstName,
            lastName: lastName,
            roles: [2345],
            email: email,
            phoneNo: phoneNo,
            password: hashedPwd
        });
        console.log('-----------------\n', teacher, '\n-----------------');

        return res.status(201).json({ 'message': `New user created : ${firstName} ${lastName}` });
    } catch (error) {
        return res.status(500).json({ 'message': error.message })
    } 

}

// PUT
const updateTeacher = (req, res) => {

}

// DELETE
const removeTeacher = (req, res) => {

}

module.exports = { 
    getTeachers, 
    handleNewTeacher,
    updateTeacher, 
    removeTeacher
}