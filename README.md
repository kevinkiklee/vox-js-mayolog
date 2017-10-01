![Screenshot](/docs/screenshot.png)

# maYOLOg
maYOLOg is a demo application that utilizes `Logger` which records events, prints to console, searches by key, and submits the log to a server.

## Installation
  * Cloning the repository
    ```
    git clone https://github.com/kevinkiklee/vox-js-mayolog.git
    ```
  * Installing dependencies with Yarn
    ```
    yarn install
    ```
  * Building with Webpack
    ```
    npm run build
    ```
  * Running tests
    ```
    npm run test
    ```

## Usage
  ### Starting `Logger`
  ```javascript
  import Logger from './logger'

  document.addEventListener('DOMContentLoaded', () => {
    const MayoLog = new Logger()
  }
  ```
  * Instantiate `Logger` on `DOMContentLoaded` event.
  * `Logger` utilizes the time of its instantiation as the starting point for all log entry times.

  ### Logging Events
  ```javascript
  const event = 'button clicked'
  const data = { buttonId: 3 }

  MayoLog.log(event, data)

  // {
  //   time: 50,
  //   event: 'button clicked',
  //   data: {
  //     buttonId: 3
  //   }
  // }
  ```
  * `log()` receives `event` string and `data` object and records it.
  * In the specifications, the key is named `log`, but I found it confusing.  Therefore, I replaced it with `event`.
  * Returns the log entry object.

  ### Printing to Console
  ```javascript
    MayoLog.toConsole()
  ```
  ```
  // CONSOLE OUTPUT

  =-=-= Logger! =-=-=
  [1] (199ms) brave friendly moody creaky {"stuffed":"stuffed"}
  [2] (199ms) spoiled cheerful {"lovey":0.5473998884067754,"bashful":"bashful"}
  [3] (200ms) stiff generous afraid sugary {"cozy":0.6034310796682025,"foozle":0.4784475982145382}
  ```

  ### Finding a Key in Data Object
  ```javascript
  const targetKey = 'buttonId'
  const foundEntries = MayoLog.findWithDataAttribute(targetKey)

  console.log(foundEntries)
  // [{ time: 50, event: 'button clicked', data: { buttonId: 3 }]
  ```
  ```
  // CONSOLE OUTPUT

  == Search Result ==
  [1] (50ms) button clicked {"buttonId":3}
  ```
  * The object deep search method utilizes a recursive depth-first search algorithm to find the nested keys.

  ### Submitting Log to a Server
  ```javascript
  const serverUrl = 'http://httpbin.org/post'

  MayoLog.sendToServer(serverUrl)
  ```
  ```
  // CONSOLE OUTPUT

  == Log Submitted ==
  ```
  * Receives the server url as the argument.  The url must include `https://` or `http://`
  * This method utilizes [Chancify](https://github.com/danmakenoise/chancify) package (The following is quoted from its Github page).
    * `chancify(func, percentChance)`
      * `func` : The target function.
      * `percentChance` : A value between 0 and 1.
    * Chancify wraps javascript functions so they only run occasionally based upon percentage chance.
    * Chancify returns a function which accepts the arguments from the original function.

## Tests
The following tests are conducted:
```
✓ Logger object is instantiated
✓ Logger object records the start time
✓ log() records the entry
✓ log() records the time of the entry
✓ log() records the event of the entry
✓ log() records the data of the entry
✓ toConsole() returns an array of the output
✓ findWithDataAttribute() finds the key in the object
✓ findWithDataAttribute() returns an empty array if the key is not found
✓ findWithDataAttribute() finds all entries with the key
✓ findWithDataAttribute() finds the nested key in the object
✓ findWithDataAttribute() finds deeply nested key in the object
```

## Future Implementations
- [ ] Test `sendToServer()`.
- [ ] Return a `Promise` from `makeXHR()`.
- [ ] Publish it on NPM as a Node.js middleware.
