import { Schema, model, Types, Document } from "mongoose";

export interface BoardType extends Document {
  name: string;
  description?: string;
  owner: Types.ObjectId;
  members: Types.ObjectId[];
  columns: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const boardSchema = new Schema<BoardType>(
  {
    name: { type: String, required: true },
    description: { type: String },
    owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
    members: [{ type: Schema.Types.ObjectId, ref: "User" }],
    columns: [{ type: Schema.Types.ObjectId, ref: "Column" }],
  },
  { timestamps: true }
);

export default model<BoardType>("Board", boardSchema);
