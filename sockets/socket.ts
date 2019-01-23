import { Socket } from 'socket.io'
import socketIO from 'socket.io';
import { User } from '../model/user.model';
import { UsersManager } from '../classes/users-manager.class';

export const usersManager = new UsersManager();

export const disconnect = ( client: Socket, io: socketIO.Server ) => {
    client.on('disconnect', () => {
        const exitUser = usersManager.removeUser(client.id);
        console.log('cliente %s desconectado.', exitUser);
        io.emit('active-users', usersManager.list);
    });
};

export const message = ( client: Socket, io: socketIO.Server ) => {
    client.on('message', ( msg: any ) => {
        console.log('Mensaje recibido: ', msg.from, ' ', msg.body);
        io.emit('new-message', msg);
    });
};

export const connectClient = (client: Socket, io: socketIO.Server) => {
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
        }
        if (callback) {
            callback({
                ok: true,
                user: joinedUser,
                message: 'Usuario unido correctamente a la sala de chat.'
            });
        }
        // if (!users.find(u => u.username === user.username)) {
            console.log('emiting active-users: ', usersManager.list);
            io.emit('active-users', usersManager.list);
       // }
    });

};

export const getUsers = (client: Socket, io: socketIO.Server) => {
    client.on('get-users', () => {

        // if (!users.find(u => u.username === user.username)) {
            console.log('emiting get-users: ', usersManager.list);
            io.to(client.id).emit('active-users', usersManager.list);
            // io.emit('active-users', usersManager.list);
       // }
    });

};

