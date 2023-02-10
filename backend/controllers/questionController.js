// QuizAPI:

const QUIZ_TOPICS = [
    'Linux',
    'DevOps',
    'Networking',
    'Programming',          //  (PHP, JS, Python and etc.)
    'Cloud',
    'Docker',
    'Kubernetes'
]

const DIFFICULTY = [
    'Eazy',
    'Medium',
    'Hard'
]

const getQuestions = (req, res) => {
    const { category, difficulty } = req.body;        

    if (!QUIZ_TOPICS.includes(category)) return res.status(400).json({ 'message': 'The selected category is not valid!' });
    if (!DIFFICULTY.includes(difficulty)) return res.status(400).json({ 'message': 'The selected difficulty is not valid!' });

    fetch(`https://quizapi.io/api/v1/questions?apiKey=${process.env.QUIZAPI_KEY}&category=${category}&difficulty=${difficulty}&limit=${10}`)
        .then(async res => {
            return {
                data: await res.json(),
                err: !res.ok
            }
        })
        .then(({data, err}) => {
            if (err) return res.sendStatus(500);
            return res.send(data)
        })
        .catch(err => console.log(err)); 
}

module.exports = { getQuestions }