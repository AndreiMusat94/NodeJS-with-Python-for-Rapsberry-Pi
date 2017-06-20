import RPi.GPIO as GPIO, time, os
import threading, datetime, csv
import Stepper as Motor
import RCtime as Lightsensor

DEBUG = 1
GPIO.setmode(GPIO.BCM)
GPIO.setwarnings(False)

botTreshold = int(8500)
topTreshold = int(9000)

sliderPosition = 0
sliderMaxValue = int(4200)
steps = int(100)
delay = int(2)/1000.0

    
def VerifyRC():
    circuitTime = 20
    threading.Timer(circuitTime,VerifyRC).start()
    global sliderPosition
    global sliderMaxValue
    global botTreshold
    global topTreshold
    steps = int(100)
    delay = int(2)/1000.0
    lightValue = Lightsensor.RCtime()  
    if lightValue < botTreshold and (sliderPosition+steps) <= sliderMaxValue:        
        Motor.forward(delay, steps)
        sliderPosition = sliderPosition + steps
        print sliderPosition,'inchis'         
    if lightValue > topTreshold and (sliderPosition - steps) >= 0:        
        Motor.backwards(delay, steps)
        sliderPosition = sliderPosition - steps
        print sliderPosition,'deschis'
    print lightValue, botTreshold, topTreshold           
VerifyRC()
