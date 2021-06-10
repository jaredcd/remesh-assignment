import datetime
from django.urls import reverse
from ..models import Conversation, Message, Thought
from django.utils import timezone
from rest_framework.test import APITestCase

class ConversationViewTest(APITestCase):
	def setUp(self):
		Conversation.objects.create(title="other", start_date=datetime.date.today())

	def create(self):
		return Conversation.objects.create(title="test", start_date=datetime.date.today())

	def test_get_list(self):
		x = self.create()
		url = reverse('conversation-list')
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.title, resp.content.decode())

		# We don't want the nested data when listing all conversations
		self.assertNotIn('messages', resp.content.decode())

	def test_get_detail(self):
		x = self.create()
		url = reverse('conversation-detail', args=[x.id])
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.title, resp.content.decode())
		self.assertIn('messages', resp.content.decode())

	def test_search_list(self):
		x = self.create()
		url = reverse('conversation-list') + "?search=test"
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.title, resp.content.decode())

		# We don't want the other conversation in the result
		self.assertNotIn('other', resp.content.decode())

	def test_search_detail(self):
		x = self.create()
		Message.objects.create(text="first", time=datetime.datetime.now(timezone.utc), conversation=x)
		Message.objects.create(text="second", time=datetime.datetime.now(timezone.utc), conversation=x)

		url = reverse('conversation-detail', args=[x.id]) + "?text=second"
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.title, resp.content.decode())

		# We don't want the other message in the result
		self.assertNotIn('other', resp.content.decode())

class MessageViewTest(APITestCase):
	def setUp(self):
		self.conv = Conversation.objects.create(title="test", start_date=datetime.date.today())

	def create(self):
		return Message.objects.create(text="message text", time=datetime.datetime.now(timezone.utc), conversation=self.conv)

	def test_get_detail(self):
		x = self.create()
		url = reverse('message-detail', args=[x.id])
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.text, resp.content.decode())
		self.assertIn('thoughts', resp.content.decode())

class ThoughtViewTest(APITestCase):
	def setUp(self):
		self.conv = Conversation.objects.create(title="test", start_date=datetime.date.today())
		self.msg = Message.objects.create(text="message text", time=datetime.datetime.now(timezone.utc), conversation=self.conv)

	def create(self):
		return Thought.objects.create(text="though text", time=datetime.datetime.now(timezone.utc), message=self.msg)

	def test_get_detail(self):
		x = self.create()
		url = reverse('thought-detail', args=[x.id])
		resp = self.client.get(url)

		self.assertEqual(resp.status_code, 200)
		self.assertIn(x.text, resp.content.decode())