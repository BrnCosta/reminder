import { DatabaseConnection } from '../database/databaseConnection';

import { ScheduleService } from './ScheduleService';

import Moment from 'moment';
import 'moment/locale/pt-br';

const db = DatabaseConnection.getConnection();

export const TaskService = {
    getNotDone: () => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql(
                'select * from TasksReminder where done=0', [], (_, { rows: data }) => {
                    response(data);
                }
            ), (sqlError) => {
                request(sqlError);
            }
        }, (txError) => {
            request(txError);
        }
    )),

    getOne: (id) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql(
                'select * from TasksReminder where id=(?)', [id], (_, { rows: data }) => {
                    response(data);
                }
            ), (sqlError) => {
                request(sqlError);
            }
        }, (txError) => {
            request(txError);
        }
    )),

    addTask: (data, scheduleID) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql('insert into TasksReminder(title, description, date, time, done, scheduleID) values((?), (?), (?), (?), 0, (?))',
            [data.title, data.description, data.date, data.time, scheduleID],
                (_, { insertId, rows }) => {
                    response(insertId);
                },
                (_, sqlError) => {
                    request(sqlError);
                }
            ), (txError) => request(txError)
        }
    )),

    updateTask: (id, data, scheduleID) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql('update TasksReminder set title=(?), description=(?), date=(?), time=(?), scheduleID=(?) where id=(?)',
            [data.title, data.description, data.date, data.time, scheduleID, id],
            (_, { rowsAffected }) => {
                    response(rowsAffected);
                },
                (_, sqlError) => {
                    request(sqlError);
                }
            ), (txError) => request(txError)
        }
    )),

    setTaskDone: (id) => new Promise(async (response, request) => {

        const getSchedule = new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'select scheduleID from TasksReminder where id=(?)', [id], (_, { rows: data }) => {
                            resolve(data._array[0].scheduleID);
                        }
                    ), (sqlError) => {
                        reject(sqlError);
                    }
                }, (txError) => {
                    reject(txError);
                }
            );
        });

        const scheduleID = await getSchedule;
        await ScheduleService.deleteSchedule(scheduleID);

        db.transaction(
            tx => {
                tx.executeSql(
                    'update TasksReminder set done=1 where id=(?)', [id], (_, { rowsAffected }) => {
                        response(rowsAffected);
                    }
                ), (sqlError) => {
                    request(sqlError);
                }
            }, (txError) => {
                request(txError);
            }
        );
    }),

    setTaskNotDone: (id) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql('update TasksReminder set done=0 where id=(?)', [id],
            (_, { rowsAffected }) => {
                    response(rowsAffected);
                },
                (_, sqlError) => {
                    request(sqlError);
                }
            ), (txError) => request(txError)
        }
    )),

    deleteTask: (id) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql(
                'delete from TasksReminder where id=(?)', [id], (_, { rowsAffected }) => {
                    response(rowsAffected);
                }
            ), (sqlError) => {
                request(sqlError);
            }
        }, (txError) => {
            request(txError);
        }
    )),

    setDoneByNotification: (scheduleID) => new Promise((response, request) => db.transaction(
        tx => {
            tx.executeSql('update TasksReminder set done=1 where scheduleID=(?)', [scheduleID],
            (_, { rowsAffected }) => {
                    response(rowsAffected);
                },
                (_, sqlError) => {
                    request(sqlError);
                }
            ), (txError) => request(txError)
        }
    )),

    rescheduleNotification: (scheduleID) => new Promise(async (response, request) => {
        const time = Moment().add('5', 'minutes').format('HH:mm');
        const date = Moment().add('5', 'minutes').format('YYYY-MM-DD');

        const getTask = new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql(
                        'select * from TasksReminder where scheduleID=(?)', [scheduleID], (_, { rows: data }) => {
                            resolve(data._array[0]);
                        }
                    ), (sqlError) => {
                        reject(sqlError);
                    }
                }, (txError) => {
                    reject(txError);
                }
            );
        });

        const task = await getTask;

        scheduleID = await ScheduleService.rescheduleTask(task, date, time);

        const updateTask = new Promise((resolve, reject) => {
            db.transaction(
                tx => {
                    tx.executeSql('update TasksReminder set time=(?), date=(?), scheduleID=(?) where id=(?)', [time, date, scheduleID, task.id],
                    (_, { rowsAffected }) => {
                            resolve(rowsAffected);
                        },
                        (_, sqlError) => {
                            reject(sqlError);
                        }
                    ), (txError) => reject(txError)
                }
            );
        });

        const update = await updateTask;
        console.log('Notificação reagendada.');
    }),
};