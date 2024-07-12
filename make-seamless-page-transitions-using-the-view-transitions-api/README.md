# Demo for Make Seamless Page Transitions using the View Transitions API

This directory contains several Page Transition API demos each in their own
respective folders.

## Running the demo

The demo can be run using a basic HTTP server since it doesn't use any
frameworks or external dependencies. I personally recommend using
[http-server](https://www.npmjs.com/package/http-server), which can run this
project by simply running `http-server` in the CLI while in the project root.

Alternatively if you don't want to install any additional packages and have
Python installed, you can use Python's built-in HTTP server as well by running
`python3 -m http.server`.

With either server you will see a list of demos to choose from on the root
page. Selecting one will load that specific demo. Have fun!

## Attribution

These demos were created by the wonderful [Jake
Archibald](https://jakearchibald.com/) and [Bramus](https://www.bram.us/).
Modifications have been made to the MPA examples to make them work with the
latest iteration of the Page Transitions API. [Original source code on
glitch.com](https://glitch.com/edit/#!/simple-set-demos).
