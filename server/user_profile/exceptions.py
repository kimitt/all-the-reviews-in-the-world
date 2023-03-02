from rest_framework.exceptions import APIException

class ProfileDoesNotExist(APIException):
    status_code = 400
    default_detail = '요청한 프로필이 존재하지 않네요'