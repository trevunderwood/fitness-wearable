import requests
from urllib.request import Request, urlopen
from bs4 import BeautifulSoup
import json
import os
import pyrebase
import datetime
from rest_framework.response import Response
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



def get_calorie_intake(food_name, UserID):
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
    # for i in range(len(nutrients['nutrient_id'])):
    #     print("Nutrient: {}".format(nutrients['nutrient_name'][i]))
    #     print("nutrient id: {}".format(nutrients['nutrient_id'][i]))
    #     print("Amount Per Serving: {} {}".format(nutrients['val'][i], nutrients['unit_name'][i]))
    #     print()
    
    nutrients_database = database.child("Users").child(UserID).child('Nutrients').get().val()
    for key, value in nutrients_database.items():
            curr_nutrient = database.child("Users").child(UserID).child('Nutrients').child(key).get().val()
            curr_ID = curr_nutrient['ID']
            curr_val = curr_nutrient[key+"Val"]
            for i in range(len(nutrients["nutrient_id"])):
                if nutrients["nutrient_id"][i] == curr_ID:
                    updated_val = curr_val + nutrients["val"][i]
                    database.child("Users").child(UserID).child("Nutrients").child(key).update({key+"Val":updated_val})

    #print(nutrients['nutrient_name'])
    #print("Calories Per Serving: {}".format(cal))
    #print(nutrients['nutrient_name'])
    #print(json.dumps(food_nut, indent=2))
    return nutrients

def calc_cal_burn(time, heart_rate, HR_rest, weight):
    # MET = {'Bicyling' : 8.0, 'calisthetics' : 5.0, 'weight lifting' : 6.0, 'yoga' : 2.5, 'walking' : 3.0, 'swimming' : 8.0, 'running' : 12.0, 'basketball' : 7.0, 'football' : 8.0, 'golf' : 4.5, 'tennis' : 7.0}
    # MET_val = MET[activity]
    #HR_rest = 70
    HR_max = 200
    HR_reserve = HR_max - HR_rest
    MET_val = 3.5 + (heart_rate - HR_rest) / (0.2 * HR_reserve)
    weight_kg = weight*0.453
    return (time * MET_val * 3.5 * weight_kg) / 200

def recommend_food(UserID):
    #name = database.child(UserID).child('FirstName').get().val()
    insufficient_nutrient_list = []
    weight = float(database.child("Users").child(UserID).child('Weight').get().val())
    daily_cal_goal = database.child("Users").child(UserID).child('DailyCalorieGoal').get().val()
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
    nutrients = database.child("Users").child(UserID).child('Nutrients').get().val()
    sex = database.child("Users").child(UserID).child("Sex").get().val()

    if sex == "Male":
        for key, value in nutrients.items():
            curr_nutrient = database.child("Users").child(UserID).child('Nutrients').child(key).get().val()
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
            curr_nutrient = database.child("Users").child(UserID).child('Nutrients').child(key).get().val()
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
    cal_count = database.child("Users").child(UserID).child('Nutrients').child('Calories').child('CaloriesVal').get().val()

    #print(cal_count)
    cal_goal = database.child(UserID).child('DailyCalorieGoal').get().val()
    fitness_goal = database.child("Users").child(UserID).child('FitnessGoal').get().val()
    cal_burned = database.child("Users").child(UserID).child('DailyCalorieBurned').get().val()
    print("Cal count: {}".format(cal_count))
    print("Cal burned: {}".format(cal_burned))
    print("fitness goal: {}".format(fitness_goal))
    cal_difference = cal_count - cal_burned
    print("Cal difference: {}".format(cal_difference))
    if fitness_goal == "Losing Weight":
        if cal_difference >= 0:
            return "More Exercise"
        return "No Change Needed"

    elif fitness_goal == "Gaining Weight":
        if cal_difference <= 0:
            return "Less Exercise"
        return "No Change Needed"

    elif fitness_goal == "Maintaining Weight":
        maintain_parameters = cal_count * 0.1
        print(maintain_parameters)
        if (maintain_parameters - cal_count < cal_difference) and (maintain_parameters + cal_count > cal_difference):
            return "No Change Needed"
        elif maintain_parameters - cal_count > cal_difference:
            return "More Exercise"
        else:
            return "Less Exercise"
    
    return "Invalid Parameters (Check FitnessGoal in database)"

