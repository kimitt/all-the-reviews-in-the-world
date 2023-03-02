from rest_framework import serializers
from django.contrib.auth import get_user_model

# 회원가입
class RegistrationSerializer(serializers.ModelSerializer):
    
    passwordConfirm = serializers.CharField(style={"input_type": "password"})

    class Meta:
        model = get_user_model()
        fields = ("username", "email", "password", "passwordConfirm")
        extra_kwargs = {
            "password": {"write_only": True},
            "passwordConfirm": {"write_only": True}
        }

    def save(self):
        user = get_user_model()(
            email=self.validated_data["email"],
            username=self.validated_data["username"],
        )

        password = self.validated_data["password"]
        passwordConfirm = self.validated_data["passwordConfirm"]

        if password != passwordConfirm:
            raise serializers.ValidationError(
                {"password": "Passwords do not match!"})

        user.set_password(password)
        user.save()

        return user

# 로그인
class LoginSerializer(serializers.Serializer):
    email = serializers.EmailField()
    password = serializers.CharField(
        style={"input_type": "password"}, write_only=True)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = get_user_model()
        fields = ("username", "email")
