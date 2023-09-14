'use client'
import React from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Nav from "@/app/nav";
import Pagination from "@/app/pagination";
import Link from "next/link";
import Image from "next/image";
import loading from "../../../public/loading.gif";
import Footer from "@/app/footer";

const Page = () => {
    const getData = async () => {
        const res = await axios.get("https://yts.mx/api/v2/list_movies.json?sort_by=rating&limit=20")
        return res.data
    }

    const {data: response, isError, isSuccess, isLoading} = useQuery({
        queryKey: ['get', 'trend'],
        queryFn: getData
    });

    const totalPages = 5; // Change this to your desired number of pages

    // Generate an array of page numbers from 1 to totalPages
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);
    return (
        <div>
            {isLoading && <div className="flex justify-center items-center mt-52 ml-12">
                <Image src={loading} alt=""/>
            </div>}
            {isError && <p>Error fetching data</p>}
            {isSuccess && (
                <>
                    <Nav/>
                    <div className="flex flex-wrap">
                        {response.data.movies.map((movie, index) => (
                            <div key={index} className="w-1/2 mt-2">
                                <Link legacyBehavior={true} href={`/detail/${movie.id}`}>
                                    <a>
                                        <div
                                            className="shadow-lg rounded-lg border-4 border-black hover:border-green-400 ml-2 mt-2 mr-2">
                                            <img
                                                src={movie.large_cover_image}
                                                alt={movie.title}
                                                className="h-fit w-fit rounded-sm"
                                            />
                                        </div>
                                    </a>
                                </Link>
                                <div className="ml-3 text-xs mt-2 font-bold">
                                    <div>{movie.title}</div>
                                </div>
                                <div className="ml-3 text-xs font-bold text-gray-300">
                                    <div>{movie.year}</div>
                                </div>
                            </div>
                        ))}
                        <Pagination/>
                        <div className="ml-36">
                            <Footer/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;