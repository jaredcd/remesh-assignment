from rest_framework import serializers
from .models import Conversation, Message, Thought


class ThoughtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Thought
        fields = ('id', 'text', 'time', 'message')

class MessageSerializer(serializers.ModelSerializer):
    thoughts = ThoughtSerializer(many=True, read_only=True)

    class Meta:
        model = Message
        fields = ('id', 'text', 'time', 'conversation', 'thoughts')

class ConversationSerializer(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)

    class Meta:
        model = Conversation
        fields = ('id', 'title', 'start_date', 'messages')
