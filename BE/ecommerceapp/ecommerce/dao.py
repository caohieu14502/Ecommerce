from .models import Category, Product


def load_cate(params={}):
    q = Category.objects.filter(active=True)

    cate_id = params.get('cate_id')
    if cate_id:
        q = q.filter(id=cate_id)

    return q


