from django.db import models


class Conversation(models.Model):
    title = models.CharField(max_length=150)
    start_date = models.DateField()

    class Meta:
        ordering = ['start_date', 'title']

    def __str__(self):
        return self.title

class Message(models.Model):
    text = models.TextField()
    time = models.DateTimeField()
    conversation = models.ForeignKey(
        'Conversation',
        related_name='messages',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['time']

    def __str__(self):
        return self.text

class Thought(models.Model):
    text = models.TextField()
    time = models.DateTimeField()
    message = models.ForeignKey(
        'Message',
        related_name='thoughts',
        on_delete=models.CASCADE
    )

    class Meta:
        ordering = ['time']

    def __str__(self):
        return self.text