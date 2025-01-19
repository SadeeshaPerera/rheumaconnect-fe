import ArticleCard from "@/app/components/Articles/ArticleCard";
import { API_ENDPOINTS } from "@/config/endpoints";
import { getData } from "@/lib/helpers/dataFetchHelper";
import { ApiResponse, SubcategoryType } from "@/types/CommonTypes";

export default async function Page({
  params,
}: {
  params: Promise<{ category: string; subcategory: string }>;
}) {
  const { category, subcategory } = await params;

  const response: ApiResponse<SubcategoryType> = await getData(
    `${API_ENDPOINTS.SUBCATEGORIES}?filters[slug][$eq]=${subcategory}&populate=articles&populate=articles.thumbnailImage`
  );

  const [{ name, subtitle, articles }] = response.data;

  return (
    <>
      <section className="flex flex-col items-center justify-center h-[400px] bg-gradient-to-r from-blue-100 to-white text-center px-4">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{name}</h1>
        <p className="text-lg text-gray-600 max-w-2xl">{subtitle}</p>
      </section>

      <section className="container mx-auto px-[24px] xl:px-[220px] my-24 gap-4 grid md:grid-cols-2">
        {articles?.map((article, index) => {
          return (
            <ArticleCard
              key={index}
              title={article?.title}
              description={article?.description}
              slug={article?.slug}
              categorySlug={category}
              subcategorySlug={subcategory}
              thumbnailImage={article?.thumbnailImage}
            />
          );
        })}
      </section>
    </>
  );
}
