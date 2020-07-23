import { DatabaseConnection } from './databaseConnection';
import * as FileSystem from 'expo-file-system';
import * as DocumentPicker from 'expo-document-picker';

export const Database = {

    Init: async () => {
        const db = DatabaseConnection.getConnection();

        const sql = `CREATE TABLE IF NOT EXISTS "TasksReminder" (
                "id"	INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                "title"	STRING NOT NULL,
                "description"	STRING,
                "date"	DATE NOT NULL,
                "time"	TIME NOT NULL,
                "done"	INTEGER NOT NULL,
                "scheduleID" STRING);`

        db.transaction(
            (tx) => {
                tx.executeSql(sql);
            }
        );

        console.log('Banco de dados iniciado!');
    }
}