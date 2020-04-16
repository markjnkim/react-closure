const sqlite3 = require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', err => {
  if(err) throw new Error(err);
  console.log('Connected to the in-memory SQLite database.')
});


db.close(err => {
  if(err) throw new Error(err);
  console.log('Database connection has closed');
})