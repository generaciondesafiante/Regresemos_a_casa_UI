export const fetchAllAdmin = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/admins/${userId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      const dataUser = await response.json();

      return dataUser;
    } else {
      console.error(
        "Error al obtener la información del usuario:",
        response.statusText
      );
    }
  } catch (error) {
    console.error("Error al realizar la solicitud fetch:", error);
  }
};
