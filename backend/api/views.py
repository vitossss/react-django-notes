from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .serializers import NoteSerializer
from .models import Note


@api_view(['GET'])
def getNotes(request):
    notes = Note.objects.all()
    serializers = NoteSerializer(notes, many=True)
    return Response(serializers.data)


@api_view(['GET'])
def getNote(request, pk):
    note = Note.objects.get(id=pk)
    serializers = NoteSerializer(note, many=False)
    return Response(serializers.data)


@api_view(['PUT'])
def updateNote(request, pk):
    data = request.data
    note = Note.objects.get(id=pk)
    serializers = NoteSerializer(instance=note, data=data)

    if serializers.is_valid():
        serializers.save()

    return Response(serializers.data)


@api_view(['DELETE'])
def deleteNote(request, pk):
    note = Note.objects.get(id=pk)
    note.delete()
    return Response('Note was deleted!')


@api_view(['POST'])
def createNote(request):
    data = request.data
    note = Note.objects.create(
        body=data['body']
    )
    serializer = NoteSerializer(note, many=False)
    return Response(serializer.data)
