import mongoose from "mongoose";

const activitySchema = new mongoose.Schema({
  formattedDate: String,
  formattedStartTime: String,
  formattedEndTime: String,
  title: String,
  notes: String,
});

const dbSchema = new mongoose.Schema({
  tripName: String,
  destination: String,
  startDate: String,
  endDate: String,
  image: {
    data: Buffer,
    contentType: String,
  },
  activities: [activitySchema],
});

const userSchema = mongoose.models.users || mongoose.model("users", dbSchema);
export default userSchema;
