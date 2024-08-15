// /api/removeFlight

import { MongoClient, ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req) {
  const body = await req.json();

  const client = new MongoClient(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  try {
    await client.connect();
    const database = client.db("flights");
    const collection = database.collection("savedFlights");

    const query = { _id: new ObjectId(body.id) };
    const update = { $set: { isDeleted: true } };
    const data = await collection.findOneAndUpdate(query, update);

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
