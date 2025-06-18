from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ItineraryViewSet,
    ItineraryEnquiryViewSet,
    ReelViewSet,
    ItineraryListAPIView,  # ✅ import the filtering view
)

router = DefaultRouter()
router.register(r'itineraries', ItineraryViewSet)
router.register(r'enquiries', ItineraryEnquiryViewSet)
router.register(r'reels', ReelViewSet)

urlpatterns = [
    path('', include(router.urls)),
    
    # ✅ Route for filtered itinerary search
    path('itineraries-filtered/', ItineraryListAPIView.as_view(), name='filtered-itineraries'),
]
