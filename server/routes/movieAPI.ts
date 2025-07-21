const axios = require("axios");
import { Router, Request, Response } from "express";

type ContentType = "movies" | "series" | "people" | "news";

export interface Video {
  id: number;
  name: string;
  category: string;
}

const fetchMovieData = async (query: string, type: ContentType) => {
  let url = "";

  if (query.trim()) {
    url = `https://www.thecinemadb.com/api/v1/titles/${encodeURIComponent(
      query
    )}?loader=titlePage`;
  } else {
    switch (type) {
      case "movies":
      case "series":
        url = `https://www.thecinemadb.com/api/v1/channel/${type}?channelType=channel&restriction=&loader=channelPage`;
        break;
      case "people":
        url = `https://www.thecinemadb.com/api/v1/people?loader=peoplePage`;
        break;
      case "news":
        url = `https://www.thecinemadb.com/api/v1/news?loader=newsPage`;
        break;
      default:
        url = `https://www.thecinemadb.com/api/v1/channel/movies?channelType=channel&restriction=&loader=channelPage`;
    }
  }

  const response = await axios.get(url);
  return response.data;
};

// Create Express router
const router = Router();

router.get('/movies', async (req: Request, res: Response) => {
  try {
    const { query = '', type = 'movies' } = req.query;
    const data = await fetchMovieData(query as string, type as ContentType);
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

export default router;