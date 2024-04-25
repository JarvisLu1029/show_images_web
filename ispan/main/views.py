from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from django.http import HttpResponse, HttpResponseBadRequest, JsonResponse
import os

# Create your views here.
def index(request):

    return render(request, "index.html")


@csrf_exempt  
def screenshot_images(request):
    if request.method == 'GET':
        directory = f'static/images/screenshot/'
        image_list = os.listdir(directory)

        image_path_list = []
        for image in image_list:
            image_path_list.append(f'{directory}{image}')

        return JsonResponse({'images': image_path_list})