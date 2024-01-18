import { FormArticle, FormValues } from "@/components/ArticleForm.tsx";

import { useArticleDetail } from "@/hooks/useCallServices/article";
import { useParams } from "react-router-dom";

export const EditArticle = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useArticleDetail(id!);

  if (isLoading) {
    return (
      <div className="h-20 flex items-center justify-center">
        <span className="text-2xl font-medium">Loading...</span>
      </div>
    );
  }

  const formData: FormValues = {
    id: data?.id || "",
    title: data?.title || "",
    description: data?.description || "",
    content: data?.content || "",
  };

  return data ? <FormArticle formData={formData} /> : <span>Not found</span>;
};
