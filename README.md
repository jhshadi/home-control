# home-control

Small node (express) web server to control smart devices around my home.

### Currently supports:
- Mi smart plugs
- Sony Bravia TVs

### API
##### Plugs
- /plugs/
- /plugs/{plug_id}/{on|off}

#### TVs
- /tv/volume/level/{1-100}
- /tv/volume/mute/{on|off}
- /tv/input/{tv|hdmi{1-4}}
- /tv/power/{on|off}

### TODO
- Add TV 'id' identifier
- Add TV power on endpoint
- Add ssl cert
- Add more informative logs (timestamps etc)