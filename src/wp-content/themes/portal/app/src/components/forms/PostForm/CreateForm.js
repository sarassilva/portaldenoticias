import React from 'react';
import PostForm from './PostForm';
import { createPost } from '../../../helpers/posts';

const CreatePostForm = () => {    
    const handleCreatePost = async (postData) => {
        try {
            const response = await createPost(postData);
            
        } catch (err) {
            console.error("Erro ao publicar post", err);
        }
    };

    return <PostForm onSubmit={handleCreatePost} />;
};

export default CreatePostForm;