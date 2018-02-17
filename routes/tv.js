var express = require('express');
var router = express.Router();

var Bravia = require('bravia');

/*
    Actions Codes:
    https://github.com/arnif/sony-bravia-remote/blob/master/src/ActionMap.js
*/
const inputMap = {
    tv: 'AAAAAQAAAAEAAAAkAw==',
    hdmi1: 'AAAAAgAAABoAAABaAw==',
    hdmi2: 'AAAAAgAAABoAAABbAw==',
    hdmi3: 'AAAAAgAAABoAAABcAw==',
    hdmi4: 'AAAAAgAAABoAAABdAw=='
};

router.get('/volume/level/:vol(\\d*)', function (req, res, next) {
    connect()
        .then(bravia => bravia.audio.invoke('setAudioVolume', '1.0', {target: 'speaker', volume: req.params.vol.toString()}))
        .catch(err => {
            console.error(err);
            res.status(500);
        })
        .then(() => res.send());
});

router.get('/volume/mute/:status(true|false)', function (req, res, next) {
    connect()
        .then(bravia => bravia.audio.invoke('setAudioMute', '1.0', {status: req.params.status === 'true'}))
        .catch(err => {
            console.error(err);
            res.status(500);
        })
        .then(() => res.send());
});

router.get('/input/:type', function (req, res, next) {
    connect()
        .then(bravia => bravia.send(inputMap[req.params.type]))
        .catch(err => {
            console.error(err);
            res.status(500);
        })
        .then(() => res.send());

});

function connect() {
    return new Promise((resolve, reject) => {
        // The time in milliseconds for the bravia discovery to scan for.
        let timeout = 3 * 1000;
        let promiseTimeout = timeout *2;


        // Attempts to discover any Sony Bravia TVs.
        Bravia.discover(timeout)
            .then(devices => {
                if (devices.length > 0) {
                    const device = devices[0];
                    console.debug('Connected to', device);

                    return resolve(new Bravia(device.host, device.port, '0000'));
                }
            })
            .catch(err => reject(err));

        setTimeout(() => {
            reject("Timeout: tv did not respond after " + promiseTimeout + "ms");
        }, promiseTimeout * 2);
    });
}

module.exports = router;
