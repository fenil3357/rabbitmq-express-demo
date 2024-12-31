import { formatDate } from "../helper/formatDate.js";

export const transactionAlertEmailTemplate = (sender, receiver, amount, type, date, transaction_id) => {
  // Format the date using the helper function
  const formattedDate = formatDate(date);

  const subject =
    type === 'sender'
      ? `💸 Transaction Successful: Sent $${amount} to ${receiver}`
      : `💵 Transaction Alert: Received $${amount} from ${sender}`;

  const message =
    type === 'sender'
      ? `You have successfully transferred <strong>$${amount}</strong> to <strong>${receiver}</strong>.`
      : `You have successfully received <strong>$${amount}</strong> from <strong>${sender}</strong>.`;

  return {
    from: '"Money Transaction" <system@transaction.com>',
    subject,
    html: `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Transaction Alert</title>
      <style>
        /* General Styles */
        body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background-color: #f8f9fa;
        }
        .email-container {
          max-width: 600px;
          margin: 20px auto;
          background-color: #ffffff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #4caf50;
          color: white;
          text-align: center;
          padding: 20px;
          font-size: 20px;
        }
        .content {
          padding: 20px;
          color: #333333;
        }
        .footer {
          background-color: #f1f1f1;
          text-align: center;
          padding: 10px;
          font-size: 12px;
          color: #777777;
        }
        .transaction-details {
          margin: 20px 0;
          background: #f9f9f9;
          padding: 15px;
          border-radius: 5px;
          font-size: 14px;
        }
        .transaction-details p {
          margin: 5px 0;
        }
        .cta-button {
          display: inline-block;
          margin-top: 20px;
          padding: 10px 20px;
          font-size: 14px;
          color: white;
          background-color: #4caf50;
          text-decoration: none;
          border-radius: 5px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          ${type === 'sender' ? '💸 Payment Sent' : '💵 Payment Received'}
        </div>
        <div class="content">
          <p>Dear ${type === 'sender' ? sender : receiver},</p>
          <p>${message}</p>
          <div class="transaction-details">
            <p><strong>💵 Amount:</strong> $${amount}</p>
            <p><strong>📅 Date:</strong> ${formattedDate}</p>
            <p><strong>🔑 Transaction ID:</strong> ${transaction_id}</p>
          </div>
          <a href="#" class="cta-button">View Transaction Details</a>
        </div>
        <div class="footer">
          <p>If you have any queries, please contact our support team.</p>
          <p>&copy; ${new Date().getFullYear()} YourCompany. All rights reserved.</p>
        </div>
      </div>
    </body>
    </html>
    `,
    to: (type === 'sender' ? sender : receiver)
  };
}
