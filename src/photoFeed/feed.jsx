import React, { useState, useEffect, useRef } from 'react';
import Post from './Post';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(10);
  const [isLoading, setIsLoading] = useState(false);
  const loader = useRef(null);

  useEffect(() => {
    // Fetch the list of posts for the current page
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // Add an intersection observer to check when the loader element is visible
    const options = {
      root: null,
      rootMargin: '20px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, options);

    if (loader.current) {
      observer.observe(loader.current);
    }

    // Cleanup the observer
    return () => {
      if (loader.current) {
        observer.unobserve(loader.current);
      }
    };
  }, [posts]);

  // Fetch the list of posts for the current page
  const fetchPosts = () => {
    setIsLoading(true);
    fetch(`/api/posts?_page=${currentPage}&_limit=${postsPerPage}`)
      .then(response => response.json())
      .then(data => {
        setPosts(prevPosts => [...prevPosts, ...data]);
        setIsLoading(false);
      });
  };

  // Handle the intersection observer to fetch more posts when the loader element is visible
  const handleObserver = entries => {
    const target = entries[0];
    if (target.isIntersecting) {
      setCurrentPage(prevPage => prevPage + 1);
    }
  };

  return (
    <div>
      {posts.map(post => (
        <Post key={post.id} post={post} />
      ))}
      <div ref={loader}>
        {isLoading && <p>Loading...</p>}
      </div>
    </div>
  );
}

export default PostList;

// In this example, we define isLoading and loader states to keep track of whether we're currently loading more posts and a ref to a loader element that will trigger the next fetch when it becomes visible on the page.

// We use the useEffect hook to fetch the initial list of posts when the component mounts, and another useEffect hook to add an intersection observer to the loader element. When the loader element becomes visible on the page, we increase the currentPage state to fetch more posts.

// We define a fetchPosts function that fetches the list of posts for the current page and appends them to the existing list of posts. We also use the setIsLoading state to show a loading message while we're fetching more posts.

// Finally, we render the list of posts, and a loader element that becomes visible when we're loading more posts. When the loader element becomes visible, the handleObserver function triggers the next fetch.

// This way, the PostList component loads more posts as the user scrolls down the page, making the component more efficient and improving the user experience.