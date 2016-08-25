import fs from 'fs';


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
      resolve('Successed');
    });
  });
};

export const handleError = (error) => {

}
