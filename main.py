#Variables
api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
delay = 5


delay = delay * 1000
basic.show_leds("""
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    """)
WifiModule.setup_wifi(SerialPin.P13, SerialPin.P12, "mSPACE", "18871008")

def on_forever():
    if WifiModule.is_connected():
        basic.show_leds("""
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            """)
        basic.pause(delay)
        readforce = WifiModule.read_blynk_pin_value(api, "V1")
        if readforce == "1":
            pins.digital_read_pin(DigitalPin.P1)
        basic.pause(delay)
        readmositure = pins.analog_read_pin(AnalogPin.P2)
        WifiModule.write_blynk_pin_value(api, "V0", str(readmositure))
        basic.pause(delay)
    else:
        basic.show_leds("""
            . . . . .
            . . . . .
            # . # . #
            . . . . .
            . . . . .
            """)
basic.forever(on_forever)
