
const octokit = require('./../github');
const _eval = require('eval');

const defaultRequest = () => true;
const defaultResponse = () => {};

async function executor(req, res) {
  const start = new Date();

  const file = `${req.method.toLowerCase()}.js`;
  const { repo: target } = req.params;
  const dist = req.params[0] || '';

  const [repo, debugmode] = target.split('.');

  const DEBUG = !!debugmode;

  const path = dist.slice(dist.length - 3) === '.js'
    ? dist
    : `${dist}/${file}`;

  const makeResponse = (res) => (raw, content) => {
    if (!DEBUG) {
      delete raw.mockcode;
    }

    if (DEBUG) {
      const end = new Date() - start;

      return res.json({
        ...raw,
        debug: {
          time: end,
          repo,
          path,
          content,
          request: {
            method: req.method,
            query: req.query,
            body: req.body,
            headers: req.headers,
          },
        },
      });
    }

    return res.json(raw);
  };

  try {
    const result = await octokit.repos.getContents({
      owner: process.env.GITHUB_OWNER,
      repo,
      path,
    });

    const content = Buffer.from(result.data.content, 'base64').toString()
    const script = _eval(content);

    const execResponse = 'response' in script
      ? script.response
      : defaultResponse;

    const execRequest = 'request' in script
      ? script.request
      : defaultRequest;

    const { body, params, headers } = req;

    execRequest(headers, body, params);

    return makeResponse(res)({
      ...execResponse(true),
      mockcode: 200,
    }, content);
  } catch (e) {
    return makeResponse(res)({
      mockcode: 500,
      message: e.message || e,
    }, '');
  }
}

module.exports = executor;
