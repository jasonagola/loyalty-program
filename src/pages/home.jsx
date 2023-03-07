import React, {useRef, useState} from 'react'
import Sidebar from './NavComponents/sidebar';
import './home.css'
import { useEffect } from 'react';



function Home() {
    const carouselRef = useRef(null)

    useEffect(() => {
        const images = Array.from(document.querySelectorAll('.carouselImage'))

        const handleMouseMove = (event) => {
            const windowWidth = window.innerWidth;
            const mousePosition = event.clientX;
            const percentage = (mousePosition / windowWidth) * 100;

            carouselRef.current.animate({
                transform: `translateX(-${percentage}%)`
            }, { duration: 500, fill: "forwards", easing: "cubic-bezier(0.42, 1, 0.58, 1)" })

            images.forEach((image) => {
                image.animate({
                    objectPosition: `${37.5 + (percentage/4)}% center`
                    }, { duration: 500, fill: "forwards" });
            })
        }

        window.addEventListener('mousemove', handleMouseMove)

        return () => {
            window.removeEventListener('mousemove', handleMouseMove)
        };
    }, [])

        const expandImage = (e) => {
        // Get the clicked image element
        const image = e.target;
        
        // Create a new div element to hold the expanded image
        const expandedImage = document.createElement('div');
        
        // Set the CSS styles for the expanded image container
        expandedImage.style.position = 'fixed';
        expandedImage.style.top = '0';
        expandedImage.style.left = '0';
        expandedImage.style.width = '100%';
        expandedImage.style.height = '100%';
        expandedImage.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
        expandedImage.style.display = 'flex';
        expandedImage.style.justifyContent = 'center';
        expandedImage.style.alignItems = 'center';
        
        // Create a new image element to hold the expanded image
        const expandedImageElement = document.createElement('img');
        
        // Set the src attribute for the expanded image element
        expandedImageElement.src = image.src;
        
        // Set the CSS styles for the expanded image element
        expandedImageElement.style.maxWidth = '90%';
        expandedImageElement.style.maxHeight = '90%';
        expandedImageElement.style.borderRadius = '10px';
        
        // Append the expanded image element to the expanded image container
        expandedImage.appendChild(expandedImageElement);
        
        // Add the expanded image container to the DOM
        document.body.appendChild(expandedImage);
        
        // Add a click event listener to the expanded image container
        expandedImage.addEventListener('click', (e) => {
          // Remove the expanded image container from the DOM
          document.body.removeChild(expandedImage);
        });
      };


    //   const expandImageAnimation = (e) => {
    //     console.log('image Clicked')
    //     // Get the clicked image element
    //     const image = e.target;
        
    //     // Add a CSS class to the image element to trigger the transition animation
    //     image.classList.add('expanded');
        
    //     // Add a click event listener to the image element to close the expanded image
    //     image.addEventListener('click', (e) => {
    //       // Remove the CSS class from the image element to close the expanded image
    //       image.classList.remove('expanded');
    //     });
    //   };


    return (
        <div 
            id='home'
        >
            <h1>Local Bike Shop NFK</h1>
            <h2>Welcome Home</h2>
            <div 
                ref={carouselRef} 
                data-slider='0' 
                id="carousel"
            >
                <img className="carouselImage" onClick={expandImage} src="src/assets/bridgestone.jpg" draggable="false" />
                <img className="carouselImage" src="src/assets/greenState.jpg"draggable="false" />
                <img className="carouselImage" src="src/assets/holdsworth.jpeg" draggable="false" />
                <img className="carouselImage" src="src/assets/klunker.jpg" draggable="false" />
                <img className="carouselImage" src="src/assets/pinkDinghy.jpeg" draggable="false" />
            </div>

            <Sidebar/>
            
        </div>
    )
}

export default Home




