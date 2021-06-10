import datetime
from django.test import TestCase
from ..models import Conversation, Message, Thought
from django.utils import timezone


class ConversationTest(TestCase):
    def create(self):
        return Conversation.objects.create(title="test", start_date=datetime.date.today())

    def test_str(self):
        x = self.create()
        self.assertEqual(str(x), x.title)

class MessageTest(TestCase):
    def setUp(self):
        self.conv = Conversation.objects.create(title="test", start_date=datetime.date.today())

    def create(self):
        return Message.objects.create(text="message text", time=datetime.datetime.now(timezone.utc), conversation=self.conv)

    def test_str(self):
        x = self.create()
        self.assertEqual(str(x), x.text)

class ThoughtTest(TestCase):
    def setUp(self):
        self.conv = Conversation.objects.create(title="test", start_date=datetime.date.today())
        self.msg = Message.objects.create(text="message text", time=datetime.datetime.now(timezone.utc), conversation=self.conv)

    def create(self):
        return Thought.objects.create(text="thought text", time=datetime.datetime.now(timezone.utc), message=self.msg)

    def test_str(self):
        x = self.create()
        self.assertEqual(str(x), x.text)