import React, { useState } from 'react';
import { postAPI } from '../service/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
    const [limit, setLimit] = useState(10);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(10);

    return (
        <div>
            <div className="post__list">
                <button onClick={() => refetch()}>REFETCH</button>
                {isLoading && <h1>Идет загрузка</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {posts && posts.map(post => <PostItem post={post} key={post.id} />)}
            </div>

        </div>
    );
};

export default PostContainer;