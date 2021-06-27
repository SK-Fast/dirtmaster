// Variables
let api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
let delay = 5
delay = delay * 1000
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
    if (WifiModule.isConnected()) {
        basic.showLeds(`
            . . . . .
            . . . . #
            . . . # .
            # . # . .
            . # . . .
            `)
        basic.pause(delay)
        readforce = WifiModule.readBlynkPinValue(api, "V1")
        if (readforce == "1") {
            pins.digitalReadPin(DigitalPin.P1)
        }
        
        basic.pause(delay)
        readmositure = pins.analogReadPin(AnalogPin.P2)
        WifiModule.writeBlynkPinValue(api, "V0", "" + readmositure)
        basic.pause(delay)
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
