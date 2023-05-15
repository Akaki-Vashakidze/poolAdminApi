
async function upload(req, res) {
  const file = req.files[0];
  return file
}
async function get(req, res) {
  const file = req.files[0];
  return file 
}

module.exports = {
  upload, get
};
