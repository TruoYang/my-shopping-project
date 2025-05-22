import GlobalApi from '@/app/_utils/GlobalApi';
import CategoryList from '@/app/_components/CategoryList';
import RelatedProducts from '@/app/_components/RelatedProducts';
import Header from '@/app/_components/Header';

async function ProductCategory({ params }) {
  // Giải mã và thay -- lại thành /
  const categoryName = decodeURIComponent(params.categoryName);

  // Lấy danh sách sản phẩm thuộc category
  const productCategory = await GlobalApi.getProductListByCategory(categoryName);

  // Lấy danh sách category cho CategoryList
  const categoryList = await GlobalApi.getCategoryList();

  return (
    <div>
      
      <div className="px-3 md:px-5 lg:px-10 py-3 lg:py-5">
        <CategoryList
          getCategoryList={categoryList}
          selectedCategory={categoryName}
        />
        <RelatedProducts products={productCategory} />
      </div>
    </div>
  );
}

export default ProductCategory;
