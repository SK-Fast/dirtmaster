# Variables
api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
delay = 5
watertime = 1
delay = delay * 1000
watertime = watertime * 1000
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
        WifiModule.write_blynk_pin_value(api, "V0", "Idle")
        basic.pause(delay)
        readforce = WifiModule.read_blynk_pin_value(api, "V1")
        if readforce == "1":
            WifiModule.write_blynk_pin_value(api, "V0", "Watering...")
            basic.show_leds("""
                . . # . .
                . # # # .
                # # # . #
                # # . # #
                . # # # .
                """)
            basic.pause(delay)
            pins.digital_write_pin(DigitalPin.P1, 1)
            basic.pause(watertime)
            pins.digital_write_pin(DigitalPin.P1, 0)
            basic.pause(delay - watertime)
            WifiModule.write_blynk_pin_value(api, "V1", "0")
            basic.pause(delay)
            WifiModule.write_blynk_pin_value(api, "V0", "Idle")
            basic.show_leds("""
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            """)
        basic.pause(delay)
        readmositure = pins.analog_read_pin(AnalogPin.P2)
        WifiModule.write_blynk_pin_value(api, "V0", "" + str(readmositure))
        basic.pause(delay)
        brightness = input.light_level()
        WifiModule.write_blynk_pin_value(api, "V0", "" + str(brightness))
    else:
        basic.show_leds("""
            . . . . .
            . . . . .
            # . # . #
            . . . . .
            . . . . .
            """)
basic.forever(on_forever)

