import React from 'react';
import Image from 'next/image';
import star from '../../public/star.svg';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import {data} from "autoprefixer";

const Body = () => {
    const getData = async () => {
        const res = await axios.get('https://yts.mx/api/v2/list_movies.json');
        return res.data;
    };

    const { data: response, isError, isSuccess, isLoading } = useQuery({
        queryKey: ['get', 'list'],
        queryFn: getData,
    });

    console.log(response)

    return (
        <div>
            {isLoading && <p>Loading...</p>}
            {isError && <p>Error fetching data</p>}
            {isSuccess && response && response.movies && (
                <div>
                    <div className="flex justify-between border-b mt-2">
                        <div className="flex justify-center items-center ml-2 mb-2">
                            <Image src={star} alt="" />
                            <div className="ml-2 font-bold text-lg">Popular downloads</div>
                        </div>
                        <div className="mr-2">
                            <a
                                href=""
                                className="text-blue-600 font-bold underline cursor-pointer"
                            >
                                more featured
                            </a>
                        </div>
                    </div>
                    <div className="flex">
                        {response.movies.map((movie) => (
                            <div
                                key={movie.id}
                                className="w-1/2 h-56 ml-3 mr-3 mt-3 mb-3 bg-red-200 border-4 border-black"
                            >
                                <Image
                                    src={movie.medium_cover_image} // Use the movie image URL
                                    alt={movie.title}
                                    width={500}
                                    height={300}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Body;
