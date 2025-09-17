import ProductCarousel from "@/components/shared/product/product-carousel";
import ProductList from "@/components/shared/product/product-list";
import {
  getFeaturedProducts,
  getLatestProducts,
} from "@/lib/actions/product.actions";
import ViewAllProductsButton from "@/components/view-all-products-button";
import IconBox from "@/components/icon-boxes";
import DealCountdown from "@/components/deal-countdown";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";

const Homepage = async () => {
  const latestProducts = await getLatestProducts();

  const featuredProduct = await getFeaturedProducts();
  const cart = (await getMyCart()) as Cart;

  return (
    <>
      {featuredProduct.length > 0 && <ProductCarousel data={featuredProduct} />}
      <ProductList data={latestProducts} cart={cart} title="Newest Arrival" />
      <ViewAllProductsButton />
      <DealCountdown />
      <IconBox />
    </>
  );
};

export default Homepage;
