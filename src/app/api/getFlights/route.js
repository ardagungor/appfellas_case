// /api/getFlights

import { NextResponse } from "next/server";
const axios = require("axios");

export async function POST(req) {
  const BASE_URL = process.env.BASE_URL;

  const body = await req.json();

  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${BASE_URL}?scheduleDate=2024-08-16&includedelays=false&page=0&sort=%2BscheduleDateTime&flightDirection=${body.flightDirection}`,
    headers: {
      Accept: "application/json",
      app_id: process.env.APP_ID,
      app_key: process.env.API_KEY,
      ResourceVersion: "v4",
    },
  };

  try {
    const response = await axios.request(config);
    return NextResponse.json(response.data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
