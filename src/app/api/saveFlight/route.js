// /api/saveFlight

import { MongoClient } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req) {
  //const { data } = req.body;

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("flights");
    const collection = database.collection("savedFlights");

    const data = { flightNo: 123, username: "Arda" };
    await collection.insertOne(data);

    return NextResponse.json(data, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
