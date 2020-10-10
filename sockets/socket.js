const {io} = require('../index.js')


// Mensajes de SOCKETS (ESTO ES EL SERVIDOR)
// este escucha si existen clientes
io.on('connection', client => {

    console.log('Cliente conectado');
    client.on('disconnect', () => {
        console.log('Cliente desconectado');
    });

    client.on('mensaje', (payload)=> {
        console.log('Mensaje :', payload);
        io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

});