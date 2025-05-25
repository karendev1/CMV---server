import mongoose from 'mongoose';

const ActivitySchema = new mongoose.Schema({
    date: Date,
    name: String,
    topic: String,
    program: String,
    project: String,
    goal: String,
    status: String,
});

module.exports = mongoose.model('Activity', ActivitySchema);
