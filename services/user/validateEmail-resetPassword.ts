export const fetchValidateEamilResetPassword = async (
  email: string,
  currentUrl: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/check-email`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          currentUrl,
        }),
      }
    );
    if (!response.ok) {
      console.error(
        "Error al realizar la solicitud fetch:",
        response.statusText
      );
    }
    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud fetch:", error);
  }
};
