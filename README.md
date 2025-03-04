# MacOS Lock and Power State Observer

A process that reacts to changes of the MacOS lock state, saving them to a file. Recently changed to also record when the macOS is started, put to sleep, or shutdown.

## How the states are monitored

Shutdown and start are indirectly detected, respectively through process start and SIGTERM. Sleep is monitored by listening to the willSleepNotification notification on NSWorkspace. Finally, lock state is observed by reacting to the notifications screenIsLocked and screenIsUnlocked from the Distributed Notification Center.

## Compilation (Release)

```bash
swift build -c release
```

## Installation

1. After compilation, move the release binary from `.build/arm64-apple-macosx/release` to `~/Library/EduardoCamaratta/`.
2. Replace the key `$BINARY_ABSOLUTE_PATH` on `plists/com.eduardocamaratta.lockstateobserver.plist` with the absolute path for the binary you moved on the previous step. Move the edited plist to `~/Library/LaunchAgents`.

## Accessing recorded data

The type of event and exact time it happened are recorded to a text file called log.txt saved on /Users/<user>/Documents/.lockStateObserver. There's no cleanup, recycling, sliding window, etc. In case too many events are recorded and freeing some space is needed, entries have to be manually removed from the log file.

## Local logs server

Alternatively, in order to be able to fetch the log file data from a webpage, there's a very simple server implemented with Vapor in logs-server-vapor. This server responss only to one route on `/logs` with the full updated content of the log file in plain text. By default the server runs on port 7654. The Access-Control-Allow-Origin header contains '*'.

### Compilation (Release)

```bash
swift build -c release
```

### Installation

1. Copy the binary `logs-server` from `.build/arm64-apple-macosx/release/` to `~/Library/EduardoCamaratta`.
2. Replace the key `$BINARY_ABSOLUTE_PATH` on `plists/com.eduardocamaratta.locklogsserver.plist` with the absolute path for the binary you just moved. Move the plist to `~/Library/LaunchAgents`.

### Accesing data

`curl 127.0.0.1:7654/logs` works just fine. To fetch the data with node or on a webpage:

```javascript
fetch('http://127.0.0.1:7654/logs').then(response => response.text()).then(t => console.log(t))
```

## Planned Improvements

* Installation script.
* Add possibility to send recorded data to Firestore via REST API.