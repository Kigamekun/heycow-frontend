'use client'

import Script from "next/script";
import * as React from "react";
import { useState } from "react";
import { useEffect } from "react";

export default function Page() {
    const nextId = id => id + 1;
    const posts = [
        {
            nextId,
            author: "Steve Jobs",
            date: "29 Oct",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
            image: "https://th.bing.com/th/id/R.914e864252bad8f4f4314e37b143c7df?rik=2xAOrgztmjtDUQ&riu=http%3a%2f%2fag4impact.org%2fwp-content%2fuploads%2f2015%2f07%2f8597281558_303f73b558_o.jpg&ehk=qcHDHGoAmKv66M0USFox7oBqPjR7egMZaNf4Q%2fcIgww%3d&risl=1&pid=ImgRaw&r=0"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "@/images/hoshino.jpg"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        },
        {
            nextId,
            author: "Bill Gates",
            date: "30 Oct",
            content: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
            image: "https://th.bing.com/th/id/OIP.d7yv4e36iOt9IvrTWuC0wQHaJb?rs=1&pid=ImgDetMain"
        }
    ];
    
    const [displayedPosts, setDisplayedPosts] = useState(posts.slice(0, 5));
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        const handleScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || !hasMore) {
            return;
        }
        loadMorePosts();
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [hasMore]);

    const loadMorePosts = () => {
        if (displayedPosts.length >= posts.length) {
        setHasMore(false);
        return;
        }
        const newPosts = posts.slice(displayedPosts.length, displayedPosts.length + 5);
        setDisplayedPosts(prevPosts => [...prevPosts, ...newPosts]);
    };
    
    return (
        <>
        <main>
            <h3 className="text-emerald-600">Community</h3>
            
            <div className="container-filter d-flex justify-center">
                <div className="card mt-3 w-[800px] "> 
                    <div className="card-body d-flex justify-between"> 
                        <div className="d-flex justify-between cursor-pointer">
                            <img src="https://cdn.iconscout.com/icon/free/png-512/free-filter-icon-download-in-svg-png-gif-file-formats--setting-user-application-interface-outline-pack-icons-1389150.png?f=webp&w=256z" alt="image" className="w-[20px] h-[20px] rounded-full" />
                            Filter
                        </div>
                        |
                        <div className="d-flex justify-between cursor-pointer">
                            <img src="https://cdn.iconscout.com/icon/free/png-512/free-filter-icon-download-in-svg-png-gif-file-formats--setting-user-application-interface-outline-pack-icons-1389150.png?f=webp&w=256z" alt="image" className="w-[20px] h-[20px] rounded-full" />
                            Tanyakan
                        </div>
                        |
                        <div className="d-flex justify-between cursor-pointer">
                            <img src="https://cdn.iconscout.com/icon/free/png-512/free-filter-icon-download-in-svg-png-gif-file-formats--setting-user-application-interface-outline-pack-icons-1389150.png?f=webp&w=256z" alt="image" className="w-[20px] h-[20px] rounded-full" />
                            Jual
                        </div>
                    </div>
                </div>
            </div>
            <div className="d-flex justify-center">
                {/* <div className="container-post grid grid-cols-1">
                    {posts.map((post, index) => (
                        <div key={index} className="card mt-3 w-[800px] grid grid-cols-1 gap-6">
                        <div className="card-body">
                            <div className="container-post-profile d-flex justify-start gap-2">
                            <img src={post.image} alt="profile" className="w-[50px] h-[50px] rounded rounded-pill border" />
                            <div className="mt-1">
                                <h6 className="text-black font-bold">{post.author}</h6>
                                <p className="text-xs">{post.date}</p>
                            </div>
                            </div>
                            <div className="container-post-content mt-3">
                            <p className="text-black">
                                {post.content}
                            </p>
                            <img src={post.image} alt="post" className="w-[100%] max-h-[400px] border" />
                            </div>
                        </div>
                        </div>
                    ))}
                </div> */}
                <div className="container-post grid grid-cols-1">
                    {displayedPosts.map((post, index) => (
                        <div key={index} className="card mt-3 w-[800px] grid grid-cols-1 gap-6">
                        <div className="card-body">
                            <div className="container-post-profile d-flex justify-start gap-2">
                            <img src={post.image} alt="profile" className="w-[50px] h-[50px] rounded rounded-pill border" />
                            <div className="mt-1">
                                <h6 className="text-black font-bold">{post.author}</h6>
                                <p className="text-xs">{post.date}</p>
                            </div>
                            </div>
                            <div className="container-post-content mt-3">
                            <p className="text-black">
                                {post.content}
                            </p>
                            <img src={post.image} alt="post" className="w-[100%] max-h-[400px] border" />
                            </div>
                        </div>
                        </div>
                    ))}
                    {!hasMore && <p>No more posts to load</p>}
                </div>
            </div>
        </main>
        
        </>
    );
}