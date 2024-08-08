export const fetchResourcesData = async (idUser: string) => {
  const userId = idUser;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/${userId}`
    );
    const json = await response.json();
    if (json.ok) {
      return json.resources;
    } else {
      console.error("Invalid courses data:", json);
      return [];
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    return [];
  }
};
