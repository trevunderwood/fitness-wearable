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
    
    response = requests.get("https://api.nal.usda.gov/fdc/v1/foods/search?api_key=98oneQ37kG8dCa6r0rZcTKhi7hwnEgH9gYWAJMkc&query={}".format(food_name), verify=False)
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
    #name = database.child(UserID).child('FirstName').get().val()
    insufficient_nutrient_list = []
    weight = database.child(UserID).child('Weight').get().val()
    daily_cal_goal = database.child(UserID).child('DailyCalorieGoal').get().val()
    recommended_nutrient_values_male = {
        '1003':0.36*weight,
        '1004':0.2*daily_cal_goal,
        '1005':0.45*daily_cal_goal,
        '1008':daily_cal_goal,
        '1104':900,
        '1162':90,
        '1114':600,
        '1109':15,
        '1185':120,
        '1165':1.2,
        '1166':1.3,
        '1167':16,
        '1170':5,
        '1175':1.3,
        '1176':30,
        '1177':400,
        '1178':1.2,
        '1087':1000,
        '1095':11,
        '1091':800,
        '1100':140,
        '1090':250,
        '1103':40,
        '1093':500,
        '1101':2.3,
        '1098':900,
        '1092':1800,
        '1089':8.7,
        '1079':25,
        '2000':36
    }
    recommended_nutrient_values_female = {
        '1003':0.36*weight,
        '1004':0.2*daily_cal_goal,
        '1005':0.45*daily_cal_goal,
        '1008':daily_cal_goal,
        '1104':700,
        '1162':75,
        '1114':600,
        '1109':15,
        '1185':90,
        '1165':1.1,
        '1166':1.1,
        '1167':14,
        '1170':5,
        '1175':1.3,
        '1176':30,
        '1177':400,
        '1178':1.2,
        '1087':1000,
        '1095':9,
        '1091':800,
        '1100':140,
        '1090':250,
        '1103':40,
        '1093':500,
        '1101':1.8,
        '1098':900,
        '1092':1800,
        '1089':14.8,
        '1079':25,
        '2000':24
    }
    nutrients = database.child(UserID).child('Nutrients').get().val()
    sex = database.child(UserID).child("Sex").get().val()

    if sex == "Male":
        for key, value in nutrients.items():
            curr_nutrient = database.child(UserID).child('Nutrients').child(key).get().val()
            curr_ID = curr_nutrient['ID']
            curr_val = curr_nutrient[key+"Val"]
            if curr_ID != 2000:
                if curr_val < recommended_nutrient_values_male[str(curr_ID)]:
                    insufficient_nutrient_list.append(key)
            elif curr_ID == 2000:
                if curr_val > recommended_nutrient_values_female[str(curr_ID)]:
                    insufficient_nutrient_list.append(key)

    elif sex == "Female":
        for key, value in nutrients.items():
            curr_nutrient = database.child(UserID).child('Nutrients').child(key).get().val()
            curr_ID = curr_nutrient['ID']
            curr_val = curr_nutrient[key+"Val"]
            if curr_ID != 2000:
                if curr_val < recommended_nutrient_values_female[str(curr_ID)]:
                    insufficient_nutrient_list.append(key)
            elif curr_ID == 2000:
                if curr_val > recommended_nutrient_values_female[str(curr_ID)]:
                    insufficient_nutrient_list.append(key)

                
    else:
        print("Sex is not listed as male or female")
    #database.child(UserID).child('FirstName').update()
    return insufficient_nutrient_list


def recommend_exercise(UserID):
    cal_count = database.child(UserID).child('DailyCalorieCount').get().val()
    #print(cal_count)
    #cal_goal = database.child(UserID).child('DailyCalorieGoal').get().val()
    fitness_goal = database.child(UserID).child('FitnessGoal').get().val()
    cal_burned = database.child(UserID).child('DailyCalorieBurned').get().val()

    cal_difference = cal_count - cal_burned

    if fitness_goal == "Lose Weight":
        if cal_difference >= 0:
            return "More Exercise"
        return "No Change Needed"

    elif fitness_goal == "Gain Weight":
        if cal_difference <= 0:
            return "Less Exercise"
        return "No Change Needed"

    elif fitness_goal == "Maintain":
        maintain_parameters = cal_count * 0.1
        print(maintain_parameters)
        if (maintain_parameters - cal_count < cal_difference) and (maintain_parameters + cal_count > cal_difference):
            return "No Change Needed"
        elif maintain_parameters - cal_count > cal_difference:
            return "More Exercise"
        else:
            return "Less Exercise"
    
    return "Invalid Parameters (Check FitnessGoal in database)"

# nutrient_bacon = get_calorie_intake("Bacon")
# print(nutrient_bacon)
# calorie_burned_test = calc_calories(20, 'walking', 125)
# recommend_food_test = recommend_food("User01")
# print(recommend_food_test)
# recommend_exercise_test = recommend_exercise("User01")
# print(recommend_exercise_test)
# print(calorie_burned_test)
#print(database_test)
# get_calorie_intake('salmon')

