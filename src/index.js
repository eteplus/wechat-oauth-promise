import qs from 'querystring';
import request from 'request';
import {
  readFile,
  writeFile,
  handleError
} from './utils';

const getToken = Symbol('getToken');
const saveToken = Symbol('saveToken');

/**
 * @export
 * @class WechatOAuthPromise
 */
export default class WechatOAuthPromise {

  /**
   * Creates an instance of WechatOAuthPromise.
   * @param {string} [appid=''] 公众号的appid
   * @param {string} [appsecret=''] 公众号的appsecret
   * @param {function} [saveTokenFn] 保存AccessToken的方法
   * @param {function} [getTokenFn] 获取AccessToken的方法
   */
  constructor(appid = '', appsecret = '', saveTokenFn, getTokenFn) {
    this.appid = appid;
    this.appsecret = appsecret;
    this.saveToken = typeof saveTokenFn === 'function' ? saveTokenFn : this[saveToken];
    this.getToken = typeof saveTokenFn === 'function' ? getTokenFn : this[getToken];
  }

  /**
   * 获取用户授权的跳转链接
   *
   * @param {string} redirect_uri 授权成功后需要跳转到的链接
   * @param {string} [state=''] 开发者可提供的数据
   * @param {string} [scope='snsapi_base'] 授权权限 (snsapi_base | snsapi_userinfo)
   * @return {string} authorized url
   */
  getAuthorizeUrl(redirect_uri, state = '', scope = 'snsapi_base') {
    let url = 'https://open.weixin.qq.com/connect/oauth2/authorize';
    let params = {
      appid: this.appid,
      redirect_uri: redirect_uri,
      response_type: 'code',
      scope: scope,
      state: state
    };
    return `${url}?${qs.stringify(params)}#wechat_redirect`;
  }

  /**
   * 根据授权获取到的code，换取access token和openid
   *
   * @param {string} code 授权获取到的code
   * @return {promise}
   */
  getAccessToken(code) {
    let url = 'https://api.weixin.qq.com/sns/oauth2/access_token';
    let params = {
      appid: this.appid,
      secret: this.appsecret,
      code: code,
      grant_type: 'authorization_code'
    };
    let options = {
      method: 'POST',
      url: url,
      qs: params,
      json: true
    };
    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          error.name = 'API' + error.name
          reject(error);
        }
        if (body.errcode) {
          reject(handleError(body));
        }
        resolve(body);
      })
    });
  }

  refreshAccessToken() {

  }

  checkAccessToken() {}

  async getUserInfo(openid = '') {
  }

  /**
   * 保存AccessToken到文件中, 若跨进程或者跨机器级别获取AccessToken
   * 可以保存到数据库中, 每个openid对应一个唯一的token
   *
   * @param {string} [openid='']
   * @return {promise}
   */
  async [getToken](openid = '') {
    if (openid === '' || !openid || openid == '123') {
      let error = new Error('Openid can\'t allow empty');
      return Promise.reject(error);
    }

    let fileName = `${openid}-access-token.txt`;
    let data = await readFile(fileName).catch((error) => {
      return Promise.reject(error);
    });
    return Promise.resolve(JSON.parse(data));
  }


  /**
   * Save AccessToken to File
   *
   * @param {string} [openid='']
   * @param {json} token
   * @param {function} callback
   * @return {promise}
   */
  async [saveToken](openid = '', token) {
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
}
