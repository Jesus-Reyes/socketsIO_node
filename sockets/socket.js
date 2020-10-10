const {io} = require('../index.js');
const Band = require('../models/band.js');
const Bands = require('../models/bands.js');

const bands = new Bands();

bands.addBand(new Band('Queen'));
bands.addBand(new Band('Metallica'));
bands.addBand(new Band('Bon'));
bands.addBand(new Band('Ben Bohmer'));




// Mensajes de SOCKETS (ESTO ES EL SERVIDOR)
// este escucha si existen clientes
io.on('connection', client => {
    console.log('Cliente conectado');

    
    client.emit('active-bands', bands.getBands());
    client.on('disconnect', () => {
        console.log('Cliente desconectado');

    });

    client.on('mensaje', (payload)=> {
        console.log('Mensaje :', payload);
        // io.emit('mensaje', {admin: 'nuevo mensaje'});
    });

    // client.on('emitir-mensaje', (payload)=> {
    //     // console.log(payload);
    //     const nombre = payload.nombre;
    //     //io.emit('nuevo-mensaje', payload);  // Emite a todos
    //     client.broadcast.emit('nuevo-mensaje', payload);  // Emite a todos menos el que hablo
    //     // client.broadcast()
    // });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        console.log(payload.name);
        const newBand = new Band(payload.name);
        bands.addBand(newBand);
        io.emit('active-bands', bands.getBands());
    });


    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

});