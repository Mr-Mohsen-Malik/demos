import client from '../db/db_connection';


let chat;

export default chat = async (io) => {

  let users = 0;

  try {
    let db = await client();
    let col = db.collection('chat');

    const databaseStore = (message) => {
      let storeData = { chatMessage: message, timestamp: new Date().getTime() }
      col.insertOne(storeData, (err, result) => {
        if (err) return console.log(err)
        console.log('saved to database')
      })
    }


    io.on('connection', (socket) => {
      users++;
      console.log('user connected');

      socket.on('disconnect', function () {
        console.log('user disconnected');
      });

      socket.on('add-message', (message) => {
        io.emit('message', { name: 'new-message', text: message });
        
        // Function above that stores the message in the database
        databaseStore(message)

      });

    });


  }
  catch (error) {
    console.log("error", error.message);
  }

}