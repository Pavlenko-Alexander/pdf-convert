import { useQuery } from "@tanstack/react-query";
import { API_URL } from "../constants.js";

export const convert = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "HEAD",
      headers: {
        // "Content-Type": "application/json",
        //     Authorization: "Bearer 78684310-850d-427a-8432-4a6487f6dbc4",
        // Accept: "application/pdf"
        // 'Accept': 'application/json, text/plain, */*',
        // Authorization: "Bearer 78684310-850d-427a-8432-4a6487f6dbc4"
      }

      //   body: JSON.stringify({ text: "Universe" })
    });
    console.log(data, res);
    if (!res.ok) {
      throw new Error("Failed to convert text");
    }

    return res;
  } catch (err) {
    console.error(err);
    throw new Error("Failed to convert text");
  }
};

export function useConvertText(data) {
  return useQuery({
    queryKey: ["convert", data],
    queryFn: () => convert(data),
    enabled: !!data
  });
}
