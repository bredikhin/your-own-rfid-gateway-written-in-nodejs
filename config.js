// Gateway configuration
module.exports = {
  listener: {
    devices: [
      {
        path: 'tmr:///dev/ttyACM1',
        module: require.resolve('mockout')
      },
      {
        path: 'tmr:///dev/ttyACM2',
        module: require.resolve('mockout')
      },
      {
        path: 'tmr:///dev/ttyACM3',
        module: require.resolve('mockout')
      }
    ]
  },
  uploader: {
  }
}
