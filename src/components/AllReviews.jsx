import React from 'react'
import { useState, useEffect } from 'react'
import { movieData } from '../appdata/MovieData'
import RatingsCard from './RatingsCard'
import styles from './AllReviews.module.css'

// This components renders all the reviews for a movie id
export default function AllReviews(props) {

    // Close button rendered in this component calls back to parent function to stop rendering this component
    let closeForm = () => {
        props.callBack()
    }

    let [reviews, setReviews] = useState([]); // Reviews obtained by api and local cache are stored here for rendering
    let [doScrollToTop, SetScrollToTop] = useState(true); // Flag to indicate window scroll to top for initial render of floating div
    
    // Collects reviews from api and local array within MovieData class
    useEffect(() => {

        if (doScrollToTop) {
            props.mainRef.current?.scrollIntoView({ behavior: 'instant' })
            SetScrollToTop(false)
            document.querySelector(':root').style.overflowY = 'hidden';

            if (reviews.length === 0) {
                movieData.getReviews(props.movieID)
                .then((data) => {
                    let results = data.results;
                    
                    let localData = movieData.getLocalReviews(props.movieID).results;

                    let aggr;
                    if(localData.length > 0 ) {
                        aggr = localData.concat(results);
                    } else {
                        aggr = results;
                    }
                    
                    setReviews(aggr);
                })
            }
            
        }

    },[doScrollToTop, props.mainRef, props.movieID, reviews.length])

    // Collects RatingCard components for each review in collection. These contain the review comments and other rating details
    let getReviewCards = () => {
        
        let reviewCards = [];
        
        //console.log(reviews)
        for (let index = 0; index < reviews.length; index++) {

            reviewCards.push(
                <div key={index + 1000} style={{position: 'relative', zIndex: 130}}>
                    <RatingsCard key={index} reviewObj={reviews[index]} styles={styles}/>
                </div>
            )
        }        
        
        return reviewCards;
    }

    // Gets movie title from MovieClass instance
    let getMovieTitle = () => {
        let movieObj = movieData.getSampleData().results;
        
        let movie = movieObj.find((movie) => {
            return movie.id === props.movieID;
        });
        
        return movie.title
    };
    
    return (
        <>
            <div className={styles.allReviewsMain} style={{position: 'fixed', paddingTop: 100, top: 50, left: 0, width: '100vw', minHeight: '100vh', height: '100%', overflowY: 'scroll', zIndex: 105}}>
                <h3 style={{paddingBottom: 10}}>Reviews</h3>
                <h1>{getMovieTitle()}</h1>

                <input type='button' className='btn btn-primary' onClick={closeForm} value='Close' style={{marginTop: 20, marginBottom: 20}} />

                <div  styles={{position: 'relative', top: 100, zIndex: 120}}>
                    {getReviewCards()}
                </div>
            </div>
            
        </>
    )
}
/**
<RatingsCard onClick={handleClick} reviewsMaxLength={props.reviewsMaxLength} styles={props.styles} rating={props.rating} key={props.key} movieID={props.movieID} moviesClassInstance={props.moviesClassInstance}/>
import React, { Component } from 'react'
import { movieData } from '../appdata/MovieData'

export default class AllReviews extends Component {

    constructor(props) {
        super(props)

        this.closeForm = () => {
            props.callBack()
        }
        
        this.ref = this.createRef(0);
        
        componentDidMount() {
            ref.current?.scrollIntoView({ behavior: 'instant' })
        }
        
    }
  render() {

    let closeForm = this.closeForm;
    let ref = this.ref;

        return (
            <div ref={ref} style={{position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', backgroundColor: 'white', zIndex: 105}}>
                AllReviews
                <input type='button' className='btn btn-primary' onClick={closeForm} value='Close' style={{marginTop: 20, marginBottom: 20}} />
            </div>
        )
  }
}


 */