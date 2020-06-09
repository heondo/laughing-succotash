import eventlet
import json
from flask import Flask, render_template
from flask_mqtt import Mqtt
from flask_socketio import SocketIO
from flask_bootstrap import Bootstrap
import paho.mqtt.client as mqtt  # import the client1
import time

eventlet.monkey_patch()

app = Flask(__name__)
app.config['SECRET'] = ''
app.config['TEMPLATES_AUTO_RELOAD'] = True
app.config['MQTT_BROKER_URL'] = 'localhost'
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_USERNAME'] = ''
app.config['MQTT_PASSWORD'] = ''
app.config['MQTT_KEEPALIVE'] = 5
app.config['MQTT_TLS_ENABLED'] = False


# def on_message(client, userdata, message):
#     print("message received ", str(message.payload.decode("utf-8")))
#     print("message topic=", message.topic)
#     print("message qos=", message.qos)
#     print("message retain flag=", message.retain)


def handle_mqtt_message(client, userdata, message):
    data = dict(
        topic=message.topic,
        payload=message.payload.decode()
    )
    print("The mqtt just got a message")
    socketio.emit('mqtt_message', data=data, broadcast=True)


########################################
broker_address = "localhost"
# broker_address="iot.eclipse.org"
print("creating new instance")
# mqtt_client = mqtt.Client("P1", transport="websockets")  # create new instance
# mqtt_client.on_message = handle_mqtt_message  # attach function to callback
print("connecting to broker")
# mqtt_client.connect(broker_address, port=9001)  # connect to broker
# mqtt_client.subscribe('house')
# print("Subscribing to topic", "house/bulbs/bulb1")
# mqtt_client.subscribe("house/bulbs/bulb1")
# print("Publishing message to topic", "house/bulbs/bulb1")
# mqtt_client.publish("house/bulbs/bulb1", "OFF", retain=True)
# mqtt_client.publish("house/bulbs/bulb2", "ON", retain=True)


# Parameters for SSL enabled
# app.config['MQTT_BROKER_PORT'] = 8883
# app.config['MQTT_TLS_ENABLED'] = True
# app.config['MQTT_TLS_INSECURE'] = True
# app.config['MQTT_TLS_CA_CERTS'] = 'ca.crt'

# mqtt = Mqtt(app)
socketio = SocketIO(app, cors_allowed_origins="*")
bootstrap = Bootstrap(app)


@app.route('/')
def index():
    return render_template('index.html')


@socketio.on('publish')
def handle_publish(json_str):
    data = json.loads(json_str)
    mqtt_client.publish(data['topic'], data['message'])


@socketio.on('subscribe')
def handle_subscribe(json_str):
    data = json.loads(json_str)
    mqtt_client.subscribe(data['topic'])


# @socketio.on('unsubscribe_all')
# def handle_unsubscribe_all():
#     mqtt_client.unsubscribe_all()


@socketio.on('my message')
def handle_my_message(json_str):
    data = json.loads(json_str)
    print('Hit my message:', data['message'])


# @mqtt_client.on_publish()
# def handle_mqtt_publish(client, userdata, message):
#     data = dict(
#         topic=message.topic,
#         payload=message.payload.decode()
#     )
#     print("The mqtt just got a message")
#     socketio.emit('mqtt_publish', data=data, broadcast=True)


# @mqtt_client.on_log()
# def handle_logging(client, userdata, level, buf):
#     print("Log", level, buf)


if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=5000,
                 use_reloader=False, debug=True)

    # mqtt_client.publish('house/bulbs/bulb1', "LOCKED", retain=True)
