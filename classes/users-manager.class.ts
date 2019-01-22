import { User } from '../model/user.model';
export class UsersManager {
    private _list: User[] = [];

    public constructor() {}


    public addUser(user: User) {
        this._list.push(user);
        console.log('usuario agreagado a lalista: ', user);
        return user;
    }

    public updateUsername(id: string, username: string) {
        const user = this._list.find(u => u.id === id);
        if ( user ) {
            user.username = username;
            console.log('user was updated ', user);
        }
        
        return user;
    }

    public get list(): User[] {
        return this._list;
    }

    public getUser (id: string) {
        return this._list.find(u => u.id === id);
    }

    public getUsersByRoom(room: string): User[] {
        return this._list.filter(u => u.room === room);
    }

    public removeUser(id: string) {
        const toDel = this.getUser(id);
        this._list = this._list.filter(u => u.id !== id);
        return toDel;
    }
}