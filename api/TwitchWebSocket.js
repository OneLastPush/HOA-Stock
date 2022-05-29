
module.exports = {
    getTwitchToken: function (TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_GET_TOKEN, callback) {
        const request = require('request')

        const options = {
            url: TWITCH_GET_TOKEN,
            json: true,
            body: {
                client_id: TWITCH_CLIENT_ID,
                client_secret: TWITCH_CLIENT_SECRET,
                grant_type: 'client_credentials',
                code: '3ka4s84g3w4dd6rcudacptkzwa51t2',
                redirect_uri: 'http://localhost:3000'
            }
        }

        request.post(options, (err, res, body) => {
            if (err)
                return console.error(err, null)

            callback(null, body)
        })
    },
    getTwitchToken: function (TWITCH_CLIENT_ID, TWITCH_CLIENT_SECRET, TWITCH_GET_TOKEN, TWITCH_AUTH_CODE, REDIRECT_URI, callback) {
        const request = require('request')

        const options = { 
            url: TWITCH_GET_TOKEN,
            json: true,
            body: { 
                client_id: TWITCH_CLIENT_ID,
                client_secret: TWITCH_CLIENT_SECRET,
                grant_type: 'authorization_code',
                code: TWITCH_AUTH_CODE,
                redirect_uri: REDIRECT_URI
            }
        } 
        console.log(JSON.stringify(options))
        request.post(options, (err, res, body) => {
            if (err)
                return console.error(err, null)
            console.log(JSON.stringify(res))
            callback(null, body)
        })
    },
    connectToTwitch: (accessToken, botUsername) => {
        const WebSocketClient = require('websocket').client;
        const client = new WebSocketClient();

        client.on('connectFailed', (error) => {
            console.log('Connect Error: ' + error.toString())
        })

        client.on('error', (evt) => {
            console.error(`Connection error: ${evt}`)
        })

        client.on('connect', (connection) => {
            console.log('WebSocket Client Connected')

            connection.sendUTF('CAP REQ :twitch.tv/tags twitch.tv/commands')
            connection.sendUTF(`PASS oauth:${accessToken}`)
            connection.sendUTF('NICK hoa_stockbot');

            connection.sendUTF('JOIN #hoa_stockbot')

            let intervalObj = setInterval(() => {
                connection.sendUTF(`PRIVMSG #hoa_stockbot : Get up and move, your body will thank you!`)
            }, 1000 * 60 * 1);

            connection.on('error', function (error) {
                console.log("Connection Error: " + error.toString())
            });

            connection.on('message', (message) => {
                console.log(`Received Message: ${message.utf8Data}`)
            })

            connection.on('data', (data) => {
                console.log(data.toString());
            });

            connection.on('close', function () {
                console.log('Connection Closed')
                console.log(`close description: ${connection.closeDescription}`)
                console.log(`close reason code: ${connection.closeReasonCode}`)

                clearInterval(intervalObj)
            });
        });

        client.on('close', (reasonCode, description) => {
            console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.')
        });

        client.connect('ws://irc-ws.chat.twitch.tv:80')

    }
}
