from django.shortcuts import redirect, render
from django.views.generic import View

from .forms import TaskForm
from .models import Task


class TaskView(View):
    def get(self, request):
        params = {}
        params["task"] = Task.objects.all()
        params["form"] = TaskForm()
        return render(request, "task_list.html", params)

    def post(self, request):
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
        return redirect("task_list")
