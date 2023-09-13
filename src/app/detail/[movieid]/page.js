'use client'
import React from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Nav from "@/app/nav";
import heart from "../../../../public/heart.svg"
import rotten from "../../../../public/rotten.png"
import popcorn from "../../../../public/popcorn.png"
import Image from "next/image";

const Page = () => {
    const {movieid} = useParams();

    const getData = async () => {
        const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieid}`);
        return res.data.data.movie;
    }


    const {data: movie, isError, isSuccess, isLoading} = useQuery(
        ['get', 'detail'],
        getData
    );

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching movie details</p>}
            {isSuccess && (
                <div>
                    <Nav/>
                    <div className="mt-4 ml-3">
                        <div className="font-bold text-xl font-sans">
                            {movie.title}
                        </div>
                        <div className="font-bold text-lg font-sans">
                            {movie.year}
                        </div>
                        <div className="font-bold text-lg font-sans">
                            {movie.genres.join(' / ')}
                        </div>
                    </div>

                    <div className="flex">
                        <div className="w-1/2 mt-2 ml-2">
                            <div className="shadow-lg rounded-lg border-4 border-black ml-2 mt-2 mr-2">
                                <img src={movie.large_cover_image}
                                     alt={movie.title}
                                     className="h-fit w-fit rounded-sm"/>
                            </div>
                        </div>
                        <div className="w-1/2">
                            <div className="flex">
                                <div className="mt-3 ml-4">
                                    <Image src={heart} alt=""/>
                                </div>
                                <div className="mt-3 ml-8">
                                    {movie.like_count}
                                </div>
                            </div>
                            <div className="flex">
                                <div className="mt-3 ml-2 w-10 h-10">
                                    <Image src={rotten} alt=""/>
                                </div>
                                <div className="mt-3 ml-6">
                                    {movie.runtime}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
