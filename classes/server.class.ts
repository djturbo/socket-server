import express from 'express';
import { SERVER_PORT } from '../global/environment';
import socketIO from 'socket.io';
import http from 'http';
import { Http2Server } from 'http2';

export default class Server {
    public app: express.Application;;
    public port: number;

    public io: socketIO.Server;
    private _httpServer: Http2Server;

    constructor() {
        this.app = express();
        this.port = SERVER_PORT;
    
        this._httpServer = new http.Server( this.app );
        this.io = socketIO( this._httpServer );

        this._listenSockets();
    }

    start( callback: Function ) {
        this._httpServer.listen(this.port, callback);
    }


    private _listenSockets() {
        console.log('listening conections - sockets');

        this.io.on('connection', client => {
            console.log('New client connected: ', client);
        })
    }
}
