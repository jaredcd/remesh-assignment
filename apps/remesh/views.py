from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ConversationSerializer, MessageSerializer, ThoughtSerializer
from .models import Conversation, Message, Thought


class ConversationView(viewsets.ModelViewSet):
    serializer_class = ConversationSerializer
    queryset = Conversation.objects.all()

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class ThoughtView(viewsets.ModelViewSet):
    serializer_class = ThoughtSerializer
    queryset = Thought.objects.all()
