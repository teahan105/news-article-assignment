import {ChangeEvent, useEffect, useRef, useState} from "react";

import {Article} from "./Article";
import {ArticleLoading} from "./ArticleLoading";
import {useDebounce} from "@/hooks/useDebounce";
import {useInfiniteArticleQuery} from "@/hooks/useCallServices/article";
import {useOnScreen} from "@/hooks/useOnScreen";
import {useNavigate} from "react-router-dom";

export const Home = () => {
    const endListRef = useRef(null);

    const [searchValue, setSearchValue] = useState<string | undefined>("");
    const debounce = useDebounce<string>(searchValue!, 500);
    const navigate = useNavigate();

    const {data, fetchNextPage, isLoading, isFetching} =
        useInfiniteArticleQuery({perPage: 6, textSearch: debounce});

    const isOnScreen = useOnScreen(endListRef);

    const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchValue(event.target.value);
    };

    useEffect(() => {
        if (isOnScreen) {
            fetchNextPage();
        }
    }, [fetchNextPage, isOnScreen]);

    useEffect(() => {
        window.scrollTo({top: 0});
    }, []);

    return (
        <div>
            <div className="sm:container mx-auto lg:px-20 p-4 sticky top-[52px] lg:top-[76px] z-50 bg-white">
                <div className="lg:px-0 pb-2 lg:py-5 lg:pt-0">
                    <div className="flex items-center justify-between">
                        <input
                            onChange={onChangeHandler}
                            className="appearance-none border-2 border-neutral-300 rounded-full w-full sm:w-3/5 py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-500 my-2"
                            placeholder="Search"
                            style={{maxWidth: '400px', margin: '0 auto'}}
                        />
                        <button
                            className="px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-700 transition duration-300"
                            onClick={() => {
                                navigate("/new-article");
                            }}
                        >
                            Create your Article
                        </button>
                    </div>
                </div>
            </div>
            <div className="sm:container mx-auto lg:px-20 min-h-screen">
                <div className="grid grid-cols-12">
                    <div className="col-span-12 lg:col-span-12">
                        {isLoading &&
                            Array.from(Array(5)).map((_, idx) => (
                                <ArticleLoading key={idx}/>
                            ))}

                        {data.length ? (
                            data.map((article) => <Article key={article.id} data={article}/>)
                        ) : (
                            <>
                                <span>Not found</span>
                            </>
                        )}
                    </div>
                </div>
                <div ref={endListRef} className="h-10">
                    {!isLoading && isFetching && isOnScreen && (
                        <div className="w-full flex items-center justify-center relative">
                            <div role="status">
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                                    viewBox="0 0 100 101"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                        fill="currentColor"
                                    />
                                    <path
                                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                        fill="currentFill"
                                    />
                                </svg>
                                <span className="sr-only">Loading...</span>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};
