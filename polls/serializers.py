from rest_framework import serializers
from .models import Health

class TrackerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Health
        fields = ('__all__')