from django.db import models
import qrcode
from io import BytesIO
from django.core.files import File

class Itinerary(models.Model):
    title = models.CharField(max_length=150, blank=True, null=True)
    description = models.TextField()
    destination = models.CharField(max_length=100, default="")
    duration_days = models.IntegerField(default=1)
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    qr_code = models.ImageField(upload_to='qr_codes', blank=True)

    def save(self, *args, **kwargs):
        qr = qrcode.make(f"http://localhost:3000/itinerary/{self.id}")
        stream = BytesIO()
        qr.save(stream, format='PNG')
        self.qr_code.save(f"{self.title}_qr.png", File(stream), save=False)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title

class ItineraryEnquiry(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='enquiries')
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Enquiry by {self.name} for {self.itinerary.title}"

class Reel(models.Model):
    itinerary = models.ForeignKey(Itinerary, on_delete=models.CASCADE, related_name='reels')
    video = models.FileField(upload_to='reels/')
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Reel for {self.itinerary.title}"
