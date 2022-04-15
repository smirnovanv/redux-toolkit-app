import React, { useState } from 'react';
import { IPost } from '../models/IPost';
import { postAPI } from '../service/PostService';
import PostItem from './PostItem';

const PostContainer = () => {
    const [limit, setLimit] = useState(100);
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllPostsQuery(limit);

    const [createPost, {}] = postAPI.useCreatePostMutation();
    const [deletePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();

    const handleCreate = async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost);
    }

    const handleRemove = (post: IPost) => {
        deletePost(post);
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post);
    }

    return (
        <div>
            <div className="post__list">
                <button onClick={handleCreate}>Add new post</button>
                {isLoading && <h1>Идет загрузка</h1>}
                {error && <h1>Произошла ошибка при загрузке</h1>}
                {posts && posts.map(post => <PostItem post={post} key={post.id} remove={handleRemove} update={handleUpdate} />)}
            </div>

        </div>
    );
};

export default PostContainer;