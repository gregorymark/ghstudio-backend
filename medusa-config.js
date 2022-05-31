// CORS when consuming Medusa from admin
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusastore";

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `medusa-payment-stripe`,
    options: {
      api_key: STRIPE_API_KEY,
      webhook_secret: STRIPE_WEBHOOK_SECRET,
    },
  },
  {
    resolve: `medusa-file-s3`,
    options: {
      s3_url: "https://ghstudio.s3.eu-west-2.amazonaws.com",
      bucket: "ghstudio",
      region: "eu-west-2",
      access_key_id: "AKIAUWFPV3CX7YGGHCVP",
      secret_access_key: process.env.AWS_S3_SECRET,
    },
  },
  {
    resolve: `medusa-plugin-sendgrid`,
    options: {
      api_key: process.env.SENDGRID_API_KEY,
      from: `Greg Hannan Studio <info@greghannan.studio>`,
      order_placed_template: `d-9e6dd34482694f078c3c084777f4c18e`,
      order_canceled_template: `d-0a46dffb0b324bd08e4a19485ebcf586`,
      order_shipped_template: `d-e2b96af512fb4a71bc60f1e049df637c`,
      user_password_reset_template: `d-4755689fdeaf4365b31cea23d7dcfaa9`,
      customer_password_reset_template: `d-9c05df427fed4eb9b73326c7ed603c2e`,
    },
  },
];

module.exports = {
  projectConfig: {
    redis_url: REDIS_URL,
    database_url: DATABASE_URL,
    database_type: "postgres",
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
  },
  plugins,
};
