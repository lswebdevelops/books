import mongoose from 'mongoose';

const commentSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Reference to the User model
    },
    content: {
      type: String,
      required: true,
    },
    // This will allow it to link the comment to any content type (blog, book, poem, project)
    entityId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      refPath: 'entityType', // Tells Mongoose which model to reference
    },
    entityType: {
      type: String,
      required: true,
      enum: ['Blog', 'Book', 'Poem', 'NewProject'], // The different content types that can have comments
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Comment = mongoose.model('Comment', commentSchema);

export default Comment;
