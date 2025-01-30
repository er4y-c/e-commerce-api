export default () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  mongo: process.env.MONGO || 'mongodb://localhost:27017/example_db',
});
