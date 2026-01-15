export const uploadFileSingle = async (
  file: File,
  folder?: string,
  overwrite?: boolean
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (folder) formData.append("folder", folder);
    if (overwrite !== undefined) {
      formData.append("overwrite", String(overwrite));
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/upload/single`,
      {
        method: "POST",
        body: formData,
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
