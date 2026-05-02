const express = require("express");
const app = express();

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;

const CATEGORY_KEYWORDS = {
  Food: "food",
  Animals: "animal",
  "Objects & things": "object",
  "School & learning": "school",
  "Silly & random": "fun",
  "Countries & cities": "country",
  "Technology and gadgets": "technology",
  "Sports & games": "sports",
  "Jobs & professions": "job",
  "Vehicles & transportation": "vehicle",
};

app.get("/", (req, res) => {
  res.send("API running");
});

app.get("/words", async (req, res) => {
  const category = req.query.category || "Food";
  const keyword = CATEGORY_KEYWORDS[category] || "common";

  try {
    const response = await fetch(
      `https://twinword-word-associations-v1.p.rapidapi.com/associations/?entry=${keyword}`,
      {
        headers: {
          "X-RapidAPI-Key": RAPIDAPI_KEY,
          "X-RapidAPI-Host": "twinword-word-associations-v1.p.rapidapi.com",
        },
      }
    );

    const data = await response.json();
    res.json({ words: data.associations_array || [] });
  } catch (e) {
    res.json({ words: [] });
  }
});

app.listen(process.env.PORT || 10000);
