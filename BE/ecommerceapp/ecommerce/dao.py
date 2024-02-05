# from django.db.models import Sum, F
# from django.db.models.functions import ExtractMonth
# from .models import *
#
#
# def load_cate(params={}):
#     q = Category.objects.filter(active=True)
#
#     cate_id = params.get('cate_id')
#     if cate_id:
#         q = q.filter(id=cate_id)
#
#     name = params.get("name")
#     if name:
#         q = q.filter(name__icontains=name)
#     return q
#
#
# def stats_revenue(params={}):
#     month = params.get('month')
#
#     result = Order.objects.values(
#         month=ExtractMonth('order_date')
#     ).annotate(
#         total_price=Sum(F('orderdetail__unit_price') * F('orderdetail__quantity'))
#     ).order_by(
#         'total_price'
#     )
#
#     if month:
#         result = result.filter(month=month)
#
#     return result
#
