import { v4 as genID } from "uuid";
import Cookies from "js-cookie";

export async function createSession(user, redisClient, expTime = 600) {
  const newSessionID = genID();
  // By default, session expires in 10 minutes
  await redisClient.setEx(newSessionID, expTime, user);
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

export async function getLocalSession() {
  return {
    sessionID: Cookies.get("session-id"),
    userID: Cookies.get("session-id"),
  };
}

export async function refreshSession(sessionID, username, redisClient) {
  await invalidateSession(sessionID, redisClient);
  return await createSession(username, redisClient);
}
