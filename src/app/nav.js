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

const Nav = () => {
    const router = useRouter();
    const [display, setDisplay] = useState(false);
    const [searchText, setSearchText] = useState('');

    const toggleHandleClick = () => {
        setDisplay(!display); // Toggle the value
    };

    const handleInputChange = (event) => {
        setSearchText(event.target.value);
    };

    return (
        <div className="">
            <div className="flex justify-between border-b">
                <Image src={Yts} alt="" className="w-24 h-10 mt-2 ml-2 mb-2 cursor-pointer" onClick={() => router.push('/')}/>
                <div className="flex justify-center items-center">
                    <div className="sm:hidden">
                        <Image src={search} alt="" className="w-8 h-8" onClick={toggleHandleClick}/>
                    </div>
                    <div>
                        <input type="search" className="border mr-6 w-72 px-2 py-1 rounded-lg hidden sm:block" placeholder="search here"/>
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
