const Octokit = require('@octokit/rest');

const octokit = new Octokit({
  auth: process.env.GITHUB_AUTH_KEY,
});

module.exports = octokit;
