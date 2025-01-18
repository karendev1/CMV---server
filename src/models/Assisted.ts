// models/user.js
const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: String,
  age: Number,
  relationship: String,
  profession: String,
  income: String,
  education: String,
  hasDocuments: Boolean,
  communicationLevel: String,
  livesInSameHouse: Boolean
});

const governmentProgramSchema = new mongoose.Schema({
  isInProgram: { type: String, enum: ['S', 'N'] },
  description: String
});

const violenceSchema = new mongoose.Schema({
  hasDomesticViolence: {
    type: String,
    enum: ['S', 'N'],
  },
  description: String
});

const serviceAssistedSchema = new mongoose.Schema({
  forwardedBy: String,
  identification: String,
  serviceDate: { type: Date },
  registrationNumber: String,
  gender: { type: String, enum: ['M', 'F'] },
  birth: { type: Date },
  age: Number,
  naturalness: String,
  race: { type: String, enum: ['white', 'black', 'yellow', 'brown', 'indigenous', 'ignored'] },
  maritalStatus: { type: String, enum: ['married', 'single', 'separate', 'widow', 'ignored'] },
  religion: String,
  address: String,
  numberAddress: String,
  neighborhood: String,
  cep: String,
  city: String,
  state: String,
  referencePoint: String,
  phoneNumber: String,
  levelOfEducation: String,
  currentlyStudying: { type: String, enum: ['S', 'N'] },
  school: String,
  foneNumberSchool: String,
  studyShift: String,
  favoriteSubject: String,
  activitiesParticipating: [String],
  educator: String,
  documentation: {
    birthRegistrationNumber: String,
    cpf: String,
    rg: String,
    title: String,
    wordCard: String
  },
  health: {
    hasHealthProblems: { type: String, enum: ['S', 'N'] },
    detailHealthProblems: String,
    useControlledMedicine: { type: String, enum: ['S', 'N'] },
    detailUseControlledMedicine: String,
    useLegalPsychoactiveSubstances: { type: String, enum: ['S', 'N'] },
    detailUseLegalPsychoactiveSubstances: String,
    useIllicitPsychoactiveSubstances: { type: String, enum: ['S', 'N'] },
    detailUseIllicitPsychoactiveSubstances: String
  },
  family: [familySchema],
  governmentPrograms: governmentProgramSchema,
  violence: violenceSchema,
  reasonForService: String,
  referralsArrangements: [{
    type: String
  }],
  responsibleTechnique: String,
  otherProfessionalsInvolved: String,
  revaluationDate: { type: Date }
});

const Assisted = mongoose.model('Assisted', serviceAssistedSchema);
module.exports = Assisted;
