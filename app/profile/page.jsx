"use client";

import Profile from "@components/Profile";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const MyProfile = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [posts, setPosts] = useState([]);

    const handleEdit = (post) => {
        router.push(`/update-prompt?id=${post._id}`);
    };

    const handleDelete = async (post) => {
        const hasConfirmed = confirm(
            "Are you sure you want to delete this prompt?"
        );
        if (hasConfirmed) {
            try {
                await fetch(`/api/prompt/${post._id.toString()}`, {
                    method: "DELETE",
                });

                const filteredPosts = posts.filter(
                    (postItem) => postItem._id !== post._id
                );
                setPosts(filteredPosts);
            } catch (error) {
                console.log(error);
            }
        }
    };

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(
                `/api/users/${session?.user.id}/posts`
            );
            const data = await response.json();
            setPosts(data);
        };

        if (session?.user.id) fetchPosts();
    }, [session]);

    return (
        <Profile
            name="My"
            description="Welcome to your personalised profile page"
            data={posts}
            handleEdit={(post) => handleEdit(post)}
            handleDelete={(post) => handleDelete(post)}
        />
    );
};

export default MyProfile;
