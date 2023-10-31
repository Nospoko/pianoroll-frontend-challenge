"use server";

const getRandomNotes = async () => {
  const API_URL = process.env.RANDOM_NOTES_URL;

  const data = await fetch(`${API_URL}`, {
    method: "GET",
  })
    .then((response) => response.json())

    .catch((error) => {
      return { error: error };
    });

  return data;
};

export default getRandomNotes;
