import {BaseQuery, PaginationParams} from "@/model/intefaceBase.ts";

export interface GetListArticles extends BaseQuery, PaginationParams {
    textSearch?: string;
}

export interface IArticleRequest {
    title: string;
    description: string;
    content: string;
}

export interface IUpdatingArticle {
    id: string;
    payload: IArticleRequest;
}
