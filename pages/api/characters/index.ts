import { NextApiRequest, NextApiResponse } from "next";
import data from "../../../utils/evo-task-data.json";

interface QueryParams {
  page?: string;
  id?: string;
  top?: string;
}

const PAGE_SIZE = 25;

const getPaginatedData = (page: number) => {
  if (isNaN(page) || page <= 0) {
    return [];
  }
  const start = (page - 1) * PAGE_SIZE;
  let end = start + PAGE_SIZE;
  if (end > data.length) {
    end = data.length;
  }
  return data.slice(start, end);
};

const getCharacterById = (id: number) => {
  return data.find((character) => character.id === id);
}

const getTopCharacters = (count: number) => {
  return data.sort((a, b) => b.episode.length - a.episode.length).slice(0, count);
}

export default (_req: NextApiRequest, res: NextApiResponse) => {
  const { page, id, top } = _req.query as QueryParams;

  if (page) {
    const data = getPaginatedData(Number(page));
    res.status(200).json(data);
  } else if (id) {
    const data = getCharacterById(Number(id));
    res.status(200).json(data);
  } else if (top) {
    const data = getTopCharacters(Number(top));
    res.status(200).json(data);
  } else {
    res.status(200).json(data);
  }
};
