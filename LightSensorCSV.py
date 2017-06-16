import RPi.GPIO as GPIO, time, os
import threading, datetime, csv

DEBUG = 1
GPIO.setmode(GPIO.BCM)

cd = datetime.datetime.now().strftime('%d_%m_%Y')

csvfile = open(cd+'.csv', 'wb')
filewriter = csv.writer(csvfile, delimiter=',',
                        quotechar='|', quoting=csv.QUOTE_MINIMAL)
def RCtime ():        
        csvfile = open(cd+'.csv', 'rb')
        circuitTime = 60       
        threading.Timer(circuitTime,RCtime).start() 
        RCpin = 14
        reading = 0
        GPIO.setup(RCpin, GPIO.OUT)
        GPIO.output(RCpin, GPIO.LOW)
        time.sleep(0.1)
        time_date = time.strftime('%X') 
        GPIO.setup(RCpin, GPIO.IN)
        # This takes about 1 millisecond per loop cycle
        while (GPIO.input(RCpin) == GPIO.LOW):
                reading += 1        
        filewriter.writerow([reading, time_date])     
        print reading,time_date
        csvfile.close()

RCtime()
      


