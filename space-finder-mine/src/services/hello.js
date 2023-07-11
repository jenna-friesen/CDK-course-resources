exports.main = async function (event, context) {
  return {
    statusCode: 200,
    body: JSON.stringify(`hello from lambda!  I will read from ${process.env.TABLE_NAME}`),
  };
};
