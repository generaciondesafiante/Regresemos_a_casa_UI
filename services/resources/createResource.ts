export const addResource = async (
  userId: string,
  resourceUrl: string,
  title: string,
  description: string,
  typeResource: string,
  visibility: string,
  miniaturaUrl: string
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/resources/createResource/${userId}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          resourceUrl,
          title,
          description,
          typeResource,
          visibility,
          miniaturaUrl,
        }),
      }
    );

    const responseData = await response.json();
    if (!response.ok) {
      return {
        status: response.status,
        data: responseData,
      };
    }

    return {
      status: response.status,
      data: responseData,
    };
  } catch (error) {
    if (error instanceof Error) {
      return {
        status: "error",
        data: { message: error.message || "Error desconocido" },
      };
    } else {
      return {
        status: "error",
        data: { message: "Error desconocido" },
      };
    }
  }
};
