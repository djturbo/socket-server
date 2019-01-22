import { Socket } from 'socket.io'
import socketIO from 'socket.io';
import { User } from '../model/user.model';
import { UsersManager } from '../classes/users-manager.class';

export const usersManager = new UsersManager();

export const disconnect = ( client: Socket ) => {
    client.on('disconnect', () => {
        const exitUser = usersManager.removeUser(client.id);
        console.log('cliente %s desconectado.', exitUser);
    });
};

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on('message', ( msg: any ) => {
        console.log('Mensaje recibido: ', msg.from, ' ', msg.body);
        io.emit('new-message', msg);
    });
};

export const connectClient = (client: Socket, io: socketIO.Server) => {
    const user = new User(client.id);
    const newUser = new User(client.id);
    usersManager.addUser(newUser);
}

export const join = (client: Socket, io: socketIO.Server) => {
    client.on('setup-user', ( user: User, callback: Function ) => {
        let joinedUser = null;
        joinedUser = usersManager.updateUsername(client.id, user.username)
        if (!joinedUser) {
            joinedUser = new User(client.id, user.username);
            usersManager.addUser(joinedUser);
            console.log('usuario recibido: ', joinedUser);
        }
        
        callback({
            ok: true,
            user: joinedUser,
            message: 'Usuario unido correctamente a la sala de chat.'
        });
        // if (!users.find(u => u.username === user.username)) {

            io.emit('user-joined', usersManager.list);
       // }
    });

};

