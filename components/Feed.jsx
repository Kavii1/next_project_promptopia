"use client";

import React, { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className="mt-16 prompt_layout">
            {data.map((prompt) => (
                <PromptCard
                    key={prompt._id}
                    post={prompt}
                    handleTagClick={() => handleTagClick(prompt.tag)}
                />
            ))}
        </div>
    );
};

const Feed = () => {
    const [searchValue, setSearchValue] = useState("");
    const [posts, setPosts] = useState([]);
    const [filteredPosts, setFilteredPosts] = useState([]);

    const handleFilterPosts = (searchText) => {
        if (searchText) {
            const regex = new RegExp(searchText, "i");
            const filteredResult = posts.filter(
                (data) =>
                    regex.test(data.creator.username) ||
                    regex.test(data.tag) ||
                    regex.test(data.prompt)
            );
            setFilteredPosts(filteredResult);
        } else {
            setFilteredPosts(posts);
        }
    };

    const handleSearchChange = (e) => {
        e.preventDefault();
        setSearchValue(e.target.value);
        handleFilterPosts(e.target.value);
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch("/api/prompt");
            const data = await response.json();
            setPosts(data);
            setFilteredPosts(data);
        };

        fetchPosts();
    }, []);

    const handleTagClick = (tagValue) => {
        setSearchValue(tagValue);
        handleFilterPosts(tagValue);
    };

    return (
        <section className="feed">
            <form action="" className="w-full relative flex-center">
                <input
                    type="text"
                    placeholder="Search for a tag or a username"
                    value={searchValue}
                    onChange={handleSearchChange}
                    required
                    className="search_input peer"
                />
            </form>
            <PromptCardList
                data={filteredPosts}
                handleTagClick={(tagValue) => handleTagClick(tagValue)}
            />
        </section>
    );
};

export default Feed;
