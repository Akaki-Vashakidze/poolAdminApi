
async function response(req, res, data) {
  if (data && data.error) {
    await createErrorResponse(req, res, data)
  } else await createSuccessfullResponse(req, res, data)
}
async function createSuccessfullResponse (req, res, data) {
  res.send({
    success: true,
    data: data
  });
}
async function createErrorResponse (req, res, error) {
  res.send({
    success: false,
    error: error
  });
}

module.exports = {
  response, createSuccessfullResponse, createErrorResponse
};
