from django.contrib.auth import get_user
from django.urls import path

from .views import (
    AccessTokenObtainPairView,
    create_counsellor_account,
    create_patient_account,
    get_user_data,
    is_auth,
    update_psychiatrist,
)  

urlpatterns = [
	path('token/', AccessTokenObtainPairView.as_view(), name='obtain_access_token'),
    path('is_auth/', is_auth),
    path('new-patient/', create_patient_account, name="create-patient"),
    path('new-counsellor/', create_counsellor_account, name="create-counsellor"),
    path('update-psychiatrist/', update_psychiatrist, name="update-user"),
    path('get-user-data', get_user_data, name="get-user-data"),
]
