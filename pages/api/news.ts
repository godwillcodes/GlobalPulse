// pages/api/news.ts

import type { NextApiRequest, NextApiResponse } from 'next';

const API_KEY = '65230fa51cfa4fd693846588b195e573'; // Your API key
const BASE_URL = 'https://newsapi.org/v2/everything';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { page = 1, pageSize = 10 } = req.query;

  try {
    const response = await fetch(`${BASE_URL}?q=bitcoin&apiKey=${API_KEY}&page=${page}&pageSize=${pageSize}`);
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch data' });
  }
}
