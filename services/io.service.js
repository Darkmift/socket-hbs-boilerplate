var ioInstance = null;

function socketService(server) {
    ioInstance = require('socket.io')(server);

    ioInstance.on('connection', (socket) => {
        console.log('connected');

        socket.on('disconnect', (socket) => {
            console.log('Someone disconnected');
        });

        //custom listeners
        socket.on('chat message', (message) => {
            console.log(
                '🚀 ~ file: io.service.js ~ line 15 ~ socket.on ~ message',
                message
            );

            ioInstance.emit('chat message', 'response from server');
        });
    });
}

module.exports = {
    socketService,
};
