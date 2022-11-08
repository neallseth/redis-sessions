import { createRedisClient } from "../../util/redis-helpers";
import { getSession, invalidateSession } from "../../util/auth-helpers";
import {
  handleErrorResponse,
  handleSuccessResponse,
} from "../../util/server-helpers";

export default async function handler(request, response) {
  const cookieSessionID = request.cookies["session-id"];
  if (!cookieSessionID) {
    handleErrorResponse(response, "No active session on client");
    return;
  }

  try {
    const redisClient = await createRedisClient();
    const { validSession, username, sessionID } = await getSession(
      cookieSessionID,
      redisClient
    );
    if (validSession) {
      await invalidateSession(sessionID, redisClient);
      handleSuccessResponse(
        response,
        `Invalidated session for user: ${username}`
      );
    } else {
      handleSuccessResponse(response, "Session is already invalid");
    }
  } catch (err) {
    console.log(err);
    handleErrorResponse(response, "Server error");
  }
}
