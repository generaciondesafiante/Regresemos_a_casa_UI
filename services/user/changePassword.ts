export const changePassword = async (id: string, password: string) => {
    try {
        const responseData = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/change-password/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    password: password,
                }),
            }
        );
        return responseData;
    } catch (error) {
        console.error(error);
    }
};