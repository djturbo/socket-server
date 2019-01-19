import Server from './classes/server.class';
import router from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


const server = Server.instance;
// BodyParser
server.app.use(bodyParser.urlencoded({ extended: true }));
server.app.use(bodyParser.json());
// cors
server.app.use(cors({ origin: true, credentials: true }))


// rutas
server.app.use('/', router);

server.start( () => {
    console.log('server is listening in the port: ', server.port);
} );