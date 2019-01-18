import { Router, Request, Response } from 'express';

const router = Router();

router.get('/messages', (req: Request, res: Response) => {
    res.json({
        ok: true,
        message: 'all is ok'
    })
});

router.post('/messages', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de

    res.json({
        ok: true,
        cuerpo,
        de
    })
});


router.post('/messages/:id', (req: Request, res: Response) => {

    const cuerpo = req.body.cuerpo;
    const de = req.body.de
    const id = req.params.id;
    res.json({
        ok: true,
        id,
        cuerpo,
        de
    })
});

export default router;
