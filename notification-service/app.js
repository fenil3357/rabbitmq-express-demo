import amqplib from 'amqplib'

import { connect } from './config/rabbitMQ.config.js'

async function start() {
  try {
    const notificationChannel = await connect();

    notificationChannel.consume('NOTIFICATION-QUEUE', async (data) => {
      console.log('DATA RECEIVED FROM QUEUE', JSON.parse(data.content));

      notificationChannel.ack(data);
    }, {
      noAck: false
    });
  } catch (error) {
    console.log("🚀 ~ start ~ error:", error);
  }
}

start();