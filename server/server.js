require('dotenv').config();
const app = require('./src/app');
const { sequelize, seedTemplates } = require('./src/models');

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    // Test DB connection
    await sequelize.authenticate();
    console.log('✅ Database connection established.');

    // Sync all models (alter: true updates tables without dropping data)
    await sequelize.sync({ alter: true });
    console.log('✅ Database tables synced.');

    // Seed default templates if not present
    await seedTemplates();
    console.log('✅ Resume templates seeded.');

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
      console.log(`   Environment: ${process.env.NODE_ENV}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
}

startServer();
