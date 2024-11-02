import mongoose from "mongoose";

// Define the schema for a news item
const newsItemSchema = new mongoose.Schema(
  {
    // Image URL for the news item
    img: { type: String, required: true },

    // Category of the news item (e.g., "Sports", "Technology")
    category: { type: String, required: true },

    // Date of the news item, defaults to the current date
    date: { type: Date, default: Date.now },

    // Title of the news item
    title: { type: String, required: true },

    // Brief description of the news item
    brief: { type: String, default: null },

    // URL or path to author's avatar image
    avatar: { type: String, default: null },

    // Author's name
    author: { type: String, default: null },

    // Indicates if the news item is a "top" item
    top: { type: Boolean, default: false },

    // Indicates if the news item is "trending"
    trending: { type: Boolean, default: false },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Check if the model already exists in Mongoose; if not, create it
const NewsItem = mongoose.models.newsItem || mongoose.model('newsItem', newsItemSchema);

export default NewsItem;