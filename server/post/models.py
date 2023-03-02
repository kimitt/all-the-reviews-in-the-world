from django.db import models
from django.contrib.auth import get_user_model
from category.models import Category

from django.utils import timezone




User = get_user_model() # 이 방법과 account를 import 해오는 것의 차이? 


def blog_directory_path(instance, filename):
    return 'blog/{0}/{1}'.format(instance.title, filename) # {0}:title {1}:filename



# POST MODEL
class Post(models.Model):
    
    class PostObjects(models.Manager):
        def get_queryset(self):
            return super().get_queryset().filter(status='published') # published 상태의 게시글 
        
        options = (
            ('draft', 'Draft'),
            ('published', 'Published'),
        )

    # 작성자
    author = models.ForeignKey( # related_name -> ORM 활용 위함, ORM 모델은 쿼리문 없이 db와 소통 / 자신이 참조하는 테이블을 참조
        User, on_delete=models.CASCADE, related_name='posts', related_query_name='post')
    # 제목
    title = models.CharField(max_length=100) 
    # 슬러그
    slug = models.SlugField(blank=True, null=True)     
    # 썸네일
    thumbnail = models.ImageField(upload_to=blog_directory_path, null=False)
    # 내용
    description = models.TextField()
    # 이미지
    image = models.ImageField(upload_to='images/media', null=True, blank=True) 
    # 비디오
    video = models.FileField(upload_to=blog_directory_path, blank=True, null=True)
    # 미리보기
    short_description = models.TextField(max_length=255)
    # 카테고리
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.SET_NULL) #카테고리 
    # 작성시간
    published = models.DateTimeField(auto_now_add=True)
    # 상태
    status = models.CharField(max_length=10, choices=PostObjects.options, default='draft')
    # 태그
    # tags = models.ManyToManyField(Tag, blank=True)
    # 조회수
    visit_count = models.IntegerField(default=0)
    # default manager
    objects = models.Manager() 
    # custom manager 
    postobjects = PostObjects()  
    
    # updated_at = models.DateTimeField(auto_now=True)
    # is_published = models.BooleanField(default=False)

    class Meta:
        ordering = ('-published',)

    def __str__(self):
        return self.title

    def get_video(self):
        if self.video:
            return self.video.url
        return ''

    def get_thumbnail(self):
        if self.thumbnail:
            return self.thumbnail.url
        return ''