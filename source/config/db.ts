import mysql from 'mysql';
import config from './config';

const params = {
    user: config.mysql.user,
    password: config.mysql.pass,
    host: config.mysql.host,
    database: config.mysql.database
};

import { DataSource } from 'typeorm';
import { User } from '../models/user.model';
import { Car } from '../models/car.model';
import { ParkingZone } from '../models/parkingZones.model';
import { ParkingHistory } from '../models/parkingHistory.model';

const dataSource = new DataSource({
    type: 'mysql',
    host: config.mysql.host,
    port: 3306,
    username: config.mysql.user,
    password: config.mysql.pass,
    database: config.mysql.database,
    entities: [User, Car, ParkingZone, ParkingHistory],
    logging: false,
    synchronize: true
});

export default dataSource;

const Connect = async () =>
    new Promise<mysql.Connection>((resolve, reject) => {
        const connection = mysql.createConnection(params);

        connection.connect((error) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(connection);
        });
    });

const Query = async <T>(connection: mysql.Connection, query: string) =>
    new Promise<T>((resolve, reject) => {
        connection.query(query, connection, (error, result) => {
            if (error) {
                reject(error);
                return;
            }

            resolve(result);

            connection.end();
        });
    });

export { Connect, Query };
