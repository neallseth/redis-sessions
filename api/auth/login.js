import { createRedisClient } from "../../util/redis-helpers";
import {
  handleSuccessResponse,
  handleErrorResponse,
} from "../../util/server-helpers";
import { createSession } from "../../util/auth-helpers";

export default async function handler(request, response) {
  const username = request.body?.user;
  // set authenticated value based on credential look-up
  const authenticated = true;
  if (authenticated) {
    try {
      const redisClient = await createRedisClient();
      const newSessionID = await createSession(username, redisClient);
      handleSuccessResponse(
        response,
        `Established new session for user: ${username}`,
        {
          "Set-Cookie": `session-id=${newSessionID}`,
        }
      );
    } catch (err) {
      handleErrorResponse(response, "Server error");
    }
  }
}
