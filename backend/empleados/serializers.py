from rest_framework import serializers
from .models import Empleado

class EmpleadoSerializer(serializers.ModelSerializer):
    idEmpleado = serializers.IntegerField(read_only=True)

    class Meta:
        model = Empleado
        fields = ['idEmpleado', 'nombre', 'departamento', 'sueldo']

    def validate_nombre(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("El nombre es requerido.")
        return value

    def validate_departamento(self, value):
        value = value.strip()
        if not value:
            raise serializers.ValidationError("El departamento es requerido.")
        return value

    def validate_sueldo(self, value):
        if value <= 0:
            raise serializers.ValidationError("El sueldo debe ser mayor a 0.")
        return value