import React from 'react'
import { useState, useEffect } from 'react';
import { movieData } from '../appdata/MovieData';
import Star from './Star';
import stylesModule from './RatingsCard.module.css'

// Renders card with movie's overall 5-star rating calculated from score out of 10 
export default function RatingsCard(props) {

    if (props.propsObj !== undefined) {
        props = props.propsObj;
    }

    let reviewObj = {};
    let review = '';
    let reviewDate = null;

    let rating = () => {
        if (props.rating !== undefined) {
            return props.rating;
        } else {
            return props.reviewObj.author_details.rating;
        }
    };

    let collection = [];
    if (props.reviewObj !== undefined) {
        collection.push(props.reviewObj)

        let dt = new Date(props.reviewObj.updated_at)
        reviewDate = dt.toLocaleDateString(); // Convert date string to locale date string
    }

    // State variable to hold reviews for rendering
    const [reviews, setReviews] = useState(collection);
    
    useEffect(() => {
        // Review can be passed in as props or make API call to fetch
        if (props.reviewObj === undefined) {
        
            movieData.getReviews(props.movieID)
                .then((data) => {
                    
                    setReviews(data.results);
                });
        }
    });

    // onClick functionality to open review form from ratings card div without button controls 
    let handleClick = () => {
        if (props.onClick !== undefined) {
            props.onClick();
        }
    }
    
    // Set max string length and add elipses to end to simulate elipses overflow effect on multiple lines
    if (reviews.length > 0) {
        reviewObj = reviews[0];
        review = reviewObj.content;
        
        if (props.reviewsMaxLength !== undefined) {
            
            const MAX_LENGTH = props.reviewsMaxLength;
            
            if (review.length > MAX_LENGTH) {
                review = review.substring(0, MAX_LENGTH) + '...';
            }

        }

        review = `"${review}"`
       
    } else {
        review = 'No reviews yet'
    }

    let styles = stylesModule;

    if (props.styles !== undefined) {
        styles = props.styles;
    } 

    // Calculate 5-star rating equivelent from score out of 10 from API data
    let getRating = (symbolic = true) => {
        let avgBase10 = rating(); // Score from API data based out of 10
        let scoreBase5 = (avgBase10 / 2).toFixed(1); // Convert to base 5 float
        let fullStarCount = parseInt(scoreBase5); // Parse integer to get full star count
        let halfStarCount = (scoreBase5 > fullStarCount) ? 1 : 0; // Remaining decimal if any is represented by a half-filled star

        // Assemble group of stars SVG using 5 Star components based on calculated 5-star score
        let starRating = [];

        for (let index = 0; index < 5; index++) {
            if (index < fullStarCount) {
                starRating.push(<Star key={index} starType={'filled'}/>);
            } else if (halfStarCount > 0) {
                starRating.push(<Star key={index} starType={'halfFilled'}/>);
                halfStarCount--;
            } else {
                starRating.push(<Star key={index} starType={'noFill'}/>)
            }
        }

        // Returns rating score as either component objects or numerical
        if (symbolic) {
            return starRating;
        } else {
            return scoreBase5;
        }
        
    };
    
    return (
        <div className={styles.ratingsCard} key={props.index} onClick={handleClick}>
            <div style={{margin: 'auto', display: 'flex'}}>
                <div className={styles.reviewDetails}>
                    <span>{reviewObj.author}</span>
                </div>
                <div className={styles.ratingsCardHeader}>
                    <span className=''>{getRating()}</span>
                    <span>&nbsp;&nbsp;&nbsp;&nbsp;</span>
                    <span className={styles.starCount}>({getRating(false)} stars)</span>
                </div>
                <div className={styles.reviewDetails}>
                    <span>{reviewDate}</span>
                </div>
            </div>
            <div className={styles.reviews}>
                <p>{review}</p>
            </div>
        </div>
  )
}
