import * as SQLite from 'expo-sqlite';

export interface WebSQLDatabase {
  transaction(callback: (tx: any) => void, error?: (err: any) => void, success?: () => void): void;
}

export default function Connection(): WebSQLDatabase {
  return SQLite.openDatabase('db.db');
}
