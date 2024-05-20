"use client";

import React, { Suspense, useEffect, useState } from "react";
import Profile from "@components/Profile";
import { useSearchParams } from "next/navigation";

const ProfileContent = ({ params }) => {
    const [posts, setPosts] = useState([]);
    const searchParams = useSearchParams();
    const userName = searchParams.get("name");

    useEffect(() => {
        const fetchPosts = async () => {
            const response = await fetch(`/api/users/${params.id}/posts`);
            const data = await response.json();
            setPosts(data);
        };

        if (params?.id) fetchPosts();
    }, [params.id]);

    return (
        <Profile
            name={userName}
            description={`Welcome to ${userName}'s personalised profile page. Explore ${userName}'s exceptional prompts and be inspired by the power of their imagination.`}
            data={posts}
        />
    );
};

const MyProfile = ({ params }) => {
    return (
        <Suspense>
            <ProfileContent params={params} />
        </Suspense>
    );
};

export default MyProfile;
