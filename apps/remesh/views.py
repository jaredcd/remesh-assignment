from django.shortcuts import render
from django.db.models import Prefetch
from rest_framework import viewsets, filters
from .serializers import ConversationListSerializer, ConversationSerializer, MessageSerializer, ThoughtSerializer
from .models import Conversation, Message, Thought


class ConversationView(viewsets.ModelViewSet):
    filter_backends = [filters.SearchFilter]
    search_fields = ['title', 'messages__text']

    def get_serializer_class(self):
        if self.action == 'list':
            return ConversationListSerializer
        else:
            return ConversationSerializer

    def get_queryset(self):
        if 'text' in self.request.GET:
            text = self.request.GET.get('text', '')
            queryset=Message.objects.filter(text__icontains=text)
        else:
            queryset=Message.objects.all()

        return Conversation.objects.prefetch_related(Prefetch(
            'messages',
            queryset=queryset
        ))

class MessageView(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()

class ThoughtView(viewsets.ModelViewSet):
    serializer_class = ThoughtSerializer
    queryset = Thought.objects.all()
