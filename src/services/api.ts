import axios from "axios";
import { Response, FetchParameters } from "../types";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchResponseData = async <T>(
  parameters: FetchParameters
): Promise<T> => {
  const { data } = await axios.get<T>(`/search/photos?`, {
    params: {
      client_id: "9rll1EsqB868TxskpxLhEpKeCDpOf09J3GwAJDbNZuw",
      orientation: "landscape",
      ...parameters,
    },
  });
  return data;
};
