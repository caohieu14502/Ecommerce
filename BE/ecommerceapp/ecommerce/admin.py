from django.contrib import admin
from django.template.response import TemplateResponse
from .models import Category, Product
from django.utils.html import mark_safe
from django import forms
from ckeditor_uploader.widgets import CKEditorUploadingWidget
from django.urls import path
from .dao import load_cate


class EcommerceAdminSite(admin.AdminSite):
    site_header = "Ecommerce"

    def get_urls(self):
        return [
            path('course-stats/', self.stats_view)
        ] + super().get_urls()

    def stats_view(self, request):
        return TemplateResponse(request, 'admin/stats.html',{
            "stats": load_cate(),
        })


class ProductForm(forms.ModelForm):
    description = forms.CharField(widget=CKEditorUploadingWidget)

    class Meta:
        model = Product
        fields = '__all__'


class ProductAdmin(admin.ModelAdmin):
    list_display = ['pk', 'name', 'price', 'description', 'quantity', 'category']
    search_fields = ['name']
    list_filter = ['category']
    readonly_fields = ['img']
    form = ProductForm

    # def save_model(self, request, obj, form, change):
    #     if getattr(obj, 'store_id ', None) is None:
    #         obj.store_id = request.user.id
    #     obj.save()

    # def get_form(self, request, obj=None, **kwargs):
    #     form = super(ProductAdmin, self).get_form(request, **kwargs)
    #     form.current_user = request.user
    #     return form

    def img(self, product):
        if product:
            return mark_safe(
                '<img src="/static/{url}" width="120" />'.format(url=product.image.name)
            )


admin_site = EcommerceAdminSite(name='Ecommerce')
admin_site.register(Category)
admin_site.register(Product, ProductAdmin)
