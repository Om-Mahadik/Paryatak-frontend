export const sendContactFormToSheet = async (formData) => {
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbzkygxG3BDt5Y_-gA5D3TPuiWBAgPb7gR14D_3az7WGl4_EzTtM9BXiZd4zjMzp9DOTSw/exec", // Replace with your deployed Apps Script URL
      {
        method: "POST",
        mode: "no-cors", // important to bypass CORS during dev
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      }
    );
    // Since mode no-cors hides response, we return true for success
    return true;
  } catch (err) {
    console.error("Error sending contact form data:", err);
    return false;
  }
};
