// services/popupService.js
export const sendPopupDataToSheet = async ({ name, phone }) => {
  try {
    await fetch("https://script.google.com/macros/s/AKfycbzTZDiojfxn6pWXEqn8zNqBtL42ZS1pDxD3cNVHp7vtCB0Sd-Qkvr9uRGqMBmNqMLcPDQ/exec", {
      method: "POST",
      body: JSON.stringify({ name, phone }),
    });
    console.log("Data sent to Google Sheet!");
  } catch (err) {
    console.error("Error sending data:", err);
  }
};
