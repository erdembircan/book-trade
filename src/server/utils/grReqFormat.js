const baseAdresss = ' https://www.goodreads.com/search/index.xml?';

const getReqAdress = (queries) => {
  const adressArray = [];

  Object.keys(queries).map((key) => {
    const query = `${key}=${queries[key]}`;
    adressArray.push(query);
  });

  return baseAdresss + adressArray.join('&');
};

export default getReqAdress;
