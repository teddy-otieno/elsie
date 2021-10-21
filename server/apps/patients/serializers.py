from rest_framework import serializers

from apps.account.serializers import PatientSerializer, PsychiatrisSerializer 

from .models import Post, Comment, Event

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ["comment", "patient"]

class PostSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = "__all__"


    def create(self, validated_data):
        print(validated_data)
        comments = validated_data.pop("comments")
        post_instance = Post.objects.create(**validated_data)
        comments = [Comment.objects.create(**comment, post=post_instance) for comment in comments]
        return post_instance


class FeedCommentSerailizer(serializers.ModelSerializer):
    patient = PatientSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ["comment", "patient"]

class FeedPostSerailizer(serializers.ModelSerializer):
    comments = FeedCommentSerailizer(many=True)
    patient = PatientSerializer(read_only=True)
    
    class Meta:
        model = Post
        fields = "__all__"


class EventSerailizer(serializers.ModelSerializer):
    owner = PsychiatrisSerializer(read_only=True)
    
    class Meta:
        model = Event
        fields = "__all__"
