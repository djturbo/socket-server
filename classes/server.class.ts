import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import { Http2Server } from 'http2';

import * as sockets from '../sockets';
import { User } from '../model/indes';


export default class Server {

    private static _instance: Server;

    public app: express.Application;;
    public port: number;

    public io: socketIO.Server;
    private _httpServer: Http2Server;

    private constructor() {
        this.app = express();
        this.port = SERVER_PORT;
    
        this._httpServer = new http.Server( this.app );
        this.io = socketIO( this._httpServer );

        this._listenSockets();
    }

    public static get instance(): Server {
        return this._instance || (this._instance = new this());
    }

    start( callback: Function ) {
        this._httpServer.listen(this.port, callback);
    }


    private _listenSockets() {

        this.io.on('connection', client => {
            console.log('client connected: ', client.id);
            sockets.connectClient(client, this.io);
            sockets.disconnect(client, this.io);
            sockets.message(client, this.io);
            sockets.join(client, this.io);
            sockets.getUsers(client, this.io);
        });
    }
}
