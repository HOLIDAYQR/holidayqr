from django.contrib import admin
from .models import Itinerary, Reel, ItineraryEnquiry
from django.utils.html import format_html


class ReelInline(admin.TabularInline):
    model = Reel
    extra = 1
    readonly_fields = ('video_preview',)

    def video_preview(self, obj):
        if obj.video:
            return format_html(
                '<video width="200" controls><source src="{}" type="video/mp4"></video>',
                obj.video.url
            )
        return "-"
    video_preview.short_description = "Preview"


class EnquiryInline(admin.TabularInline):
    model = ItineraryEnquiry
    extra = 0
    readonly_fields = ('name', 'phone', 'message', 'created_at')
    can_delete = False
    show_change_link = False


@admin.register(Itinerary)
class ItineraryAdmin(admin.ModelAdmin):
    list_display = ('title', 'destination', 'price', 'duration_days', 'qr_preview')
    search_fields = ('title', 'destination')
    list_filter = ('destination', 'duration_days')
    ordering = ('title',)
    readonly_fields = ('qr_preview',)
    inlines = [ReelInline, EnquiryInline]

    def qr_preview(self, obj):
        if obj.qr_code:
            return format_html('<img src="{}" width="100" />', obj.qr_code.url)
        return "-"
    qr_preview.short_description = "QR Code"


@admin.register(Reel)
class ReelAdmin(admin.ModelAdmin):
    list_display = ('itinerary', 'video_tag', 'uploaded_at')
    readonly_fields = ('video_tag',)

    def video_tag(self, obj):
        if obj.video:
            return format_html(
                '<video width="200" controls><source src="{}" type="video/mp4"></video>',
                obj.video.url
            )
        return "-"
    video_tag.short_description = "Preview"


@admin.register(ItineraryEnquiry)
class ItineraryEnquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone', 'itinerary', 'created_at')
    search_fields = ('name', 'itinerary__title', 'message')
    list_filter = ('created_at', 'itinerary')
    readonly_fields = ('name', 'phone', 'message', 'created_at')
