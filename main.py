def on_forever():
    pass
basic.forever(on_forever)

WifiModule.setup_wifi(SerialPin.P0, SerialPin.P0, "mSPACE", "18871008")