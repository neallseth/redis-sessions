export function handleErrorResponse(response, message) {
  response.status(400).json({
    status: "Error",
    message,
  });
  return;
}

export function handleSuccessResponse(response, message, cookies) {
  if (cookies) {
    response.setHeader("Set-Cookie", cookies);
  }
  response.status(200).json({
    status: "Success",
    message,
  });
  return;
}
