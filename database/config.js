const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    mongoose.set('strictQuery', false);
    mongoose.connect(process.env.DB_CNT, { useNewUrlParser: true });

    console.log('Mongo DB connected!!');
  } catch (error) {
    console.log(error);
    throw new Error('Error ocurr during Mongo DB Connection');
  }
};

module.exports = {
  dbConnection,
};
