import { Schema, model, Types, Document } from "mongoose";

export interface ColumnType extends Document {
  name: string;
  board: Types.ObjectId;
  order: number;
  tasks: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const columnSchema = new Schema<ColumnType>(
  {
    name: { type: String, required: true },
    board: { type: Schema.Types.ObjectId, ref: "Board", required: true },
    order: { type: Number, default: 0 },
    tasks: [{ type: Schema.Types.ObjectId, ref: "Task" }],
  },
  { timestamps: true }
);

export default model<ColumnType>("Column", columnSchema);
