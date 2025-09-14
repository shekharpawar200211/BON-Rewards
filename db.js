import Database from "better-sqlite3";
import { schema } from "./schema.js";

const sqlite = new Database("./db.sqlite");

sqlite.exec(schema);

export const db = {
  prepare: (sql) => {
    const stmt = sqlite.prepare(sql);
    return {
      get: (...params) => stmt.get(...params),
      all: (...params) => stmt.all(...params),
      run: (...params) => stmt.run(...params),
    };
  },
};
