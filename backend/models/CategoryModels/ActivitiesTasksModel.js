const mongoose = require("mongoose");

// State is enumerator 0-to do  1-in_progress  2-completed
const tasksSchema = mongoose.Schema({
    userID: String,
    tasks: [
        {
            id: String,
            category: String,
            title: String,
            description: String,
            urgency: String,
            status: String,
            isCollapsed: Boolean
        }
    ]
});

module.exports = mongoose.model('ActivitiesTasks', tasksSchema);
