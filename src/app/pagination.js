import React from 'react';
import previous from '../../public/previous.svg'
import arrow from '../../public/pvArrow.svg'
import Image from "next/image";

const Pagination = () => {
    // Define the total number of pages
    const totalPages = 5; // Change this to your desired number of pages

    // Generate an array of page numbers from 1 to totalPages
    const pageNumbers = Array.from({length: totalPages}, (_, index) => index + 1);

    return (
        <div>
            <div className="flex justify-center items-center ml-14">
                <div className="flex justify-center items-center mt-4 mb-4">
                    <nav className="relative z-0 inline-flex shadow-sm -space-x-px" aria-label="Pagination">
                        <a href="#"
                           className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <span className="sr-only">Previous</span>
                            <Image src={previous} alt=""/>
                        </a>

                        {pageNumbers.map((pageNumber) => (
                            <a key={pageNumber} href={`#page${pageNumber}`} // You can update the href as needed
                               className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                                {pageNumber}
                            </a>
                        ))}

                        <a href="#"
                           className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50 focus:z-10 focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500">
                            <span className="sr-only">Next</span>
                            <Image src={arrow} alt=""/>
                        </a>
                    </nav>
                </div>
            </div>
        </div>
    );
};

export default Pagination;
