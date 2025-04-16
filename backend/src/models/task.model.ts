import { Schema, model, Types, Document } from "mongoose";

export interface TaskType extends Document {
  title: string;
  description?: string;
  status: "todo" | "in_progress" | "done";
  board: Types.ObjectId;
  column: Types.ObjectId;
  assignee?: Types.ObjectId;
  dueDate?: Date;
  priority?: "low" | "medium" | "high";
  createdAt: Date;
  updatedAt: Date;
}

const taskSchema = new Schema<TaskType>(
  {
    title: { type: String, required: true },
    description: { type: String },
    status: {
      type: String,
      enum: ["todo", "in_progress", "done"],
      default: "todo",
    },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    column: { type: Schema.Types.ObjectId, ref: "Column", required: true },
    assignee: { type: Schema.Types.ObjectId, ref: "User" },
    dueDate: { type: Date },
    priority: {
      type: String,
      enum: ["low", "medium", "high"],
      default: "medium",
    },
  },
  { timestamps: true }
);

export default model<TaskType>("Task", taskSchema);
