import HeartIcon from "@/assets/icons/heart.svg";
import CommentIcon from "@/assets/icons/conment.svg";
import DeleteIcon from "@/assets/icons/deleteIcon.svg";
import {IArticle} from "@/model/article";
import {Link} from "react-router-dom";
import format from "date-fns/format";
import {memo} from "react";

type ArticleProps = {
    data: IArticle;
};

const View = ({data}: ArticleProps) => {
    return (
        <div>
            <Link
                className="block border border-gray-300 rounded-md overflow-hidden shadow-md hover:shadow-lg hover:border-purple-500 mt-2"
                to={`edit-article/${data.id}`}>
                <div className="grid grid-cols-12 p-4">
                    <div className="col-span-8 xs:col-span-9 sm:col-span-10 pr-5">
                        <div className="flex items-center py-2">
                            <div className="w-7 h-7 rounded-full mr-2">
                                <img
                                    className="w-full h-full rounded-full"
                                    src="https://fastly.picsum.photos/id/258/200/300.jpg?hmac=P7zu49BJwQHHjNE6P2IV2etMQTloOb2Qblmq8ixC-Mg"
                                    alt="article-author-avatar"
                                />
                            </div>

                            <span className="font-extrabold text-xs line-clamp-1 font-martelSans">
              {data.author}
            </span>
                        </div>
                        <span className="text-md sm:text-xl font-bold line-clamp-2">
            {data.title}
          </span>
                        <span className="hidden sm:inline-block mt-1 text-base leading-5 text-neutral-500 line-clamp-2">
            {data.description}
          </span>
                        <div className="flex items-center sm:mt-1">
            <span className="text-sm text-gray-400 inline-block mr-3">
              {format(new Date(data.createdAt), "MMM dd")}
            </span>
                            <div className="text-gray-400 flex items-center ">
                                <img className="w-3 h-3" alt="article-heart" src={HeartIcon}/>
                                <span className="text-sm inline-block ml-1">100 likes</span>
                            </div>
                            <div className="text-gray-400 flex items-center ml-2 ">
                                <img className="w-3 h-3" alt="article-heart" src={CommentIcon}/>
                                <span className="text-sm inline-block ml-1">100 comments</span>
                            </div>
                        </div>
                    </div>
                    <div className="grid grid-row-1 col-span-4 xs:col-span-3 sm:col-span-2 p-3 sm:p-0">
                        <div className="pt-[100%] relative my-auto">
                            <img
                                className="absolute top-0 left-0 w-full h-full object-cover rounded-sm z-10"
                                src={data.imgSrc}
                                alt="article-img-preview"
                            />
                        </div>
                    </div>
                    <div className="text-gray-400 flex items-center ml-2 delete">
                        <img className="w-3 h-3" alt="article-heart" src={DeleteIcon}/>
                        <span className="text-sm inline-block ml-1">Delete</span>
                    </div>
                </div>
            </Link>
        </div>
    );
};

export const Article = memo(View);
