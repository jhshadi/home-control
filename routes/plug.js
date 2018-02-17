var express = require('express');
var router = express.Router();

const miio = require('miio');

const statusMapper = {
    on: true,
    off: false
};

router.get('/:pid(\\d+)/:state(on|off)', function (req, res, next) {
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

                return device.power(statusMapper[req.params.state]);
            })
            .then(device => {
                console.info('Setting plug ' + req.params.pid + ' to state: ' + req.params.state + "[" + device + "]");
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
    }, 2 * 1000);
});

module.exports = router;
