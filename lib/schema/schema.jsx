import mongoose from "mongoose";

const dbSchema = new mongoose.Schema({
  tripName: String,
  destination: String,
  startDate: String,
  endDate: String,
});

const userSchema = mongoose.models.users || mongoose.model("users", dbSchema); // ('collection name or table name ', schema)
export default userSchema;
