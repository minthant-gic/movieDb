'use client'
import React from 'react';
import Body from "@/app/body";
import Nav from "@/app/nav";

const Page = () => {
    return (
        <div>
            <Nav />
            <div className="flex justify-center w-full h-screen">
                <div className="w-full max-w-7xl">
                    <Body/>
                </div>
            </div>
        </div>
    );
};

export default Page;