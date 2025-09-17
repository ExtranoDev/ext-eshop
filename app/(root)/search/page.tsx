import ProductCard from "@/components/shared/product/product-card";
import {
  getAllCategories,
  getAllProducts,
} from "@/lib/actions/product.actions";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import Pagination from "@/components/shared/pagination";
import { SortSelect } from "@/components/shared/sort-select";
import { getMyCart } from "@/lib/actions/cart.actions";
import { Cart } from "@/types";

const prices = [
  { name: "$1 to $50", value: "1-50" },
  { name: "$51 to $100", value: "51-100" },
  { name: "$101 to $200", value: "101-200" },
];
const ratings = [4, 3, 2, 1];

export async function generateMetadata(props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
}) {
  const { q = "", category = "" } = await props.searchParams;
  if (q || category) {
    return {
      title: `Search results for ${q || category}`,
    };
  }
  return {
    title: "Shop All Products",
  };
}

const SearchPage = async (props: {
  searchParams: Promise<{
    q?: string;
    category?: string;
    price?: string;
    rating?: string;
    sort?: string;
    page?: string;
  }>;
}) => {
  const {
    q = "all",
    category = "all",
    price = "all",
    sort = "newest",
    rating = "all",
    page = "1",
  } = await props.searchParams;

  const cart = (await getMyCart()) as Cart;
  const getFilterUrl = (filter: Record<string, string>, value?: string) => {
    const plainSearchParams = Object.fromEntries(
      Object.entries({ q, category, price, sort, rating, page })
    );
    const params: Record<string, string> = {
      ...plainSearchParams,
      page: "1",
      ...filter,
    };
    if (value) {
      params[Object.keys(filter)[0]] = value;
    }
    return `/search?${new URLSearchParams(params)}`;
  };

  const [categories, products] = await Promise.all([
    getAllCategories(),
    getAllProducts({
      query: q,
      category,
      price,
      rating,
      sort,
      page: Number(page),
    }),
  ]);

  const FilterLinks = () => (
    <div className="px-3">
      <div className="flex items-center justify-between p-4 md:pb-4 md:px-0 border-b md:mb-4">
        <h2 className="text-lg font-bold">Filters</h2>
        <Button variant="outline" size="sm" asChild>
          <Link href="/search">Clear All</Link>
        </Button>
      </div>
      <Accordion
        type="multiple"
        defaultValue={["categories", "price", "rating"]}
        className="w-full px-3"
      >
        <AccordionItem value="categories">
          <AccordionTrigger className="text-base hover:no-underline">
            Categories
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 pt-1">
              <li>
                <Link
                  href={getFilterUrl({ category: "all" })}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                    category === "all"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Any
                </Link>
              </li>
              {categories.map((c) => (
                <li key={c.category}>
                  <Link
                    href={getFilterUrl({ category: c.category })}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                      category === c.category
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {c.category}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="price">
          <AccordionTrigger className="text-base hover:no-underline">
            Price
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 pt-1">
              <li>
                <Link
                  href={getFilterUrl({ price: "all" })}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                    price === "all"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Any
                </Link>
              </li>
              {prices.map((p) => (
                <li key={p.value}>
                  <Link
                    href={getFilterUrl({ price: p.value })}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                      price === p.value
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {p.name}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
        <AccordionItem value="rating">
          <AccordionTrigger className="text-base hover:no-underline">
            Customer Ratings
          </AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-1 pt-1">
              <li>
                <Link
                  href={getFilterUrl({ rating: "all" })}
                  className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                    rating === "all"
                      ? "bg-primary/10 font-semibold text-primary"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  Any
                </Link>
              </li>
              {ratings.map((r) => (
                <li key={r}>
                  <Link
                    href={getFilterUrl({ rating: `${r}` })}
                    className={`block rounded-md px-2 py-1.5 text-sm transition-colors hover:bg-muted ${
                      rating === r.toString()
                        ? "bg-primary/10 font-semibold text-primary"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {`${r} Stars & up`}
                  </Link>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );

  return (
    <div className="grid md:grid-cols-5 md:gap-5">
      <div className="hidden md:block">
        <FilterLinks />
      </div>
      <div className="md:col-span-4 space-y-4">
        <div className="flex-between flex-col gap-4 my-4 md:flex-row">
          <div className="flex flex-wrap items-center gap-2">
            {products.data.length} Products
            {q !== "all" && (
              <Badge variant="secondary">
                {q}
                <Link href={getFilterUrl({ q: "all" })} className="ml-2">
                  x
                </Link>
              </Badge>
            )}
            {category !== "all" && (
              <Badge variant="secondary">
                {category}
                <Link href={getFilterUrl({ category: "all" })} className="ml-2">
                  x
                </Link>
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            <div className="md:hidden">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="ml-2">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <SheetHeader>
                    <SheetTitle>Product Filters</SheetTitle>
                  </SheetHeader>
                  <FilterLinks />
                </SheetContent>
              </Sheet>
            </div>
            <SortSelect initialSort={sort} />
          </div>
        </div>
        {products.data.length === 0 ? (
          <div className="text-center text-lg">No products found.</div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.data.map((product) => (
              <ProductCard key={product.id} product={product} cart={cart} />
            ))}
          </div>
        )}
        <Pagination page={Number(page) || 1} totalPages={products.totalPages} />
      </div>
    </div>
  );
};

export default SearchPage;
