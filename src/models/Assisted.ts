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
  descriptionDomesticViolence: String,
  hasDomesticViolenceNow: {
    type: String,
    enum: ['S', 'N'],
  },
  descriptionDomesticViolenceNow: String,
  hasComplaint: {
    type: String,
    enum: ['S', 'N'],
  },
  descriptionComplaint: String,
  hasIncidenteReport:  {
    type: String,
    enum: ['S', 'N'],
  },
  descriptionIncidenteReport: String,
  serviceReason: String,
});

const referralsArrangementsSchema = new mongoose.Schema({
  social: String,
  psychological: String,
  judicial: String,
  doctor: String,
  Other: String
})

const identificationSchema = new mongoose.Schema({
  name: String,
  serviceDate: String,
  registerNumber: String,
  gender: { type: String, enum: ['MC', 'MT', 'HC', 'HT', 'Other', 'PND'] },
  birth: String,
  age: String,
  naturalness: String,
  race: { type: String, enum: ['BR', 'NE', 'PA', 'IN', 'AM', 'Other', 'PND'] },
  religion: String,
  address: String,
  numberAddress: String,
  complement: String,
  neighborhood: String,
  cep: String,
  city: String,
  state: String,
  referencePoint: String,
  phoneNumber: String,
});

const educationSchema = new mongoose.Schema({
  levelOfEducation: String,
  currentlyStudying: { type: String, enum: ['S', 'N'] },
  school: String,
  foneNumberSchool: String,
  studyShift: String,
  favoriteSubject: String,
  activitiesParticipating: [String],
  educator: String,
})

const documentationSchema = new mongoose.Schema({
  birthRegistrationNumber: String,
  cpf: String,
  rg: String,
  title: String,
  wordCard: String
})

const healthSchema =  new mongoose.Schema({
  hasHealthProblems: { type: String, enum: ['S', 'N'] },
  detailHealthProblems: String,
  useControlledMedicine: { type: String, enum: ['S', 'N'] },
  detailUseControlledMedicine: String,
  useLegalPsychoactiveSubstances: { type: String, enum: ['S', 'N'] },
  detailUseLegalPsychoactiveSubstances: String,
  useIllicitPsychoactiveSubstances: { type: String, enum: ['S', 'N'] },
  detailUseIllicitPsychoactiveSubstances: String
})

const serviceAssistedSchema = new mongoose.Schema({
  forwardedBy: String,
  identification: identificationSchema,
  education: educationSchema,
  documentation: documentationSchema,
  health: healthSchema,
  family: [familySchema],
  governmentPrograms: governmentProgramSchema,
  violence: violenceSchema,
  reasonForService: String,
  referralsArrangements: referralsArrangementsSchema,
  responsibleTechnique: String,
  otherProfessionalsInvolved: String,
  revaluationDate: String
});

const Assisted = mongoose.model('Assisted', serviceAssistedSchema);
module.exports = Assisted;
