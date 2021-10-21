from rest_framework import serializers
from apps.account.serializers import PatientSerializer, PsychiatrisSerializer 
from .models import Post, Comment, Event, Community, CommunityMember, CommunityMessage

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


class CommunityMemberSerializer(serializers.ModelSerializer):
    member = PatientSerializer(read_only=True)

    class Meta:
        model = CommunityMember
        fields = ["member"]

class CommunityMessageSerializer(serializers.ModelSerializer):

    class Meta:
        model = CommunityMessage
        fields = "__all__"

class CommunitySerializer(serializers.ModelSerializer):
    community_members = CommunityMemberSerializer(many=True)
    chat_room = CommunityMessageSerializer(many=True)

    class Meta:
        model = Community
        fields = "__all__"
        read_only_fields = ["avatar"]

    def create(self, validated_data):
        community_members = validated_data.pop('community_members', None)
        chat_room = validated_data.pop('chat_room', None)

        community_instance = Community.objects.create(**validated_data)

        if community_members is not None and len(community_members) > 0:
            [CommunityMember.objects.create(**member) for member in community_members]

        if chat_room is not None and len(chat_room) > 0:
            [CommunityMessage.objects.create(**message) for message in chat_room]

        return community_instance
