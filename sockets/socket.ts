import { Socket } from 'socket.io'
import socketIO from 'socket.io';

export const disconnect = ( client: Socket ) => {
    client.on('disconnect', () => {
        console.log('cliente desconectado.')
    });
};

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on('message', ( msg: any ) => {
        console.log('Mensaje recibido: ', msg.from, ' ', msg.body);
        io.emit('new-message', msg);
    });
};
