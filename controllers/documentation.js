
function documentation(req, res) {
  return res
    .status(301)
    .redirect('https://github.com/bltnico/server-mocks-api/blob/master/README.md');
}

module.exports = documentation;