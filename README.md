# home-control

Small node (express) web server to control smart devices around my home.

### Currently supports:
- Mi smart plugs
- Sony Bravia TVs

### API
##### Plugs
- /plugs/{plug_id}/{on|off}

#### TVs
- /tv/volume/level/{1-100}
- /tv/volume/mute/{on|off}
- /tv/input/{tv|hdmi{1-4}}
- /tv/power/{on|off}

### TODO
- Add TV 'id' identifier
- Add TV power on/off endpoint
- Add ssl cert
- API Updates:
  - REST API plurals convention
  - Clean unnecessary files
- Add timetamp to logs and more informative logs