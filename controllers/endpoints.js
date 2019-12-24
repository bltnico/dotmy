
const octokit = require('./../github');

const methods = [
  'GET',
  'POST',
  'PUT',
  'DELETE',
  'OPTIONS',
  'HEAD',
];

const mapEndpoints = (items) =>  {
  return items
    .map(item => item.path)
    .reduce((acc, obj) => {
      const s = obj.split('/');
      if (s.length === 1) {
        acc = [...acc, {
          method: 'unknow',
          endpoint: obj,
        }];
      }

      const file = s.pop();
      const m = file.slice(0, -3);

      if (methods.includes(m.toUpperCase())) {
        acc = [...acc, {
          method: m.toUpperCase(),
          endpoint: s.join('/'),
        }];
      }

      return acc;
    }, [])
    .reduce((acc, obj) => {
      if (obj.method in acc) {
        acc[obj.method] = [
          ...acc[obj.method],
          obj.endpoint,
        ];
      } else {
        acc[obj.method] = [obj.endpoint];
      }

      return acc;
    }, {});
};

async function endpoints(req, res) {
  try {
    const q = `extension:js+repo:${process.env.GITHUB_OWNER}/${req.params.repo}`;
    const results = await octokit.search.code({ q });

    const { data: { items } } = results;

    return res.json(mapEndpoints(items));
  } catch (e) {
    return res.json({
      message: e.message || e,
    })
  }
}

module.exports = endpoints;