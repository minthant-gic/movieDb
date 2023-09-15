'use client'
import React, {useEffect, useState} from 'react';
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import Nav from "@/app/nav";
import Pagination from "@/app/pagination";
import Link from "next/link";
import Image from "next/image";
import loading from "../../../public/loading.gif";
import Footer from "@/app/footer";

const Page = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const [movies, setMovies] = useState([]);

    const getData = async () => {
        try {
            const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?quality-=4k&page=${currentPage}`);
            setMovies(res.data.data.movies);
            setTotalPages(Math.ceil(res.data.data.movie_count / res.data.data.limit));
            setIsLoading(false);
            setIsError(false);
        } catch (error) {
            setIsLoading(false);
            setIsError(true);
        }
    };

    useEffect(() => {
        getData();
    }, [currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    return (
        <div>

            {isLoading && <div className="flex justify-center items-center mt-60 ml-12">
                <Image src={loading} alt=""/>
            </div>}
            {isError && <p>Error fetching data</p>}
            {!isLoading && !isError && (
                <>
                    <Nav/>
                    <div className="flex flex-wrap">
                        {movies.map((movie, index)=> (
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
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            setCurrentPage={setCurrentPage}
                        />
                        <div className="ml-40">
                            <Footer/>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default Page;