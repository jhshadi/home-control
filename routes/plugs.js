var express = require('express');
var router = express.Router();

const miio = require('miio');

const DISCOVERY_TIMEOUT = 2 * 1000;

router.get('/', function (req, res, next) {
    const browser = miio.browse({
        cacheTime: 5
    });

    browser.on('available', reg => {
        console.info('Connected to', reg);
    });

    setTimeout(() => {
        res.status(200).send();
    }, DISCOVERY_TIMEOUT);
});


router.get('/:pid(\\d+)/:status(on|off)', function (req, res, next) {
    const browser = miio.browse({
        cacheTime: 5
    });

    const devices = {};
    browser.on('available', reg => {
        if (reg.id.toString() !== req.params.pid) {
            return;
        }

        miio.device({address: reg.address})
            .then(device => {
                console.info('Connected to', device);
                devices[reg.id] = device;

                return device.power(req.params.status === 'on');
            })
            .then(device => {
                console.info('Setting plug ' + req.params.pid + ' to status: ' + req.params.status + "[" + device + "]");
            })
            .catch(err => {
                console.error(err);
                res.status(500);
            })
            .then(() => {
                const device = devices[reg.id];
                if (!device) return;

                device.destroy();
                delete devices[reg.id];

                res.send();
            })
    });

    setTimeout(() => {
        res.status(503).send();
    }, DISCOVERY_TIMEOUT);
});

module.exports = router;
