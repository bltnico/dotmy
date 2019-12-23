# Dotmy

> Tiny serverless dummy api ... wut ?

## 📦 Setup

1. Make a new Github repository
2. Follow repository architecture
3. Go to https://dotmy.herokuapp.com/{repository-name}/

## 📁 Project architecture

```bash
repository
├── user
│   ├── get.js
│   ├── me
│   │   ├── get.js
│   │   └── post.js
│   └── 1
│       ├── get.js
│       ├── put.js
│       ├── delete.js
│       └── post.js
└── get.js
```

### File sample
> Take a look inside `/user/me/get.js`

```javascript
const request = (headers, body, query) => {
  if (!('x-token' in headers)) {
    // @XXX Reject request
    throw new Error('Missing x-token header');
  }
};

const response = () => ({
  success: true,
  data: {
    id: 1,
    username: 'dotmind',
    email: 'hello@dotmind.io',
  },
});

module.exports = {
  request,
  response,
};

```

Only two optionals methods are availables

**Request**

```javascript
const request = (
  headers: Array<string>,
  body: {},
  query: {},
): void => {};
```

**Response**

```javascript
const response = (): {} => ({});
```

### Availables endpoints

| method | path |
| :------: | :------: | :---------------------------------------- |
|  `GET`   |    `/`    |
|  `GET`   |    `/user`    |
|  `GET`   |    `/user/me`    |
|  `POST`   |    `/user/me`    |
|  `GET`   |    `/user/1`    |
|  `PUT`   |    `/user/1`    |
|  `DELETE`   |    `/user/1`    |
|  `POST`   |    `/user/1`    |

## 👾 Debug

Only add `.debug` after your repository name

> Like this https://dotmy.herokuapp.com/{repository-name}.debug/

**Debug**

```javascript
{
  ...payload
  mockcode: number,
  debug: {
    time: number, // Request time delay
    repo: string, // Target repo
    path: string, // Endpoint file
    content: string, // File content
    request: {
      method: string,
      query: {},
      body: {},
      headers: {},
    },
  },
}
```

## 🚧 WIP

- [ ] List repository endpoints
- [ ] Switch branch
- [ ] Payload template