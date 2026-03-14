from django.contrib import admin
from .models  import Product,User
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
# Register your models here.
admin.site.register(Product)
@admin.register(User)
class CustomUserAdmin(BaseUserAdmin):
    fieldsets = (
        (None, {"fields": ("username", "email", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login",)}),  # chỉ last_login
    )

    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("username", "email", "password1", "password2", "is_active", "is_staff", "is_superuser"),
        }),
    )

    list_display = ("username", "email", "is_staff", "is_superuser", "is_active", "last_login", "created_at")
    search_fields = ("username", "email")
    ordering = ("username",)

    # cho phép hiển thị created_at nhưng không chỉnh sửa
    readonly_fields = ("created_at",)