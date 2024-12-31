import amqplib from 'amqplib'

let connection = null;
let notificationChannel = null;

export const initializeRabbitMQ = async () => {
  try {
    connection = await amqplib.connect("amqp://localhost");
    console.log('Connected to rabbitMQ successfully!')

    notificationChannel = await connection.createChannel();
    await notificationChannel.assertQueue('NOTIFICATION-QUEUE', {
      durable: true
    });

    console.log('Successfully asserted NOTIFICATION-QUEUE!');
  } catch (error) {
    console.log("🚀 ~ initializeRabbitMQ ~ error:", error)
    throw new Error(error?.message || 'Something went wrong while initializing rabbitMQ!')
  }
}

export const sendMessage = async (queue, data) => {
  try {
    await notificationChannel.sendToQueue(queue, Buffer.from(data));
    console.log(`Data successfully sent to queue "${queue}"`)
  } catch (error) {
    console.log("🚀 ~ sendMessage ~ error:", error)
    throw new Error(error?.message || 'Something went wrong while sending message to queue ' + queue)
  }
}