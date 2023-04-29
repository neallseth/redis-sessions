import { createRedisClient } from "../../util/redis-helpers";
import {
  getSession,
  invalidateSession,
  createSession,
  refreshSession,
} from "../../util/auth-helpers";
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
    const { validSession, userID, sessionID } = await getSession(
      cookieSessionID,
      redisClient
    );
    if (validSession) {
      const newSessionID = await refreshSession(sessionID, userID, redisClient);

      const cookies = [
        `session-id=${newSessionID}; Max-Age=600`,
        `session-user=${userID}; Max-Age=600`,
      ];

      handleSuccessResponse(
        response,
        `Refreshed session for user: ${userID}`,
        cookies
      );
    } else {
      handleErrorResponse(
        response,
        "User session has expired - login required for new session"
      );
    }
  } catch (err) {
    handleErrorResponse(response, "Server error");
  }
}
