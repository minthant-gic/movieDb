'use client'
import React from 'react';
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";

const Page = () => {
    const getData = async () => {
        const res = await axios.get("https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=686b43c2b223431994b45b75dcd20d2b")
        return res.data
    }

    const { data: response, isError, isSuccess, isLoading } = useQuery({
        queryKey: ['get', 'everything'],
        queryFn: getData
    });

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}
            {isSuccess && (
                <div className="flex flex-wrap">
                    {response.articles.map((article, index) => {
                        // Extract the year from the publishedAt field
                        const publishedYear = new Date(article.publishedAt).getFullYear();

                        return (
                            <div key={index} className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4 p-4">
                                <div className="shadow-lg rounded-lg p-2" style={{ height: '100%' }}>
                                    <img
                                        src={article.urlToImage}
                                        alt={article.title}
                                        className="w-full h-64 object-cover rounded-t-lg"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-4xl font-bold">{article.title}</h2>
                                        <p className="text-gray-500 text-2xl mt-2">{article.author}</p>
                                        <p className="mt-2 text-lg">{publishedYear}</p> {/* Display the extracted year */}
                                        <p className="mt-2">{article.description}</p>
                                        <a href={article.url} className="text-blue-500 flex justify-end items-end underline">Show more</a>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default Page;
