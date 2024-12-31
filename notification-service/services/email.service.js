import { transporter } from "../config/nodemailer.config.js"

export const sendEmail = async (options) => {
  try {
    await transporter.sendMail(options);
    console.log(`Email successfully sent to ${options.to}!`);
  } catch (error) {
    console.log("🚀 ~ Something went wrong while sending email:", error)
  }
}