import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    plannedDateTime: {type: Date, required: true},
    priority: {type: String, required: true, default: "Low"},
    userId: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
});

const Event = mongoose.model("Event", eventSchema);

export default Event;

