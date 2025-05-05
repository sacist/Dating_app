const Database = require('better-sqlite3');
const pool = require('./config/db'); // твой модуль с pool'ом

(async () => {
    try {
      const sqliteDb = new Database('./api_keys.db');
      const rows = sqliteDb.prepare('SELECT key FROM api_keys').all();
  
      let successCount = 0;
      for (const { key } of rows) {
        try {
          await pool.query(
            `INSERT INTO api_keys (api_key) VALUES ($1) ON CONFLICT (api_key) DO NOTHING`,
            [key]
          );
          console.log(`✔️ Inserted: ${key}`);
          successCount++;
        } catch (err) {
          console.error(`❌ Failed to insert ${key}:`, err.message);
        }
      }
  
      sqliteDb.close();
      await pool.end();
      console.log(`✅ Migration completed. ${successCount} key(s) inserted.`);
    } catch (err) {
      console.error('🔥 Migration failed:', err);
    }
  })();