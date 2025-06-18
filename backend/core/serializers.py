from rest_framework import serializers
from .models import Itinerary, ItineraryEnquiry, Reel

class ReelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Reel
        fields = ['id', 'video', 'uploaded_at']

class ItinerarySerializer(serializers.ModelSerializer):
    reels = ReelSerializer(many=True, read_only=True)  # Nested reels

    class Meta:
        model = Itinerary
        fields = '__all__'

class ItineraryEnquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = ItineraryEnquiry
        fields = '__all__'
