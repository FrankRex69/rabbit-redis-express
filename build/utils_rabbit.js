import client from 'amqplib';
import { startLong, startShort } from './redis.js';
export const rabbitMqShort = async (shortUrl) => {
    const connection = await client.connect('amqp://username:password@localhost:5672');
    // Create a channel
    const channel = await connection.createChannel();
    // Makes the queue available to the client
    await channel.assertQueue('QueueShort');
    // Send some messages to the queue
    //sendMessages(channel)
    sendMessagesShort(channel, shortUrl);
    // Start the consumer
    await channel.consume('QueueShort', consumer(channel));
};
const sendMessagesShort = (channel, shortUrl) => {
    channel.sendToQueue('QueueShort', Buffer.from(shortUrl));
};
// consumer for the queue.
// We use currying to give it the channel required to acknowledge the message
const consumer = (channel) => async (msg) => {
    if (msg) {
        // Acknowledge the message
        channel.ack(msg);
        // logic shortUrl
        let responseUrl;
        const responseObject = await startShort(msg.content.toString());
        if (responseObject.message != "shortUrl not present!!!") {
            responseUrl = (responseObject.message + ": the longUrl relative is " + responseObject.urlLong + ". Call back: " + responseObject.countrequestShort + " times.");
        }
        else {
            responseUrl = "shortUrl not present!!!";
        }
        console.log(responseUrl);
        return responseUrl;
    }
};
// -------------------------
export const rabbitMqLong = async (longUrl, account) => {
    const connection = await client.connect('amqp://username:password@localhost:5672');
    // Create a channel
    const channel = await connection.createChannel();
    // Makes the queue available to the client
    await channel.assertQueue('QueueLong');
    // Send some messages to the queue
    sendMessagesLong(channel, longUrl, account);
    // Start the consumer
    await channel.consume('QueueLong', consumerLong(channel));
};
const sendMessagesLong = (channel, longUrl, account) => {
    const mess = {
        "longUrl": longUrl,
        "account": account
    };
    channel.sendToQueue('QueueLong', Buffer.from(JSON.stringify(mess)));
};
// consumer for the queue.
// We use currying to give it the channel required to acknowledge the message
const consumerLong = (channel) => async (msg) => {
    if (msg) {
        // logic shortUrl
        let responseUrl;
        let objectLong = JSON.parse(msg.content.toString());
        const responseObject = await startLong(objectLong.longUrl, objectLong.account);
        if (responseObject.message != "shortUrl not present!!!") {
            responseUrl = (responseObject.message + ": " + responseObject.shortUrl);
        }
        else {
            responseUrl = "shortUrl not present!!!";
        }
        console.log(responseUrl);
        // Acknowledge the message
        channel.ack(msg);
        return responseUrl;
    }
};
