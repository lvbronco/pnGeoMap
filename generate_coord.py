from pubnub.pnconfiguration import PNConfiguration
from pubnub.pubnub import PubNub
from pubnub.exceptions import PubNubException
from uuid import uuid4
from time import sleep 
from random import randint, choice

print("Init ...")

CHANNEL = "geo-test-channel"

pnconfig = PNConfiguration()
pnconfig.publish_key = "pub-c-14d052d1-9847-41a1-90ab-b75467751c0d"
pnconfig.subscribe_key = "sub-c-d255c2c2-52c6-11ec-8b9e-da88ab2aee1c"
pnconfig.uuid = "notify-" + str(uuid4())

pubnub = PubNub(pnconfig)

try:
    coord = { 
        "lat": 30.22072, 
        "lng": -97.73323
    }
    final_coord = {
        "lat": 30.27466,
        "lng": -97.74035,
    }
    while coord["lat"] < final_coord["lat"] or coord["lng"] > final_coord["lng"]:
        if coord["lat"] < final_coord["lat"]:
            coord["lat"] = round(coord["lat"] + 0.0001, 5)
        if coord["lng"] > final_coord["lng"]:
            coord["lng"] = round(coord["lng"] - 0.0001, 5)
        print(coord)
        envelope = pubnub.publish().channel(CHANNEL).message(coord).sync()
        slp = 1
        # slp = randint(3, 10)
        # print('Generating a new coord in {} seconds ...\n'.format(slp))
        sleep(slp)
except PubNubException as e:
    print(e)
    print('... exiting!')
