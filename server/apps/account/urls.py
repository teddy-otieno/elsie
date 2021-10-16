from django.urls import path

from .views import (
    AccessTokenObtainPairView,
    create_counsellor_account,
    create_patient_account,
)  

urlpatterns = [
	path('token/', AccessTokenObtainPairView.as_view(), name='obtain_access_token'),
    path('new-patient', create_patient_account, name="create-patient"),
    path('new-counsellor', create_counsellor_account, name="create-counsellor")
]
