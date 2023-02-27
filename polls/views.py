from django.shortcuts import render
from django.http import HttpResponse
from django.template import loader

import pyrebase

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

def polls(request):
        template = loader.get_template('polls.html')
        #accessing our firebase data and storing it in a variable
        name = database.child('UserID').child('FirstName').get().val()
        #stack = database.child('Data').child('Stack').get().val()
        #framework = database.child('Data').child('Framework').get().val()

    
        context = {
            'name':name
        }
        return HttpResponse(template.render(context))
# Create your views here.
