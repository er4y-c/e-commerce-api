export default () => ({
  port: parseInt(process.env.PORT || '8000', 10),
  mongo: process.env.MONGO || 'mongodb://localhost:27017/example_db',
  supabase_url: process.env.SUPABASE_URL,
  supabase_key: process.env.SUPABASE_KEY,
  iyzico_api: process.env.IYZICO_API,
  iyzico_api_key: process.env.IYZICO_API_KEY,
  iyzico_secret_key: process.env.IYZICO_SECRET_KEY,
  payment_base_callback_uri: process.env.PAYMENT_BASE_CALLBACK_URI,
});
