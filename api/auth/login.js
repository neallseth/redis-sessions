import { createRedisClient } from "../../util/redis-helpers";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "../../util/server-helpers";
import { createSession } from "../../util/auth-helpers";

export default async function handler(request, response) {
  // const userID = request.body?.user;
  const userID = "bob";

  // set authenticated value based on credential look-up
  const authenticated = true;
  if (authenticated) {
    try {
      const redisClient = await createRedisClient();
      const newSessionID = await createSession(userID, redisClient);
      const cookies = [
        `session-id=${newSessionID}; Max-Age=600`,
        `session-user=${userID}; Max-Age=600`,
      ];

      handleSuccessResponse(
        response,
        `Established new session for user: ${userID}`,
        cookies
      );
    } catch (err) {
      handleErrorResponse(response, "Server error");
    }
  }
}
