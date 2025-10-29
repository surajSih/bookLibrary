import mongoose, { model, models } from "mongoose";


const SearchSchema = new mongoose.Schema(
  {
    query: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);
export const Search = models.Search || model("Search", SearchSchema);