from django.db import models

# Create your models here.
from distutils.archive_util import make_archive
#from mmap import MADV_MERGEABLE
from pyexpat import model
from sre_parse import State, expand_template
#from django.db import models
from django.forms import PasswordInput

# class User(models.Model):
#     username = models.CharField(max_length=30, default='')
#     password = models.CharField(max_length=30, default='')
#     first_name = models.CharField(max_length=30, default='')
#     last_name = models.CharField(max_length=30, default='')
#     email = models.CharField(max_length=30, default='')
#     phone_number = models.CharField(max_length=30, default='')
#     address = models.CharField(max_length=30, default='')
#     #address2 = models.CharField(max_length=30, default='')
#     state = models.CharField(max_length=30, default='')
#     zipcode = models.CharField(max_length=30, default='')
#     height = models.CharField(max_length=30, default='')
#     weight = models.CharField(max_length=30, default=0.0)
    

class Health(models.Model):
    #user_ID = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
    # cal_goal = models.DecimalField(max_digits=30, default=0.0)
    # cal_burned = models.DecimalField(max_digits=30, default=0.0)
    # heart_rate = models.DecimalField(max_digits=30, default=0.0)
    sweat_lost = models.CharField(max_length=30, default='')

# class Food(models.Model):
#     user_ID = models.ForeignKey(User, on_delete=models.CASCADE, default=0)
#     food_item_name = models.CharField(max_length=30, default='')
#     cal_amount = models.CharField(max_length=100, default='') 
