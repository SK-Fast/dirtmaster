//  Variables
let api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
let delay = 5
let watertime = 1
delay = delay * 1000
watertime = watertime * 1000
basic.showLeds(`
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    `)
WifiModule.setupWifi(SerialPin.P13, SerialPin.P12, "mSPACE", "18871008")
basic.forever(function on_forever() {
    let readforce: string;
    let readmositure: number;
    let brightness: number;
    if (WifiModule.isConnected()) {
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        basic.pause(delay)
        WifiModule.writeBlynkPinValue(api, "V0", "Idle")
        basic.pause(delay)
        readforce = WifiModule.readBlynkPinValue(api, "V1")
        if (readforce == "1") {
            WifiModule.writeBlynkPinValue(api, "V0", "Watering...")
            basic.showLeds(`
                . . # . .
                . # # # .
                # # # . #
                # # . # #
                . # # # .
                `)
            basic.pause(delay)
            pins.digitalWritePin(DigitalPin.P1, 1)
            basic.pause(watertime)
            pins.digitalWritePin(DigitalPin.P1, 0)
            basic.pause(delay - watertime)
            WifiModule.writeBlynkPinValue(api, "V1", "0")
            basic.pause(delay)
            WifiModule.writeBlynkPinValue(api, "V0", "Idle")
            basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        }
        
        basic.pause(delay)
        readmositure = pins.analogReadPin(AnalogPin.P2)
        WifiModule.writeBlynkPinValue(api, "V0", "" + ("" + readmositure))
        basic.pause(delay)
        brightness = input.lightLevel()
        WifiModule.writeBlynkPinValue(api, "V0", "" + ("" + brightness))
    } else {
        basic.showLeds(`
            . . . . .
            . . . . .
            # . # . #
            . . . . .
            . . . . .
            `)
    }
    
})
