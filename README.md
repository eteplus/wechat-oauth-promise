# Wechat OAuth Promise

Wechat OAuth for ES6 with Promise support。
微信公共平台OAuth接口API SDK

OAuth2.0网页授权，使用此接口须通过微信认证，用户在微信中访问公众号的第三方网页，
公众号开发者可以通过此接口获取当前用户基本信息。详细信息：[官方文档](http://mp.weixin.qq.com/wiki/17/c0f37d5704f0b64713d5d2c37b468d75.html)

## Usage

### 初始化

```js
import WechatOAuthPromise from 'wechat-oauth-promise';
let oauth = new WechatOAuthPromise('your appid', 'your secret', (openid, token) => {
  // 自定义保存AccessToken方法
}, (openid) => {
  // 自定义获取AccessToken方法
});
```
接口默认提供保存和获取AccessToken的方法
```js
// default saveToken function
async saveToken(openid = '', token) {
  if (openid === '') {
    let error = new Error('Openid can\'t allow empty');
    return Promise.reject(error);
  }

  let fileName = `${openid}-access-token.txt`;
  let result = await writeFile(fileName, JSON.stringify(token)).catch((error) => {
    return Promise.reject(error);
  });
  return Promise.resolve(result === 'Succeed');
}

// default getToken function
async getToken(openid = '') {
  if (openid === '' || !openid) {
    let error = new Error('Openid can\'t allow empty');
    return Promise.reject(error);
  }

  let fileName = `${openid}-access-token.txt`;
  let data = await readFile(fileName).catch((error) => {
    return Promise.reject(error);
  });
  return Promise.resolve(JSON.parse(data));
}
```

### 引导用户

生成引导用户点击的URL

```js
// scope 默认为 snsapi_base
let url = oauth.getAuthorizeURL('redirect_uri', 'state', 'scope');
```

### 获取AccessToken和Openid

用户点击上步生成的URL后会被重定向到上步设置的 redirect_uri，并且会带有code参数，
使用code换取access_token和用户的openid

```js
// 如果发生错误，token = undefined
let token = await oauth.getAccessToken(code).catch((error) => {
  // 处理错误
});
```

### 获取用户信息

如果生成引导用户点击的URL中scope参数值为snsapi_userinfo，
可以使用getAccessToken获取到的openid请求获取用户详细信息

```js
// 如果发生错误，userInfo = undefined
let userInfo = await oauth.getUserInfo(token.openid).catch((error) => {
  // 处理错误
});
```

## License
The MIT license.
