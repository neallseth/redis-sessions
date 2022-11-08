export function handleErrorResponse(response, message) {
  response.status(400).json({
    status: "Error",
    message,
  });
  return;
}

export function handleSuccessResponse(
  response,
  message,
  customHeaders,
  responseFields
) {
  for (let header in customHeaders) {
    const headerVal = customHeaders[header];
    response.setHeader(header, headerVal);
  }
  response.status(200).json({
    status: "Success",
    message,
    ...responseFields,
  });
  return;
}
