//Upload Post
export const uploadPost = (post, axios) => {
    const options = {
        method: 'Post',
        url: '/posts',
        data: post
    }

    const response = axios.request() 
    try {
        console.log(response)
    } catch(error) {
        console.log(error)
    }
}