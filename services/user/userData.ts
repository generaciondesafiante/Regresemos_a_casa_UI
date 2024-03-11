export const fetchUserData = async (userId: string, setDataUser?: any) => {
;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/userinformations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: userId }),
      }
    );

    if (response.ok) {
      const dataUser = await response.json();
      return dataUser
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
