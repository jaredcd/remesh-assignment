from django.db import models


class Conversation(models.Model):
    title = models.CharField(max_length=150)
    start_date = models.DateField(auto_now_add=True)

    def _str_(self):
        return self.title

class Message(models.Model):
    text = models.TextField()
    time = models.TimeField(auto_now_add=True)
    conversation = models.ForeignKey(
        'Conversation',
        related_name='messages',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['time']

    def _str_(self):
        return self.text

class Thought(models.Model):
    text = models.TextField()
    time = models.TimeField(auto_now_add=True)
    message = models.ForeignKey(
        'Message',
        related_name='thoughts',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['time']

    def _str_(self):
        return self.text