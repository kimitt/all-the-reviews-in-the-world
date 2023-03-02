from django.db import models
from account.models import User


class Profile(models.Model):
    # User와 Profile 둘 사이에 관계 형성
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    bio = models.TextField(blank=True)
    image = models.URLField(blank=True)
    follows = models.ManyToManyField(
        'self',
        related_name='followers',
        symmetrical=False, # 팔로우 시 자동 맞팔 false
        blank=True
    )
    
    # favorites = models.ManyToManyField(
    #     'post.Post',
    #     related_name='favorited_by'
    # )
    
    
    
        
    def __str__(self):
        return self.user.username
    
    def follow(self, profile):
        # 프로필을 팔로우 하지 않았다면 프로필을 팔로우함 ?
        self.follows.add(profile)

    def unfollow(self, profile):
        # 이미 팔로우 한 경우 팔로우를 취소
        self.follows.remove(profile)

    def is_following(self, profile):
        # 프로필을 팔로잉 하고 있으면 True 반환
        return self.follows.filter(pk=profile.pk).exists()

    def is_followed_by(self, profile):
        # 프로필이 나를 팔로우 하면 True
        return self.followed_by.filter(pk=profile.pk).exists()