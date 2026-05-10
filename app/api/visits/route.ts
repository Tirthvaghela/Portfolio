import { Redis } from "@upstash/redis";
import { NextResponse } from "next/server";

const redis = new Redis({
  url: process.env.STORAGE_REDIS_REST_URL ?? process.env.KV_REST_API_URL!,
  token: process.env.STORAGE_REDIS_REST_TOKEN ?? process.env.KV_REST_API_TOKEN!,
});

export async function GET() {
  try {
    const count = await redis.incr("portfolio:visits");
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json({ count: null }, { status: 500 });
  }
}
