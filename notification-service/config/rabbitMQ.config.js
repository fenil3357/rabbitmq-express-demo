import amqplib from 'amqplib'

export const connect = async () => {
  try {
    const connection = await amqplib.connect('amqp://localhost');
    const channel = await connection.createChannel();
    await channel.assertQueue('NOTIFICATION-QUEUE', {
      durable: true
    });
    await channel.prefetch(1);
    console.log('Successfully connected to rabbitMQ!');
    return channel;
  } catch (error) {
    console.log("🚀 ~ connect ~ error:", error)
    throw new Error(error?.message || 'Something went wrong while connecting to rabbitMQ!')
  }
}