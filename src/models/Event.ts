import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  name: String,
  date: Date,
  dateTo: Date,
  DateFrom: Date,
  topic: String,
  public: [String],
  Gender: [String],
  informations: String,
  equipe: [String],
  participants: [String],
  quantity: Number,
  activityId: { type: mongoose.Schema.Types.ObjectId, ref: 'Activity' },
});

module.exports = mongoose.model('Event', eventSchema);
