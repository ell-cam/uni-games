import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BCM)

MAGNET_GPIO = 21
GPIO.setup(MAGNET_GPIO, GPIO.IN, pull_up_down=GPIO.PUD_UP)

try:
    while True:
        switch_state = GPIO.input(MAGNET_GPIO)
        if switch_state == GPIO.LOW:
            print("Switch is closed")
        else:
            print("Switch is open")
        time.sleep(1)
except KeyboardInterrupt:
    GPIO.cleanup()