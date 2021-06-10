from django.contrib import admin
from .models import Conversation, Message, Thought


class ConversationAdmin(admin.ModelAdmin):
    list_display = ('title', 'start_date')

class MessageAdmin(admin.ModelAdmin):
    list_display = ('text', 'time', 'conversation')

class ThoughtAdmin(admin.ModelAdmin):
    list_display = ('text', 'time', 'message')

admin.site.register(Conversation, ConversationAdmin)
admin.site.register(Message, MessageAdmin)
admin.site.register(Thought, ThoughtAdmin)