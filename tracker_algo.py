import requests
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import json
import os
import pyrebase
# USDA KEY: 98oneQ37kG8dCa6r0rZcTKhi7hwnEgH9gYWAJMkc

config = {
  "apiKey" : "AIzaSyA52p_7bAjYqIDHIIU3nECuljQ9_Lsz8r4",
  "authDomain" : "fitness-wearable-20b9d.firebaseapp.com",
  "databaseURL" : "https://fitness-wearable-20b9d-default-rtdb.firebaseio.com/",
  "projectId" : "fitness-wearable-20b9d",
  "storageBucket" : "fitness-wearable-20b9d.appspot.com",
  "messagingSenderId" : "551481552952",
  "appId" : "1:551481552952:web:c4896638c53d29dd7e76cd",
  "measurementId" : "G-SWQWMZ2D48"
}

firebase=pyrebase.initialize_app(config)
authe = firebase.auth()
database=firebase.database()


def get_calorie_intake(food_name):
    nutrients = {'nutrient_id': [], 'nutrient_name': [], 'unit_name' : [], 'val' : []}
    response = requests.get("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=98oneQ37kG8dCa6r0rZcTKhi7hwnEgH9gYWAJMkc&query={}".format(food_name))
    json_object = json.loads(response.text)

    json_formatted_str = json.dumps(json_object, indent=2)
    #print(json.dumps(json_object['foods'][49]['foodNutrients'][0], indent=2))
    #print(json_formatted_str)
    #print(len(json_object['foods']))
    target_nutrient_id_list = [1003,1004,1005,1008,1104,1162,1114,1109,1185,1165,1166,1167,1170,1175,1176,1177,1178,1087,1095,1091,1100,1090,1103,1093,1101,1098,1092,1089,2300,850,1079,2000]
    for i in range(len(json_object['foods'])):
        #if json_object['foods'][i]['fooodNutrients']
        for j in range(len(json_object['foods'][i]['foodNutrients'])):
            if json_object['foods'][i]['foodNutrients'][j]['nutrientId'] not in nutrients['nutrient_id']:
                if json_object['foods'][i]['foodNutrients'][j]['nutrientId'] in target_nutrient_id_list:
                    nutrients['nutrient_id'].append(json_object['foods'][i]['foodNutrients'][j]['nutrientId'])
                    nutrients['nutrient_name'].append(json_object['foods'][i]['foodNutrients'][j]['nutrientName'])
                    nutrients['unit_name'].append(json_object['foods'][i]['foodNutrients'][j]['unitName'])
                    nutrients['val'].append(json_object['foods'][i]['foodNutrients'][j]['value'])
            #print(json.dumps(json_object['foods'][i]['foodNutrients'][0], indent=2))
    #cal = 0.0
    for i in range(len(nutrients['nutrient_id'])):
        print("Nutrient: {}".format(nutrients['nutrient_name'][i]))
        print("nutrient id: {}".format(nutrients['nutrient_id'][i]))
        print("Amount Per Serving: {} {}".format(nutrients['val'][i], nutrients['unit_name'][i]))
        print()
    
    #print(nutrients['nutrient_name'])
    #print("Calories Per Serving: {}".format(cal))
    #print(nutrients['nutrient_name'])
    #print(json.dumps(food_nut, indent=2))
    return nutrients

def calc_calories(time, activity, weight):
    MET = {'Bicyling' : 8.0, 'calisthetics' : 5.0, 'weight lifting' : 6.0, 'yoga' : 2.5, 'walking' : 3.0, 'swimming' : 8.0, 'running' : 12.0, 'basketball' : 7.0, 'football' : 8.0, 'golf' : 4.5, 'tennis' : 7.0}
    MET_val = MET[activity]
    return (time * MET_val * 3.5 * weight) / 200

def recommend_food(UserID):
    name = database.child(UserID).child('FirstName').get().val()
    #database.child(UserID).child('FirstName').update()
    return name

#nutrient_bacon = get_calorie_intake("Bacon")
# calorie_burned_test = calc_calories(20, 'walking', 125)
# database_test = recommend_food("User01")
# print(calorie_burned_test)
# print(database_test)
# get_calorie_intake('salmon')

