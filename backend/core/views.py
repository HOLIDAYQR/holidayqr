from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import viewsets, generics
from django.db.models import Q

from .models import Itinerary, ItineraryEnquiry, Reel
from .serializers import ItinerarySerializer, ItineraryEnquirySerializer, ReelSerializer


# 🔸 API Test Endpoint
def test_api(request):
    return JsonResponse({'message': 'HOLIDAYQR API is working!'})


# 🔸 ViewSets for CRUD Operations
class ItineraryViewSet(viewsets.ModelViewSet):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer


class ItineraryEnquiryViewSet(viewsets.ModelViewSet):
    queryset = ItineraryEnquiry.objects.all()
    serializer_class = ItineraryEnquirySerializer


class ReelViewSet(viewsets.ModelViewSet):
    queryset = Reel.objects.all()
    serializer_class = ReelSerializer


# ✅ Filtering API View (used by frontend for filters)
class ItineraryListAPIView(generics.ListAPIView):
    serializer_class = ItinerarySerializer

    def get_queryset(self):
        queryset = Itinerary.objects.all()

        # Filter: Destination (partial match)
        destination = self.request.query_params.get('destination')
        if destination:
            queryset = queryset.filter(destination__icontains=destination)

        # Filter: Duration range
        duration_range = self.request.query_params.get('duration')
        if duration_range and '-' in duration_range:
            try:
                min_dur, max_dur = map(int, duration_range.split('-'))
                queryset = queryset.filter(duration_days__gte=min_dur, duration_days__lte=max_dur)
            except ValueError:
                pass

        # Filter: Price range
        min_price = self.request.query_params.get('minPrice')
        max_price = self.request.query_params.get('maxPrice')
        if min_price:
            queryset = queryset.filter(price__gte=float(min_price))
        if max_price:
            queryset = queryset.filter(price__lte=float(max_price))

        return queryset
