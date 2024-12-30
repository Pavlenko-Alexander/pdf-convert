import { API_URL } from "../constants.js";

export const convert = async (data) => {
  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Authorization: "Bearer" + "78684310-850d-427a-8432-4a6487f6dbc4",
        Accept: "application/pdf"
        // 'Accept': 'application/json, text/plain, */*',
        // Authorization: "Bearer 78684310-850d-427a-8432-4a6487f6dbc4"
      },
      body: JSON.stringify({ text: data })
    });
    console.log(data, res);
    const myBlob = res.blob();
    const objectURL = URL.createObjectURL(myBlob);
    return objectURL;
  } catch (err) {
    console.error(err);
    throw new Error(`Failed to convert text ${err}`);
  }
};
