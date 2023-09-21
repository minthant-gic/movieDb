import React, {useState} from 'react';
import Yts from '../../public/yts.png';
import search from '../../public/search.svg';
import fourK from '../../public/4k.png';
import ranking from '../../public/ranking.png';
import trend from '../../public/trend.svg';
import person from '../../public/person.svg';
import Image from "next/image";
import {useRouter} from 'next/navigation';
import Link from "next/link";
import axios from "axios";
import {useQuery} from "@tanstack/react-query";
import download from "../../public/download.svg";
import star from "../../public/yellowStar.svg";

const Nav = () => {
    const router = useRouter();
    const [display, setDisplay] = useState(false);
    const [searchText, setSearchText] = useState('');
    const [searchDisplay, setSearchDisplay] = useState(false);
    const [isEnabled, setIsEnabled] = useState(false);

    const fetchData = async (searchText) => {
        try {
            if (!searchText) {
                // Return an empty array if there's no search text
                return [];
            }

            const res = await axios.get(`https://yts.mx/api/v2/list_movies.json?limit=4&query_term=${searchText}`);
            return res.data.data.movies;
        } catch (error) {
            console.error('Error fetching similar movies', error);
            return [];
        }
    };

    const {data: listData, isSuccess} = useQuery(
            ['get', 'list', searchText],
            () => fetchData(searchText),
            {
                enabled: isEnabled, // Disable automatic fetching on initial load
            }
        )
    ;

    const toggleHandleClick = () => {
        setDisplay(!display);
    };

    const toggleHandleSearchClick = () => {
        setSearchDisplay(!searchDisplay);
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="">
            <div className="flex justify-between border-b">
                <Image src={Yts} alt="" className="w-24 h-10 mt-2 sm:ml-20 ml-2 mb-2 cursor-pointer"
                       onClick={() => router.push('/')}/>
                <div className="flex justify-center items-center sm:mr-16 ">
                    <div className="sm:hidden">
                        <Image src={search} alt="" className="w-8 h-8" onClick={toggleHandleClick}/>
                    </div>
                    <div className="relative">
                        <input type="search" className="border mr-6 w-72 px-2 py-1 rounded-lg hidden sm:block"
                               placeholder="Quick search" onMouseDown={toggleHandleSearchClick} value={searchText}
                               onChange={(e) => {
                                   setSearchText(e.target.value);
                                   // Enable fetching when the user types something
                                   setIsEnabled(true);
                               }}/>
                        <div
                            className={`bg-black  h-fit w-72 z-10 absolute ${searchDisplay ? 'block' : 'hidden'}`}>
                            {isSuccess && listData.map((movie, index) => (
                                <div key={index} className="mt-2 mb-2 rounded-sm hover:bg-gray-800">
                                    <Link legacyBehavior={true} href={`/detail/${movie.id}`}>
                                        <a>
                                            <div
                                                className="relative group rounded-lg ml-2 mt-2 mr-2 w-full flex">
                                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                                <img
                                                    src={movie.small_cover_image}
                                                    alt={movie.title}
                                                    className="h-fit w-fit rounded-sm mt-2"
                                                />
                                                <div>
                                                    <div className="font-bold text-xs ml-4 mr-2 mt-2 text-white">
                                                        {movie.title}
                                                    </div>
                                                    <div className="font-bold text-gray-300 ml-4 mt-2 mr-2 text-xs">
                                                        {movie.year}
                                                    </div>
                                                </div>
                                            </div>
                                        </a>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="sm:hidden">
                        <Image src={fourK} alt="" className="w-8 h-8 ml-2" onClick={() => router.push('/4k')}/>
                    </div>
                    <div className="hidden sm:block mr-4 cursor-pointer" onClick={() => router.push('/4k')}>
                        4k
                    </div>
                    <div className="sm:hidden">
                        <Image src={ranking} alt="" className="w-8 h-8 ml-2" onClick={() => router.push('/ranking')}/>
                    </div>
                    <div className="hidden sm:block mr-4 cursor-pointer" onClick={() => router.push('/ranking')}>
                        Ranking
                    </div>
                    <div className="sm:hidden">
                        <Image src={trend} alt="" className="w-8 h-8 ml-2 mr-2" onClick={() => router.push('/trend')}/>
                    </div>
                    <div className="hidden sm:block cursor-pointer mr-4" onClick={() => router.push('/trend')}>
                        Trending
                    </div>
                </div>
            </div>
            <div>
                <div className={`flex justify-center items-center mt-2 ${display ? 'block' : 'hidden'}`}>
                    <div className="ml-4">
                        <input type="search" className="border w-56 px-3" value={searchText}
                               onChange={handleInputChange}
                        />
                    </div>
                    <Link legacyBehavior={true} href={`/search/${searchText}`}>
                        <div className="mr-3 ml-2">
                            <button type="button" className="bg-green-500 px-3 rounded-lg text-white">Search
                            </button>
                        </div>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Nav;
