import { Button, ButtonVariant } from "@/components/ui/button";
import Image from "next/image";
import Slider from "./_components/Slider";
import GlobalApi from "./_utils/GlobalApi";
import CategoryList from "./_components/CategoryList";
import ProductList from "./_components/ProductList";
import Header from "./_components/Header";

// This file is a server component, which means it can fetch data directly
// from the server and render it on the page.

// This file renders the home page of the app. Also known as the index page.
// It is the first page that users see when they visit the app.
// It is also the default page that is rendered when the app is built.
export default async function Home() {

  const sliderList = await GlobalApi.getSlider();

  const getCategoryList = await GlobalApi.getCategoryList();

  const getProductListzz = await GlobalApi.getProductList();

  return (
    <div>
    
      <div className="lg:py-10 lg:px-16 md:py-8 md:px-10 py-5 px-5">
        {/* Header here: */}


        {/*Sliders here: */}
        <Slider sliderList={sliderList} />

        {/* Category List here: */}
        <CategoryList getCategoryList={getCategoryList} />

        {/* Product List here: */}
        <ProductList getProductList={getProductListzz} />

      </div>
    </div>
  );

}
