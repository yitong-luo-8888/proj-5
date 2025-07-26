import User from './../Models/Auth.js';
// userScoreController.js
// Manages score saving, retrieval, and leaderboard endpoints
export const postScores = async (req, res) => {
  const { username } = req.params;
  const { quizTitle, score, outOf } = req.body;

  if (!quizTitle || typeof score !== "number" || typeof outOf !== "number") {
    return res.status(400).json({ error: "quizTitle, score, and outOf are required" });
  }

  try {
    if (username !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ username });
    if (!user) return res.status(404).json({ error: "User not found" });

    const existing = user.scores.find(score => score.quizTitle === quizTitle);

    if (existing) {
      existing.score = score;
      existing.outOf = outOf;
      existing.date = new Date();
    } else {
      user.scores.push({ quizTitle, score, outOf });
    }

    await user.save();
    res.status(200).json({ message: "Score saved", scores: user.scores });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save score" });
  }
};

export const getScores = async (req, res) => {
  try {
    const { username } = req.params;

    if (username !== req.user.username) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    const user = await User.findOne({ username }).select("scores username");
    if (!user) return res.status(404).json({ error: "User not found" });

    res.status(200).json({
      username: user.username,
      scores: user.scores,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch scores" });
  }
};