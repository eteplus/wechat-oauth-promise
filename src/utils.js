import fs from 'fs';
import request from 'request';

export const readFile = (fileName) => {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, 'utf8', (error, data) => {
      if (error) {
        reject(error);
      }
      resolve(data);
    });
  });
};

export const writeFile = (fileName, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(fileName, data, 'utf8', (error) => {
      if (error) {
        reject(error);
      }
      resolve('Succeed');
    });
  });
};

export const handleError = (data) => {
  let error = new Error(data.errmsg);
  error.name = 'APIError';
  error.code = error.errcode;
  return error;
};

export const handleRequest = (options) => {
  return new Promise((resolve, reject) => {
    request(options, (error, response, body) => {
      if (error) {
        error.name = `API ${error.name}`;
        reject(error);
      }
      if (body.errcode) {
        reject(handleError(body));
      }
      resolve(body);
    });
  });
};
