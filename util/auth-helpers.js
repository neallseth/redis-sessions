import { v4 as genID } from "uuid";

export async function createSession(user, redisClient) {
  const newSessionID = genID();
  await redisClient.setEx(newSessionID, 600, user);
  return newSessionID;
}

export async function invalidateSession(sessionID, redisClient) {
  return await redisClient.del(sessionID);
}

export async function getSession(sessionID, redisClient) {
  const username = await redisClient.get(sessionID);
  return {
    validSession: username ? true : false,
    username,
    sessionID,
  };
}

export async function refreshSession(sessionID, username, redisClient) {
  await invalidateSession(sessionID, redisClient);
  return await createSession(username, redisClient);
}
