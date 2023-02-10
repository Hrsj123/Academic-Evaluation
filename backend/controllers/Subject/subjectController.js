const Student = require('../../models/User');
const Subject = require('../../models/Subject');

// GET
const getSubjects = async (req, res) => {
    console.log('I am here!');
    const subjects = await Subject.find().select('title subjectCode -_id');
    res.json(subjects);
}

// POST
const createSubject = async (req, res) => {             // <--------- Only allowed by admin!
    const { title, description } = req.body;

    // Validation
    if (!title || !description) return res.status(400).json({ 'message': 'Both title and description of the subject is required!' });

    // Validation: Check for duplicate username in db
    const duplicate = await Subject.findOne({ title: title }).exec();       
    if (duplicate) return res.sendStatus(409);      

    try {
        const subject = await Subject.create({
            title: title,
            description: description
        });
        console.log('-----------------\n', subject, '\n-----------------');
        
        return res.status(201).json({ 'message': `New subject added: ${title}` });
    } catch (error) {
        return res.status(500).json({ 'error': error });
    }
}

// PUT
const updateSubject = async (req, res) => {

}

// DELETE
const removeSubject = async (req, res) => {

}

module.exports = {
    getSubjects,
    createSubject,
    updateSubject,
    removeSubject
}

