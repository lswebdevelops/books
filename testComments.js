import mongoose from "mongoose";

mongoose.connect("mongodb://localhost:27017/books", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const commentSchema = new mongoose.Schema({
  content: String,
  entityId: mongoose.Types.ObjectId
});

const Comment = mongoose.model("Comment", commentSchema);

async function checkComments() {
  try {
    const comments = await Comment.find({ entityId: new mongoose.Types.ObjectId("67ec0e9af4bc854e34c51ade") });
    console.log(comments);
  } catch (error) {
    console.error("Erro ao buscar comentários:", error);
  } finally {
    mongoose.connection.close();
  }
}

checkComments();
