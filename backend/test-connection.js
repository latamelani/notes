import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

import dns from 'node:dns';
dns.setServers(['8.8.8.8', '8.8.4.4']);
dns.setDefaultResultOrder('ipv4first');

const url = process.env.MONGO_URL;
console.log('Attempting to connect to:', url.replace(/:([^@]+)@/, ':****@'));

const client = new MongoClient(url, { connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 });

async function run() {
    try {
        await client.connect();
        console.log("Successfully connected to MongoDB Atlas!");
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } catch (err) {
        console.error("Connection failed:", err);
    } finally {
        await client.close();
    }
}
run();
