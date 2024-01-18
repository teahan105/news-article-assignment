import {useCreateArticle, useUpdateArticle,} from "@/hooks/useCallServices/article";

import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

export type FormValues = {
    title: string;
    description: string;
    content: string;
    date: string;
    id?: string;
};

type FormProps = {
    isCreate?: boolean;
    formData?: FormValues;
};

export const FormArticle = ({isCreate = false, formData}: FormProps) => {
    const navigate = useNavigate();
    const {mutate: createArticle} = useCreateArticle();
    const {mutate: updateArticle} = useUpdateArticle();

    const {
        handleSubmit,
        register,
        formState: {errors},
        setValue
    } = useForm<FormValues>({
        defaultValues: isCreate
            ? {
                title: "",
                description: "",
                content: "",
                date: "",
            }
            : formData,
    });

    const onSubmit = (data: FormValues) => {
        isCreate
            ? createArticle(data, {
                onSuccess: () => {
                    navigate("/");
                },
                onError: () => {
                    // TODO: handle error
                },
            })
            : updateArticle(
                {id: formData?.id as string, payload: data},
                {
                    onSuccess: () => {
                        // TODO: handle show success toast
                        navigate("/");
                    },
                }
            );
    };

    return (
        <div className="container mx-auto lg:px-20 pt-0 lg:pt-5">
            <div className="py-5 md:py-7 lg:py-8 px-4 lg:px-0">
                <h3 className="text-3xl lg:text-5xl font-roboto font-bold text-blue-600">
                    {isCreate ? "Create a New Article" : "Edit Article"}
                </h3>
            </div>
            <form className="px-4 lg:px-0 w-full" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-12 mb-4">
                    <div className="col-span-12 lg:col-span-12">
                        <label className="block text-gray-500 font-bold mb-1">
                            Title
                        </label>
                        <input
                            className="appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            type="text"
                            placeholder="Article title"
                            {...register("title", {required: "Title is required!"})}
                        />
                        {errors.title && (
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.title.message}
                            </span>
                        )}
                    </div>
                    {/*<br/>*/}
                    {/*<div className="col-span-12 lg:col-span-12">*/}
                    {/*    /!* Date input *!/*/}
                    {/*    <label className="block text-gray-500 font-bold mb-1 mt-4">*/}
                    {/*        Date*/}
                    {/*    </label>*/}
                    {/*    <input*/}
                    {/*        className="appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"*/}
                    {/*        type="date"*/}
                    {/*        {...register("date", {required: "Date is required!"})}*/}
                    {/*    />*/}
                    {/*    {errors.date && (*/}
                    {/*        <span className="text-sm text-red-500 mt-2 block">*/}
                    {/*            {errors.date.message}*/}
                    {/*        </span>*/}
                    {/*    )}*/}
                    {/*</div>*/}
                    <br/>
                    <div className="col-span-12 lg:col-span-12 mt-3">
                        <label className="block text-gray-500 font-bold mb-1">
                            Description
                        </label>
                        <input
                            className=" appearance-none border-2 border-gray-200 rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-blue-500"
                            {...register("description", {
                                required: "Description is required!",
                            })}
                            placeholder="What's this article about?"
                        />
                        {errors.description && (
                            <span className="text-sm text-red-500 mt-2 block">
                                {errors.description.message}
                            </span>
                        )}
                    </div>
                </div>
                <br/>
                <div className="grid grid-cols-12 mb-4">
                    <div className="col-span-12">
                        <label className="block text-gray-500 font-bold mb-1">
                            Content
                        </label>
                        <ReactQuill
                            theme="snow"
                            className="quill-editor border-gray-200 rounded "
                            value={formData?.content}
                            onChange={(value) => setValue('content', value)}
                            modules={{
                                toolbar: [
                                    ['bold', 'italic', 'underline', 'strike'],
                                    [{'header': 1}, {'header': 2}],
                                    [{'list': 'ordered'}, {'list': 'bullet'}],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                            placeholder="Article content"
                        />
                        {errors.content && (
                            <span className="text-sm text-red-500 mt-2 block">
                {errors.content.message}
              </span>
                        )}
                    </div>
                </div>
                <div className="grid grid-cols-12 mt-4">
                    <div className="col-span-12 lg:col-span-6">
                        <button
                            className="w-full lg:w-40 shadow bg-blue-500 hover:bg-blue-400 focus:shadow-outline focus:outline-none text-white font-bold py-3 px-4 rounded"
                            type="submit"
                        >
                            {isCreate ? "Publish article" : "Update article"}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};