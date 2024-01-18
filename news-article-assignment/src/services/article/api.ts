import {GetListArticles, IArticleRequest, IUpdatingArticle} from "./interfaces";

import {IArticle} from "@/model/article";
import {PaginationResponse} from "@/model/intefaceBase.ts";
import {api} from "../api.ts";

export const createArticle = (payload: IArticleRequest) =>
    api.post("articles", payload);

export const updateArticle = ({id, payload}: IUpdatingArticle): Promise<IArticle> =>
    api.patch(`articles/${id}`, payload);

export const getArticleDetail = (id: string): Promise<IArticle> =>
    api.get(`articles/${id}`);

export const getListArticles = (
    params?: GetListArticles
): Promise<PaginationResponse<IArticle[]>> =>
    api.get("articles", {params});
