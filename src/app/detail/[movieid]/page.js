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

const Page = () => {
    const {movieid} = useParams();
    const [selectedTorrentIndex, setSelectedTorrentIndex] = useState(0);

    const handleTorrentClick = (index) => {
        setSelectedTorrentIndex(index);
    };

    const getData = async () => {
        try {
            const res = await axios.get(`https://yts.mx/api/v2/movie_details.json?movie_id=${movieid}`);
            return res.data.data.movie;
        } catch (error) {
            console.error('Error fetching movie details', error);
            return null; // Return null in case of an error
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
                                            className="border border-black pl-2 pr-4 ml-3 py-1 mt-1 w-40 hover:border-green-400">
                                            <div className="flex">
                                                <Image src={download} alt=""/>
                                                <div className="flex justify-center items-center ml-2">
                                                    {`${torrent.quality}.${torrent.type.toUpperCase()}`}
                                                </div>
                                            </div>
                                        </button>
                                    </a>
                                ))}
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
                                {/* Render torrent text as a clickable element */}
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
                    <div className="ml-6 mt-6 mr-6">
                        <div className="flex border-b pb-6">
                            <Image src={file} alt=""/>
                            <div className="ml-4">
                                {selectedTorrent.size}
                            </div>
                        </div>
                        <div className="flex border-b pb-6 pt-6">
                            <Image src={screen} alt="" className="w-6 h-6"/>
                            <div className="ml-4">
                                {selectedTorrent.quality}
                            </div>
                        </div>
                        <div className="flex border-b pb-6 pt-6">
                            <Image src={sound} alt=""/>
                            <div className="ml-4">
                                English {selectedTorrent.audio_channels}
                            </div>
                        </div>
                        <div className="flex pb-6 pt-6">
                            <Image src={subtitle} alt="" className="w-6 h-6"/>
                            <div className="ml-4 font-bold text-green-500">
                                Subtitles
                            </div>
                        </div>
                    </div>
                    <div>
                        <Footer/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Page;
