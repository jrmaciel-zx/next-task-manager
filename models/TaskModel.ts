import mongoose, {Schema} from "mongoose";

const TaskSchema = new Schema (
    {
        description: {type: String, required: true},
        conclusion: {type: Date, required: true},
        status: {type: String, required: true}
    }
);

export const TaskModel = mongoose.models.users || mongoose.model('tasks', TaskSchema);