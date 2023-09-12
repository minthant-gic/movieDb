import React from 'react';
import Yts from '../../public/yts.png';
import search from '../../public/search.svg';
import fourK from '../../public/4k.png';
import ranking from '../../public/ranking.png';
import trend from '../../public/trend.svg';
import person from '../../public/person.svg';
import Image from "next/image";

const Nav = () => {
    return (
        <div className="">
            <div className="flex justify-between border-b">
                <Image src={Yts} alt="" className="w-24 h-10 mt-2 ml-2 mb-2"/>
                <div className="flex justify-center items-center">
                    <div>
                        <Image src={search} alt="" className="w-8 h-8" />
                    </div>
                    <div>
                        <Image src={fourK} alt="" className="w-8 h-8 ml-2" />
                    </div>
                    <div>
                        <Image src={ranking} alt="" className="w-8 h-8 ml-2" />
                    </div>
                    <div>
                        <Image src={trend} alt="" className="w-8 h-8 ml-2" />
                    </div>
                    <div>
                        <Image src={person} alt="" className="w-8 h-8 ml-2 mr-2" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Nav;