from django.contrib import admin
from .models import Itinerary, Reel, ItineraryEnquiry
from django.utils.html import format_html


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('title', 'destination', 'price', 'duration_days')
    search_fields = ('title', 'destination')
    list_filter = ('destination',)


@admin.register(Reel)
class ReelAdmin(admin.ModelAdmin):
    list_display = ('itinerary', 'preview_video', 'uploaded_at')
    list_filter = ('itinerary',)
    search_fields = ('itinerary__title',)

    def preview_video(self, obj):
        if obj.video:
            return format_html(
                '<video width="160" height="90" controls>'
                '<source src="{}" type="video/mp4">'
                'Your browser does not support the video tag.'
                '</video>',
                obj.video.url
            )
        return "-"
    preview_video.short_description = "Video Preview"


@admin.register(ItineraryEnquiry)
class ItineraryEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'itinerary', 'created_at')
    search_fields = ('name', 'itinerary__title')
    list_filter = ('created_at',)
