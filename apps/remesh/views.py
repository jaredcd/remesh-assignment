from django.shortcuts import render
from rest_framework import viewsets
from .serializers import ConversationListSerializer, ConversationSerializer, MessageSerializer, ThoughtSerializer
from .models import Conversation, Message, Thought


class ConversationView(viewsets.ModelViewSet):
    queryset = Conversation.objects.all()

    def get_serializer_class(self):
        if self.action == 'list':
            return ConversationListSerializer
        else:
            return ConversationSerializer

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class ThoughtView(viewsets.ModelViewSet):
    serializer_class = ThoughtSerializer
    queryset = Thought.objects.all()
