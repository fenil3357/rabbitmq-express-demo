import amqplib from 'amqplib'

import { connect } from './config/rabbitMQ.config.js'
import { transactionAlertEmailTemplate } from './templates/email.templates.js';
import { sendEmail } from './services/email.service.js';

async function start() {
  try {
    const notificationChannel = await connect();

    notificationChannel.consume('NOTIFICATION-QUEUE', async (data) => {
      const transaction = JSON.parse(data.content);
      
      // Notify users
      const sender_email_template = transactionAlertEmailTemplate(
        transaction.sender,
        transaction.receiver,
        transaction.amount,
        'sender',
        transaction.createdAt,
        transaction._id
      );

      // Sender email
      await sendEmail(sender_email_template);

      const receiver_email_template = transactionAlertEmailTemplate(
        transaction.sender,
        transaction.receiver,
        transaction.amount,
        'receiver',
        transaction.createdAt,
        transaction._id
      );

      // Receiver email
      await sendEmail(receiver_email_template);

      notificationChannel.ack(data);
    }, {
      noAck: false
    });
  } catch (error) {
    console.log("🚀 ~ start ~ error:", error);
  }
}

start();