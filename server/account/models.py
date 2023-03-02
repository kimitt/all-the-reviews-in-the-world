from django.db import models
from django.conf import settings

from django.contrib.auth.models import (
    AbstractBaseUser, BaseUserManager, PermissionsMixin
)

class UserManager(BaseUserManager):
    def create_user(self, username, email, password=None):
        
        if username is None:
            raise TypeError('사용자 이름이 있어야 합니다.')

        if email is None:
            raise TypeError('이메일이 있어야 합니다.')

        if password is None:
            raise TypeError('비밀번호가 있어야 합니다.')
        
        user = self.model(
        username = username,
        # 중복 최소화를 위한 정규화
        email=self.normalize_email(email),
        )

        # django 에서 제공하는 password 설정 함수
        user.set_password(password)
        user.save(using=self._db) # db 저장 한다는 말인가?
        
        return user
    
    # admin
    def create_superuser(self, username, email, password):
        
        # "create_user"함수를 이용해 우선 사용자를 DB에 저장
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password
        )
        
        # 관리자로 지정
        user.is_superuser = True
        user.is_staff = True
        user.is_admin= True
        user.save(using=self._db)
        
        return user
    
    
    
class User(AbstractBaseUser, PermissionsMixin):
    username = models.CharField(max_length=255, unique=True)
    email = models.EmailField(db_index=True, unique=True)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=True)
    is_superuser = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    objects = UserManager()
    
    USERNAME_FIELD = 'email' # 로그인 시 사용 
    REQUIRED_FIELDS = ['username'] # 필수값

class Follow(models.Model):
    follow   = models.ForeignKey('User', on_delete=models.CASCADE, related_name='follow') # 팔로우 하는 사람
    followed = models.ForeignKey('User', on_delete=models.CASCADE, related_name='followed') # 팔로우 당한 사람

    class Meta:
        db_table = 'follows'
    
    def __str__(self):
        return self.username
    
    # 사용자 권한 시스템
    def has_perm(self, perm, obj=None): # Object를 반환하는 경우 해당 Object로 사용 권한을 확인하는 절차가 필요
        return True

    def has_module_perms(self, app_label): # True를 반환하여 주어진 앱(App)의 모델(Model)에 접근 가능
        return True