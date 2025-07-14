import CompletedTask from "../Models/CompletedTask.js";

export const getCompletedTasks = async (req, res) => {
  try {
    const userId = req.user.userId;
    console.log("Fetching completed tasks for userId:", userId);

    const history = await CompletedTask.find({ userId, status: "Completed" }).lean();
    console.log("Query result:", history);

    if (!history.length) {
      console.log("No completed tasks found for userId:", userId);
    }
    res.json(history);
  } catch (err) {
    console.error("Error fetching history:", err.message);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};