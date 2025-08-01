// //routes/moods.js
// const express = require('express');
// const router = express.Router();
// const Mood = require('./Mood');

// // Route to save mood log
// router.post('/log', async (req, res) => {
//     try {
//         const {
//             username, hoursSlept, depressedMood, elevatedMood, irritability, anxiety,
//             appetite, socialInteraction, psychoticSymptoms, talkTherapy,
//              note
//         } = req.body;

//         // Create a new mood log entry
//         const newMood = new Mood({
//             username,
//             hoursSlept,
//             depressedMood,
//             elevatedMood,
//             irritability,
//             anxiety,
//             appetite,
//             socialInteraction,
//             psychoticSymptoms,
//             talkTherapy,
//             note
//         });

//         // Save the mood log to the database
//         await newMood.save();
//         res.status(201).json({ message: 'Mood log saved successfully' });
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to save mood log' });
//     }
// });

// module.exports = router;


const express = require('express');
const router = express.Router();
const Mood = require('./Mood');  // ✅ correct path

// ✅ Save mood log
router.post('/', async (req, res) => {
    try {
        const {
            username,
            hoursSlept,
            depressedMood,
            elevatedMood,
            irritability,
            anxiety,
            appetite,
            socialInteraction,  // ✅ fixed camelCase
            psychoticSymptoms,
            talkTherapy,
            note
        } = req.body;

        const newMood = new Mood({
            username,
            hoursSlept,
            depressedMood,
            elevatedMood,
            irritability,
            anxiety,
            appetite,
            socialInteraction,  // ✅ fixed camelCase
            psychoticSymptoms,
            talkTherapy,
            note
        });

        await newMood.save();
        res.status(201).json({ message: 'Mood log saved successfully', mood: newMood });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save mood log' });
    }
});

// ✅ Fetch mood logs (with optional month/year filter)
router.get('/:username', async (req, res) => {
    const { username } = req.params;
    const { month, year } = req.query;

    try {
        let filter = { username };

        if (month && year) {
            const startDate = new Date(year, month - 1, 1);
            const endDate = new Date(year, month, 0, 23, 59, 59);
            filter.logDate = { $gte: startDate, $lte: endDate };
        }

        const moods = await Mood.find(filter).sort({ logDate: 1 });
        res.json(moods);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to fetch mood logs' });
    }
});

module.exports = router;
