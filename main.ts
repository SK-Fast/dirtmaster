//  Variables
let api = "rUZxDJGJOUHcd1Tby5sRuQADsRwXLAZ7"
let delay = 5
let watertime = 5
let switcha = false
let switchb = false
let isforcelight = false
delay = delay * 1000
watertime = watertime * 1000
basic.showLeds(`
    . . . . .
    . . . . .
    # . # . #
    . . . . .
    . . . . .
    `)
pins.digitalWritePin(DigitalPin.P1, 0)
pins.digitalWritePin(DigitalPin.P8, 0)
WifiModule.setupWifi(SerialPin.P13, SerialPin.P12, "THANJAITECHNOLOGY_2.4G", "0899305335")
function action_water() {
    WifiModule.writeBlynkPinValue(api, "V3", "Watering...")
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
    WifiModule.writeBlynkPinValue(api, "V3", "Idle")
    basic.showLeds(`
                . . . . .
                . . . . #
                . . . # .
                # . # . .
                . # . . .
                `)
}

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
        WifiModule.writeBlynkPinValue(api, "V3", "Idle")
        basic.pause(delay)
        readforce = WifiModule.readBlynkPinValue(api, "V1")
        //  Water
        if (readforce == "1") {
            action_water()
        }
        
        basic.pause(delay)
        readforce = WifiModule.readBlynkPinValue(api, "V5")
        // Light
        if (readforce == "1") {
            isforcelight = true
            pins.digitalWritePin(DigitalPin.P8, 1)
        } else {
            pins.digitalWritePin(DigitalPin.P8, 0)
        }
        
        basic.pause(delay)
        readmositure = pins.analogReadPin(AnalogPin.P2)
        WifiModule.writeBlynkPinValue(api, "V0", "" + ("" + readmositure))
        if (readmositure > 1000) {
            action_water()
        }
        
        basic.pause(delay)
        brightness = input.lightLevel()
        WifiModule.writeBlynkPinValue(api, "V0", "" + ("" + brightness))
        if (isforcelight == false) {
            if (brightness < 20) {
                pins.digitalWritePin(DigitalPin.P8, 1)
            } else {
                pins.digitalWritePin(DigitalPin.P8, 0)
            }
            
        }
        
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
input.onButtonPressed(Button.A, function on_button_pressed_a() {
    
    if (switcha == false) {
        switcha = true
        basic.showLeds(`
                . . # . .
                . # # # .
                # # # . #
                # # . # #
                . # # # .
                `)
        pins.digitalWritePin(DigitalPin.P1, 1)
    } else {
        switcha = false
        basic.clearScreen()
        pins.digitalWritePin(DigitalPin.P1, 0)
    }
    
})
input.onButtonPressed(Button.B, function on_button_pressed_b() {
    
    if (switchb == false) {
        switchb = true
        basic.showLeds(`
                . . . . .
                # # # # #
                # # # . #
                # # . # #
                # # # # #
                `)
        pins.digitalWritePin(DigitalPin.P8, 1)
    } else {
        switchb = false
        basic.clearScreen()
        pins.digitalWritePin(DigitalPin.P8, 0)
    }
    
})