def set_user_database(uid):
    data = {
        "DailyCalorieCount":0,
        "FitnessGoal":"Maintain",
        "DailyCalorieBurned":0,
        "DailyCalorieGoal":2000,
        "Nutrients":
        {
            "Protein":
            {
                "ID":1003,
                "ProteinVal":0
            },
            "Fat":
            {
                "ID":1004,
                "FatVal":0
            },
            "Carbohydrate":
            {
                "ID":1005,
                "CarbohydrateVal":0
            },    
            "Calories":
            {
                "ID":1008,
                "CaloriesVal":0
            },
            "Sugars":
            {
                "ID":2000,
                "SugarsVal":0
            },
            "Fiber":
            {
                "ID":1079,
                "FiberVal":0
            },        
            "Calcium":
            {
                "ID":1087,
                "CalciumVal":0
            },
            "Iron":
            {
                "ID":1089,
                "IronVal":0
            },
            "Sodium":
            {
                "ID":1093,
                "SodiumVal":0
            },
            "VitaminA":
            {
                "ID":1104,
                "VitaminAVal":0
            },
            "VitaminC":
            {
                "ID":1162,
                "VitaminCVal":0
            },
            "Potassium":
            {
                "ID":1092,
                "PotassiumVal":0
            },
            "Magnesium":
            {
                "ID":1090,
                "MagnesiumVal":0
            },
            "Phosphorus":
            {
                "ID":1091,
                "PhosphorusVal":0
            },
            "Zinc":
            {
                "ID":1095,
                "ZincVal":0
            },
            "Copper":
            {
                "ID":1098,
                "CopperVal":0
            },
            "Selenium":
            {
                "ID":1103,
                "SeleniumVal":0
            },
            "VitaminE":
            {
                "ID":1109,
                "VitaminEVal":0
            },
            "VitaminD":
            {
                "ID":1114,
                "VitaminDVal":0
            },
            "Thiamin":
            {
                "ID":1165,
                "ThiaminVal":0
            },
            "Riboflavin":
            {
                "ID":1166,
                "RiboflavinVal":0
            },
            "Niacin":
            {
                "ID":1167,
                "NiacinVal":0
            },
            "VitaminB6":
            {
                "ID":1175,
                "VitaminB6Val":0
            },
            "Folate":
            {
                "ID":1177,
                "FolateVal":0
            },
            "VitaminB12":
            {
                "ID":1178,
                "VitaminB12Val":0
            },
            "VitaminK":
            {
                "ID":1185,
                "VitaminKVal":0
            },
            "PantothenicAcid":
            {
                "ID":1170,
                "PantothenicAcidVal":0
            },
            "Manganese":
            {
                "ID":1101,
                "ManganeseVal":0
            }
        },
        "Sex":"Male",
        "Height":0,
        "Weight":0,
        "Name":"Name",
        'UserName':'Username',
        "Email":"email@email.com",
        "AverageHR":0,
        "TotalSteps":0,
        "DOB":"07/08/2001"

    }
    database.child("Users").child(uid).set(data)


def reset_nutrients(UserID):
    nutrients_database = database.child("Users").child(UserID).child('Nutrients').get().val()

    for key, value in nutrients_database.items():
        database.child("Users").child(UserID).child("Nutrients").child(key).update({key+"Val":0})

def calculate_bmr(height, weight, gender, birth_date):
    """
    Calculates the Basal Metabolic Rate (BMR) based on height, weight, gender, and date of birth.

    Parameters:
    height (float): Height in centimeters.
    weight (float): Weight in kilograms.
    gender (str): Gender, either 'male' or 'female'.
    birth_date (str): Date of birth in 'YYYY-MM-DD' format.

    Returns:
    BMR (float): Basal Metabolic Rate in calories.
    """

    # Calculate age in years
    today = datetime.date.today()
    birth_date = datetime.datetime.strptime(birth_date, "%Y-%m-%d").date()
    age = today.year - birth_date.year - ((today.month, today.day) < (birth_date.month, birth_date.day))

    # Calculate BMR based on gender
    if gender == 'male':
        bmr = 88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)
    elif gender == 'female':
        bmr = 447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)
    else:
        raise ValueError("Invalid gender. Gender must be 'male' or 'female'.")

    return bmr

# nutrient_bacon = get_calorie_intake("Bacon")
# print(nutrient_bacon)
# calorie_burned_test = calc_calories(20, 'walking', 125)
# recommend_food_test = recommend_food("User03")
# print(recommend_food_test)
recommend_exercise_test = recommend_exercise("6acpn7y15pW73XybPhhx00XMLlf2")
print(recommend_exercise_test)
# print(calorie_burned_test)
#print(database_test)
# get_calorie_intake('salmon')

# database.set(
#     {
#         "Users":
#         {
#             "User02":
#             {
#                 'nutrients':0
#             }
#         }
#     }
# )
# users_ref = database.reference("/Users")
# users_ref.set(
#     {   "User03":
#         {
#             'nutrients':0
#         }
#         }
# )

#set_user_database("User03")
#database.child("Users").push(data)
#database.child("Users").child("User03").set(data)


