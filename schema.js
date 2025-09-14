export const schema = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE
);

CREATE TABLE IF NOT EXISTS bills (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  dueDate TEXT,
  paymentDate TEXT,
  status TEXT,
  FOREIGN KEY(userId) REFERENCES users(id)
);

CREATE TABLE IF NOT EXISTS rewards (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  rewardType TEXT,
  value TEXT,
  issuedAt TEXT,
  expiryDate TEXT,  
  FOREIGN KEY(userId) REFERENCES users(id)
);

`;
