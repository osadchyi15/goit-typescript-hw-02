import axios from "axios";
import { Response, FetchParameters } from "../types";

axios.defaults.baseURL = "https://api.unsplash.com";

export const fetchResponseData = async (
  parameters: FetchParameters
): Promise<Response> => {
  const { data } = await axios.get<Response>(`/search/photos?`, {
    params: {
      client_id: "9rll1EsqB868TxskpxLhEpKeCDpOf09J3GwAJDbNZuw",
      orientation: "landscape",
      ...parameters,
    },
  });
  return data;
};
