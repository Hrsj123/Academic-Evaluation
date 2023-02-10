const Student = require('../../models/User');
const Subject = require('../../models/Subject');
const Assessment = require('../../models/Assessment');

// GET
const getAssessment = async (req, res) => {
    // Validation
    if (!req.params.username) return res.status(400).json({ 'message': 'Username is required as a query parameter' });
    
    const assessment = await Assessment.findOne({ username: req.params.username, roles: 3456 }).select('-_id').exec();
    if (!assessment) return res.status(400).json({ 'message':  `No student with username: ${req.params.username} exists!` });

    return res.send(assessment);
}

// PUT: Add assessment!
const updateAssessment = async (req, res) => {              
    // Validation
    
    if (!req.params.username) return res.status(400).json({ 'message': 'Username is required as a query parameter' });
    
    const student = await Student.findOne({ username: req.params.username, roles: 3456 }).exec();    
    if (!student) return res.status(400).json({ 'message': `The student with username: ${req.params.username} does not exist!` });

    const subject = await Subject.findOne({ title: req.body.subject }).exec();
    if (!subject) return res.status(401).json({ 'message': 'The requested subject does not exist!' });

    const duplicate = await Assessment.findOne({ student: student._id, "assessmentScores.weekArray.weekNo": req.body.weekNo }).exec();
    console.log('-----------------------------------')
    console.log(duplicate);
    console.log('-----------------------------------')
    if (duplicate) return res.status(401).json({ 'message': 'The value for this week is already set for this student!' });

    // update --> 
    const result = await Assessment.updateOne({ student: student._id, "assessmentScores.subject": subject._id}, 
        { $push: { 
            "assessmentScores.$.weekArray": {
                weekNo: req.body.weekNo,
                attendanceScore: req.body.attendanceScore,
                interactionScore: req.body.interactionScore,
                testScore: req.body.testScore
            }
        } 
    });
    
    if (!result.modifiedCount) return res.status(400).json({ 'message': `The scores for week ${req.body.weekNo} are already set!` });

    return res.json({ 'message': 'Successfully added scores to assessment!' });
}


// UPDATE: To change an already set assessment scores!
const changeAssessmentScore = async (req, res) => {
    // Validation
    if (!req.params.username) return res.status(400).json({ 'message': 'Username is required for changing assessment Scores!' });

    const student = await Student.findOne({ username: req.params.username, roles: 3456 }).exec();    
    if (!student) return res.status(400).json({ 'message': `The student with username: ${req.params.username} does not exist!` });

    const subject = await Subject.findOne({ title: req.body.subject }).exec();
    if (!subject) return res.status(401).json({ 'message': 'An error occured!' });

    const assessment = await Assessment.findOne({ 
        student: student._id,  
        "assessmentScores.subject": subject._id,
        "assessmentScores.weekArray.weekNo": req.body.weekNo 
    }).exec();
    
    if (assessment) {
        // Validation --> Problems are yet to be discorvered!
        let tempAssessmentScores = assessment.assessmentScores
            .find((element) => String(element.subject) === String(subject._id))['weekArray']
            .filter((obj) => obj.weekNo !== req.body.weekNo);                           // To remove the old assessment record of a particular week!!!

        tempAssessmentScores.push({
            weekNo: req.body.weekNo,
            attendanceScore: req.body.attendanceScore, 
            interactionScore: req.body.interactionScore,
            testScore: req.body.testScore
        });                                                                             // Push the new record of that particular week!!!

        for (let i = 0; i < assessment.assessmentScores.length; i++) {
            if (String(assessment.assessmentScores[i].subject) === String(subject._id)) {
                assessment.assessmentScores[i].weekArray = tempAssessmentScores             // Re-assign the new array in the assessmentScores document!
            }   
        }

        try {
            const result = await assessment.save();                                     // Save the edited document!
            console.log(result);
        } catch (error) {
            return res.status(500).send(error);
        }
        
        return res.json({ 'message': `Successfully changed the scores of student: ${student.username}` });
    } else {
        return res.status(400).json({ 'message': 'The assessment page does not contain the subject for this student or the result for this particular week is not set!' })
    }

}

module.exports = { 
    getAssessment,
    changeAssessmentScore,
    updateAssessment
}