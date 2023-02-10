const bcrypt = require('bcrypt');
const Student = require('../../models/User');
const Assessment = require('../../models/Assessment');

// GET
const getStudents = async (req, res) => {
    const students = await Student.find({ roles: 3456 }).select('firstName lastName username -_id');
    return res.send(students);
}

// POST     ----> Should be a protected route (Added by a teacher or admin)
const handleNewStudent = async (req, res) => {
    const { firstName, lastName, password, email, phoneNo } = req.body;
    
    // Validation
    if (!firstName || !lastName || !password) return res.status(400).json({ 'message': 'firstName, lastname and password are required!' });
    
    // Validation: Check for duplicate username in db
    const duplicate = await Student.findOne({ firstName: firstName, lastName: lastName, roles: 3456 }).exec();     
    if (duplicate) return res.sendStatus(409);
    
    try {
        // Encrypt the password
        const hashedPwd = await bcrypt.hash(password, 10);           // 10: Salt rounds

        // Create the new student
        const student = await Student.create({
            firstName: firstName,
            lastName: lastName,
            roles: [3456],
            email: email,
            phoneNo: phoneNo,
            password: hashedPwd
        });
        console.log('-----------------\n', student, '\n-----------------');
        
        // Create a assessment card:
        const assessment = await Assessment.create({
            student: String(student._id)
        });
        console.log('-----------------\n', assessment, '\n-----------------');

        return res.status(201).json({ 'message': `New user created : ${firstName} ${lastName}` })
    } catch (error) {
        res.status(500).json({ 'message': error.message })
    } 

}

// PUT
const updateStudent = async (req, res) => {
    const { firstName, lastName, password, email, phoneNo } = req.body;     // Dont know really!!!


}

// DELETE
const removeStudent = async (req, res) => {
    // Validation 
    const { username } = req.body;
    if (!username) return res.status(400).json({ 'message': 'Username of the user should be provided!' });

    const student = await Student.findOne({ username: username }).exec();
    if (!student) return res.status(400).json({ 'message': `A student with username "${username}" does not exist!` });

    // Removing assessment
    const assessment = await Assessment.findOne({ student: student._id }).exec();
    if (assessment) {
        const result = await Assessment.deleteOne({ student: student._id });
        console.log(result);
    }

    // Removing student
    const result = await Student.deleteOne({ username: student.username });
    console.log(result);

    return res.status(201);
}



// Dependent function ->        
const Subject = require('../../models/Subject');

const addSubjectInAssignments = async (req, res) => {        // Subject selection (and addition in assissment) will be separated later! 
    // Validation 
    console.log(req.body)
    if (!req.body.username || !req.body.subject) return res.status(400).json({ 'message': 'Both username and subject are required as a query parameter!' });
    console.log(req.body.username);        
    const student = await Student.findOne({ username: req.body.username, roles: 3456 }).exec();    
    if (!student) return res.status(400).json({ 'message': `The student with username: ${req.body.username} does not exist!` });

    const subject = await Subject.findOne({ title: req.body.subject }).exec();
    if (!subject) return res.status(401).json({ 'message': 'This subject is not registered yet!' });
    
    const duplicate = await Assessment.findOne({ student: student._id, "assessmentScores.subject": subject._id });
    if (duplicate) return res.status(400).json({ 'message': 'The student is already registered in this subject!' });
    
    // update --> 
    const result = await Assessment.updateOne({ student: student._id }, 
        { $push: { 
            assessmentScores: {
                subject: subject.id
            },
        } 
    });
    
    console.log(result);

    return res.json({ 'message': 'Subject added in Assessment!' });
}

module.exports = { 
    getStudents, 
    handleNewStudent,
    updateStudent, 
    removeStudent,
    addSubjectInAssignments
}