import { createClient } from "redis";

export async function createRedisClient() {
  let client;
  if (process.env.REDIS_PASS) {
    client = createClient({
      url: `rediss://:${process.env.REDIS_PASS}@${process.env.REDIS_URL}:${process.env.REDIS_PORT}`,
    });
  } else {
    client = createClient();
  }
  client.on("error", (err) => console.log("Redis Client Error", err));
  await client.connect();
  return client;
}
