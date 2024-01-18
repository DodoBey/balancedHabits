import mongoose from 'mongoose';

const IntakeSchema = new mongoose.Schema(
  {
    intake: {
      type: String,
      require: true,
    },
    pill: {
      type: String,
      require: true,
    },
    date: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model('Intake', IntakeSchema);
