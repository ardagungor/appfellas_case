// /api/saveFlight

import { MongoClient } from "mongodb";
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

    const query = { username: body.username, isDeleted: { $ne: true } };
    const sort = { date: body.sortOption === "descending" ? -1 : 1 };
    const data = await collection.find(query).sort(sort).toArray();

    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: "error" }, { status: 500 });
  } finally {
    await client.close();
  }
}
