export const ArticleLoading = () => (
    <div className="grid grid-cols-12 p-4 animate-pulse">
        <div className="col-span-8 xs:col-span-9 sm:col-span-10 pr-5">
            <div className="flex items-center py-2">
                <div className="w-7 h-7 rounded-full mr-2">
                    <div className="w-full h-full rounded-full bg-neutral-200"/>
                </div>

                <div className="w-20 rounded-md h-4 bg-neutral-200"></div>
            </div>
            <div className="w-full rounded-md h-4 bg-neutral-200"></div>
            <div className="w-4/5 mt-1 rounded-md h-4 bg-neutral-200"></div>
            <div className="w-1/5 mt-1 rounded-md h-3 bg-neutral-200"></div>
        </div>
        <div className="grid grid-row-1 col-span-4 xs:col-span-3 sm:col-span-2 p-3 sm:p-0">
            <div className="pt-[100%] relative my-auto">
                <div className="absolute top-0 left-0 w-full h-full object-cover rounded-sm bg-neutral-200"/>
            </div>
        </div>
    </div>
);
