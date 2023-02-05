export const fetchResponse = async (chat: any) => {
  try {
    // after depoloyment you should change the fetch URL below
    const response = await fetch(import.meta.env.VITE_API_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: chat.map((message: any) => message.message).join(" \n "),
      }),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
};
