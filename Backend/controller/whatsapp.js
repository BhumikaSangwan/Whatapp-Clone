export const getWhatsAppData = (req, res) => {
  console.log("Welcome to WhatsApp");
  res.status(200).json({ message: "Welcome to WhatsApp UI!" });
};