# Your Own RFID Gateway Written in Node.js 

In our previous post we talked about a general architecture of an RFID-based
asset tracking system and, specifically, about an API server in the heart of
such a system. Now we are going to take a look at the remote nodes collecting
the data that comes from RFID readers and sending this data through some API to
the database. Let's create our proper RFID gateway server software with
Node.js.

## Architecture

### Hardware

The hardware part didn't change a lot since the previous article, though our
diagram will be scoped on the peripherals now:

![RFID Gateway: Hardware Architecture](hardware.png)

### Software

On the software side, our goal will be to leverage asynchronous design patterns
forming the basis of Node.js API: event emitters and streams.

![RFID Gateway: Software Architecture](software.png)

Since we can (and most likely would in the real life) have multiple RFID
readers connected to the same gateway, we have to be able to consume data from
several reader modules independently. Moreover, these modules can correspond /
talk to the different types of hardware while reporting to the same gateway.
Finally, in order to unload the main process and take advantage of multi-
processor / core architectures we are putting those reader modules in separate
child processes. These processes are piping the data to the Listener module of
the parent process, which in its turn analyses and transforms (if needed) the
data and pipes it further to the Uploader module. The latter is the one
transmitting the results to the cloud via HTTP or some other protocol.

## Implementation

We are assuming further that you already have Node.js and npm installed and
node / npm commands are accessible. Let's create a new package for our RFID
gateway by typing `npm init` once we are in the target folder. After
answering a few questions (just use the defaults for now), we will have our
`package.json` created.

### Gateway Module

Gateway module

### Listener

### Uploader

### Reader Modules

## Next Steps

## License

[The MIT License](http://opensource.org/licenses/MIT)

Copyright (c) 2014 [Innobec Technologies Inc.](http://www.innobec.com/)