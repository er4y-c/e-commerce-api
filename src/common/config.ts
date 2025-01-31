export default () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  mongo: process.env.MONGO || 'mongodb://localhost:27017/example_db',
  supabase_url: process.env.SUPABASE_URL,
  supabase_key: process.env.SUPABASE_KEY,
});
