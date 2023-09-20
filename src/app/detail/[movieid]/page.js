'use client'
import React, {useState} from 'react';
import {useParams} from 'next/navigation';
import axios from 'axios';
import {useQuery} from '@tanstack/react-query';
import Nav from "@/app/nav";
import heart from "../../../../public/heart.svg"
import imdb from "../../../../public/imdb.png"
import download from "../../../../public/download.svg"
import file from "../../../../public/file.svg"
import screen from "../../../../public/fullscreen.png"
import sound from "../../../../public/sound.svg"
import subtitle from "../../../../public/subtitles.png"
import Image from "next/image";
import loading from "../../../../public/loading.gif";
import Footer from "@/app/footer";
import YouTubeVideo from '../../video';
import Link from "next/link";


const SimilarMovieCard = ({similarMovie}) => {
    return (
        <div className="w-1/2 mt-2 ml-2 sm:w-1/3 sm:flex">
            <Link legacyBehavior={true} href={`/detail/${similarMovie.id}`}>
                <a>
                    <div className="shadow-lg rounded-lg border-4 border-black ml-2 mt-2 mr-2 w-fit h-fit flex">
                        <img
                            src={similarMovie.medium_cover_image}
                            alt={similarMovie.title}
                            width={200}
                            height={200}
                            className="h-fit w-fit rounded-sm"
                        />
                    </div>
                </a>
            </Link>
        </div>
    );
};
const Page = () => {
    const {movieid} = useParams();
    const [selectedTorrentIndex, setSelectedTorrentIndex] = useState(0);

    const getSimilarMoviesData = async () => {
        try {
            const res = await axios.get(`https://yts.mx/api/v2/movie_suggestions.json?movie_id=${movieid}`);
            return res.data.data.movies;
        } catch (error) {
            console.error('Error fetching similar movies', error);
            return [];
        }
    }

    const {data: similarMovies} = useQuery(
        ['get', 'similarMovies'],
        getSimilarMoviesData
    );

    const handleTorrentClick = (index) => {
        setSelectedTorrentIndex(index);
    };

    const getData = async () => {
        try {
            const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieid}`);
            return res.data.data.movie;
        } catch (error) {
            console.error('Error fetching movie details', error);
            return null;
        }
    }

    const {data: movie, isError, isSuccess, isLoading} = useQuery(
        ['get', 'detail'],
        getData
    );

    // Check if isError or isLoading is true, or if movie is undefined or null
    if (isError || isLoading || movie === undefined || movie === null) {
        return (
            <div>
                {isLoading && (
                    <div className="flex justify-center items-center mt-48 ml-12">
                        <Image src={loading} alt=""/>
                    </div>
                )}
                {isError && <p>Error fetching movie details</p>}
            </div>
        );
    }

    // Get the selected torrent based on the selectedTorrentIndex
    const selectedTorrent = movie.torrents[selectedTorrentIndex];
    return (
        <div>
            {isLoading && (
                <div className="flex justify-center items-center mt-96 ml-12">
                    <Image src={loading} alt=""/>
                </div>
            )}
            {isError && <p>Error fetching movie details</p>}
            {isSuccess && (
                <div>
                    <Nav/>
                    <div className="flex justify-center w-full h-screen">
                        <div className="w-full max-w-7xl">
                            <div className="mt-4 ml-3 sm:hidden">
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
                                <div className="w-1/2 mt-4 ml-2 sm:w-1/5">
                                    <div
                                        className="shadow-lg rounded-lg border-4 border-black ml-2 mt-2 mr-2 w-fit h-fit">
                                        <img src={movie.medium_cover_image}
                                             alt={movie.title}
                                             className="h-fit w-fit rounded-sm"/>
                                    </div>
                                </div>
                                <div className="w-1/2 sm:w-2/5 sm:mt-4">
                                    <div className="ml-3 sm:block hidden">
                                        <div className="font-bold text-4xl font-sans">
                                            {movie.title}
                                        </div>
                                        <div className="font-bold text-lg font-sans mt-2">
                                            {movie.year}
                                        </div>
                                        <div className="font-bold text-lg font-sans mt-2">
                                            {movie.genres.join(' / ')}
                                        </div>
                                    </div>
                                    <div className="flex mt-3">
                                        <div className="ml-4">
                                            <Image src={heart} alt=""/>
                                        </div>
                                        <div className="ml-12">
                                            {movie.like_count}
                                        </div>
                                    </div>
                                    <div className="flex">
                                        <div className="mt-3 ml-4 w-6 h-6">
                                            <Image src={download} alt=""/>
                                        </div>
                                        <div className="mt-3 ml-12">
                                            {movie.download_count}
                                        </div>
                                    </div>
                                    <div className="text-green-300 text-xs ml-3 mt-2">
                                        ratings
                                    </div>
                                    <div className="flex mt-2">
                                        <div className="ml-3 w-10 h-10">
                                            <Image src={imdb} alt=""/>
                                        </div>
                                        <div className="ml-9">
                                            {movie.rating} <span className="text-sm text-gray-200">/10</span>
                                        </div>
                                    </div>
                                    <div>
                                        {movie.torrents.map((torrent, index) => (
                                            <a
                                                key={index}
                                                href={torrent.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                <button
                                                    className="border border-black pl-2 pr-4 ml-3 mt-1 w-40 hover:border-green-400">
                                                    <div className="flex">
                                                        <Image src={download} alt=""/>
                                                        <div className="flex justify-center items-center ml-2 text-sm">
                                                            {`${torrent.quality}.${torrent.type.toUpperCase()}`}
                                                        </div>
                                                    </div>
                                                </button>
                                            </a>
                                        ))}
                                    </div>
                                </div>
                                {/*to change*/}
                                <div className="hidden sm:block sm:w-3/5">
                                    <div className="mt-6 ml-2 font-bold text-xl hidden sm:block">
                                        Similar Movies
                                    </div>
                                    <div className="hidden sm:mt-6 sm:flex cursor-pointer">
                                        {similarMovies && similarMovies.map((similarMovie, index) => (
                                            <>
                                                <SimilarMovieCard key={index} similarMovie={similarMovie}/>
                                            </>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="mt-10 ml-4 hidden sm:flex">
                                <div className="flex h-80">
                                    <div className="ml-3">
                                        <YouTubeVideo videoId={movie.yt_trailer_code}/>
                                    </div>
                                    <div className="ml-2">
                                        <img src={movie.background_image} alt="" className="w-96 h-4/5"/>
                                    </div>
                                    <div className="ml-2">
                                        <img src={movie.background_image_original} alt="" className="w-96 h-4/5"/>
                                    </div>
                                </div>
                            </div>

                            <div className="ml-4">
                                <div className="text-lg font-bold mt-4">
                                    Plot summary
                                </div>
                                <div className="text-sm mt-2 font-sans mr-2">
                                    {movie.description_intro}
                                </div>
                                <div className="mt-4 font-sm font-sans mb-2">
                                    Uploaded Date : {movie.date_uploaded}
                                </div>
                            </div>
                            <div className="flex flex-wrap border-t border-b boder-black">
                                {movie.torrents.map((torrent, index) => (
                                    <div key={index} className="w-1/3 p-2">
                                        <div
                                            className={`flex justify-center items-center hover:text-green-500 ${index === selectedTorrentIndex ? 'text-green-500' : ''}`}
                                            onClick={() => handleTorrentClick(index)}
                                            style={{cursor: 'pointer'}}
                                        >
                                            {`${torrent.quality}.${torrent.type.slice(0, 3).toUpperCase()}`}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div
                                className="ml-6 mt-6 mr-6 sm:flex sm:justify-start sm:items-center sm:border-b sm:ml-0 sm:mr-0">
                                <div className="flex border-b pb-6 sm:ml-12 sm:border-b-0">
                                    <Image src={file} alt=""/>
                                    <div className="ml-4 sm:mt-1 sm:ml-6">
                                        {selectedTorrent.size}
                                    </div>
                                </div>
                                <div className="flex border-b pb-6 pt-6 sm:ml-56 sm:mb-6 sm:border-b-0">
                                    <Image src={screen} alt="" className="w-6 h-6"/>
                                    <div className="ml-4">
                                        {selectedTorrent.quality}
                                    </div>
                                </div>
                                <div className="flex border-b pb-6 pt-6 sm:ml-56 sm:mb-6 sm:border-b-0">
                                    <Image src={sound} alt=""/>
                                    <div className="ml-4">
                                        English {selectedTorrent.audio_channels}
                                    </div>
                                </div>
                                <div className="flex pb-6 pt-6 sm:ml-56 sm:mb-6 sm:border-b-0">
                                    <Image src={subtitle} alt="" className="w-6 h-6"/>
                                    <div className="ml-4 font-bold text-green-500">
                                        Subtitles
                                    </div>
                                </div>
                            </div>
                            <div className="sm:mt-2">
                                <Footer/>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
