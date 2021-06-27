# Variables
api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
delay = 5
watertime = 1


switcha = False
switchb = False
delay = delay * 1000
watertime = watertime * 1000
basic.show_leds("""
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    """)
pins.digital_write_pin(DigitalPin.P1, 0)
pins.digital_write_pin(DigitalPin.P8, 0)
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
        readforce = WifiModule.read_blynk_pin_value(api, "V5")
        if readforce == "1":
            pins.digital_write_pin(DigitalPin.P8, 1)
        else:
            pins.digital_write_pin(DigitalPin.P8, 0)
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

def on_button_pressed_a():
    global switcha
    if switcha == False:
        switcha = True
        basic.show_leds("""
                . . # . .
                . # # # .
                # # # . #
                # # . # #
                . # # # .
                """)
        pins.digital_write_pin(DigitalPin.P1, 1)
    else:
        switcha = False
        basic.clear_screen()
        pins.digital_write_pin(DigitalPin.P1, 0)
        
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_b():
    global switchb
    if switchb == False:
        switchb = True
        basic.show_leds("""
                . . . . .
                # # # # #
                # # # . #
                # # . # #
                # # # # #
                """)
        pins.digital_write_pin(DigitalPin.P8, 1)
    else:
        switchb = False
        basic.clear_screen()
        pins.digital_write_pin(DigitalPin.P8, 0)

input.on_button_pressed(Button.B, on_button_pressed_b)