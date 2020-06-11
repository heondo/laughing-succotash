import paho.mqtt.client as mqtt  # import the client1
import time

############


def on_message(client, userdata, message):
    print("message received ", str(message.payload.decode("utf-8")))
    print("message topic=", message.topic)
    print("message qos=", message.qos)
    print("message retain flag=", message.retain)


########################################
broker_address = "localhost"
# broker_address="iot.eclipse.org"
print("creating new instance")
mqtt_client = mqtt.Client("P1", transport="websockets")  # create new instance
mqtt_client.on_message = on_message  # attach function to callback
print("connecting to broker")
mqtt_client.connect(broker_address, port=9001)  # connect to broker
print("Subscribing to topic", "house/bulbs/bulb1")
mqtt_client.subscribe("house/bulbs/bulb1")
print("Publishing message to topic", "house/bulbs/bulb1")
mqtt_client.publish("house/bulbs/bulb1", "OFF", retain=True)
mqtt_client.publish("house/bulbs/bulb2", "ON", retain=True)

# connects to mosquitto ws
# client.ws_set_ptions()
