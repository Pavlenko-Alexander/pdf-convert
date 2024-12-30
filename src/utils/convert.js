import { API_URL } from "../constants.js";

export const convert = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: data })
    });
    const myBlob = await res.blob();
    return myBlob;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to convert text ${err}`);
  }
};
