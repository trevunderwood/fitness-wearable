from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import TrackerSerializer
from .models import Health
import pyrebase
from django.http import JsonResponse

from tracker_algo import get_calorie_intake, recommend_food, recommend_exercise, set_user_database, reset_nutrients, calc_cal_burn, display_calories

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

# def polls(request):
#         template = loader.get_template('polls.html')
#         #accessing our firebase data and storing it in a variable
#         name = database.child('UserID').child('FirstName').get().val()
#         #stack = database.child('Data').child('Stack').get().val()
#         #framework = database.child('Data').child('Framework').get().val()

    
#         context = {
#             'name':name
#         }
#         return HttpResponse(template.render(context))
# Create your views here.

@api_view(['GET'])
def apiOverview(request):
	api_urls = {
		# 'List':'/task-list/',
		# 'Detail View':'/task-detail/<str:pk>/',
		# 'Create':'/task-create/',
		# 'Update':'/task-update/<str:pk>/',
		# 'Delete':'/task-delete/<str:pk>/',
		'Nutrient Tracker':'/tracker-api/',
		'Recommend Food':'/recommend-food/',
		'Recommend Exercise':'/recommend-exercise/',
		'Add User':'/add-user/',
		'Reset Nutrients':'/reset-nutrients/',
		'Calculate Calorie Burn':'/calc-calories/',
		'Display Calories':'/display-calories/'
		}

	return Response(api_urls)

@api_view(['GET'])
def testAPI(request):
	health = Health.objects.all()
	serializer = TrackerSerializer(health, many=True)
	return Response(serializer.data)
#Send a JSON that has the name of a food
#Recieiving a JSON response that returns all the value

@api_view(['POST'])
def test_tracker(request):
    food = request.data.get('food')
    UserID = request.data.get('UserID')
    if not food:
        return Response({'error': 'Please provide a food.'}, status=400)
    if not UserID:
        return Response({'error': 'Please provide a valid UserID.'}, status=400)

    food_result = get_calorie_intake(food, UserID)
    return Response({'result': food_result})

@api_view(['POST'])
def food_recommend(request):
	UserID = request.data.get('UserID')
	if not UserID:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	
	recommend_result = recommend_food(UserID)
	return JsonResponse({'result': recommend_result})

@api_view(['POST'])
def exercise_recommend(request):
	UserID = request.data.get('UserID')
	if not UserID:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	
	recommend_result = recommend_exercise(UserID)
	return Response({'result': recommend_result})

@api_view(['POST'])
def firebase_entry(request):
	uid = request.data.get("UID")
	if not uid:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	
	set_user_database(uid)
	return Response({'success':'Added new User to database'})

@api_view(['POST'])
def nutrient_reset(request):
	uid = request.data.get("UID")
	if not uid:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	reset_nutrients(uid)
	return Response({'success':'Reset user nutrient values in database'})

@api_view(['POST'])
def calc_calories(request):
	time = request.data.get('time')
	#active_hr = request.data.get('ActiveHR')
	resting_hr = request.data.get('RestHR')
	uid = request.data.get('UserID')
	if not time:
		return Response({'error': 'Please provide a valid time.'}, status=400)
	if not resting_hr:
		return Response({'error': 'Please provide a valid resting heart rate.'}, status=400)
	if not uid:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	active_hr = database.child('Users').child(uid).child('AverageHR').get().val()
	weight = float(database.child('Users').child(uid).child('Weight').get().val())
	calories_burned = calc_cal_burn(time, active_hr, resting_hr, weight)

	return Response({'result':calories_burned})

@api_view(['POST'])
def display_cal(request):
	UserID = request.data.get('UserID')
	if not UserID:
		return Response({'error': 'Please provide a valid UserID.'}, status=400)
	cal = display_calories(UserID)
	return Response({'result':cal})


# @api_view(['GET'])
# def taskDetail(request, pk):
# 	tasks = User.objects.get(id=pk)
# 	serializer = TrackerSerializer(tasks, many=False)
# 	return Response(serializer.data)


# @api_view(['POST'])
# def taskCreate(request):
# 	serializer = TrackerSerializer(data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)

# @api_view(['POST'])
# def taskUpdate(request, pk):
# 	task = User.objects.get(id=pk)
# 	serializer = TrackerSerializer(instance=task, data=request.data)

# 	if serializer.is_valid():
# 		serializer.save()

# 	return Response(serializer.data)


# @api_view(['DELETE'])
# def taskDelete(request, pk):
# 	task = User.objects.get(id=pk)
# 	task.delete()

# 	return Response('Item succsesfully delete!')

# @api_view(['GET'])
# def logFood(request, pk):
#   task = User.objects.get(id=pk)
#   serializer = TrackerSerializer(task)
  
