from rest_framework import serializers
from ..models import User


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password_confirmation = serializers.CharField(write_only=True)        
    
    class Meta:
        model = User
        fields = ('id', 'email', 'username', 'password', 'password_confirmation', 'bio')
    
    # data comes from the req.body
    def validate(self, data):
       password = data.get('password')
       password_confirmation = data.pop('password_confirmation') 
       
       if password != password_confirmation:
           raise serializers.ValidationError("Passwords don't match")
       
       return data
   
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)
    
    
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields =  fields = ('id', 'email', 'username','bio')