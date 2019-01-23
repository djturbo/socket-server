import { Router, Request, Response } from 'express';
import Server from '../classes/server.class';
import { usersManager } from '../sockets/'
const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'all is ok'
    })
});

router.post('/messages', (req: Request, res: Response) => {

    const message = req.body.message;
    const from = req.body.from
    const id = req.params.id;
    const payload = {
        from: from, 
        body: message
    };

    const server = Server.instance;

    server.io.emit('new-message', payload);

    res.json({
        ok: true,
        id,
        message,
        from
    })
});


router.post('/messages/:id', (req: Request, res: Response) => {

    const message = req.body.message;
    const from = req.body.from
    const id = req.params.id;
    const payload = {
        from: from, 
        message: message
    };

    const server = Server.instance;

    server.io.in( id ).emit('private-message', payload);

    res.json({
        ok: true,
        id,
        message,
        from
    })
});
// Usuarios
router.get('/users', (req: Request, res: Response) => {
    const server = Server.instance;
    server.io.clients( (err: any, clients: string[]) => {
        if ( err ) {
            res.json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            clients
        });
    } )
});

router.get('/users/detail', (req: Request, res: Response) => {
    usersManager
    res.json({
        ok: true,
        clients: usersManager.list
    });
});

export default router;
