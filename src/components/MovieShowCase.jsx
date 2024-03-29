import React, { Component } from 'react'
import Carousel from 'react-bootstrap/Carousel';
import styles from './MovieShowCase.module.css'
import MovieCard from './MovieCard';
import { movieData } from '../appdata/MovieData';

// Carousel showing current movies showing in theater. Slideshow of movie backdrop with movie poster card and synopsis and a review/rating
export default class MovieShowCase extends Component {

    constructor(props) {
        super(props)

        this.state = {
            index: 0,    // index for handling carousel left/right navigation
            reviews: []  // holds a review for each movie id if exists
        }

        this.movieData = movieData; // instance of MovieData class for collecting and managing movie data
        
    }

    // Gets movie synopsis from api data and truncates to fit on card
    getOverview(index) {
        if (index === undefined || isNaN(index)) {
            return undefined;
        }

        let overview = this.movieData.getSampleData().results[index].overview;

        const MAX_LENGTH = 180;
        if (overview.length > MAX_LENGTH) {
            return overview.substring(0, MAX_LENGTH) + '...';
        } else {
            return overview;
        }
    }

    // Gets collection of movies from snapshot of api results json
    getSlideItems() {
        let moviesResults = this.movieData.getSampleData().results;
        let MAX_SLIDES = 10;

        if (moviesResults.length < MAX_SLIDES) {
            MAX_SLIDES = moviesResults.length;
        }

        let slides = [];
        
        for (let index = 0; index < MAX_SLIDES; index++) {

            let propsObj = {
                posterPath: this.movieData.getResource(moviesResults[index].poster_path, 'poster', 2),
                movieTitle: moviesResults[index].title,
                overview: this.getOverview(index),
                rating: moviesResults[index].vote_average,
                movieID: moviesResults[index].id,
                key: index,
                moviesClassInstance: this.movieData,
                reviewsMaxLength: 108, 
                noClick: true   // To prevent onClick behavior on ratings card
            }

            slides.push(
                    <Carousel.Item key={index}>
                        <div className='border border-secondary rounded-bottom bg-dark'>
                            <img src={this.movieData.getResource(moviesResults[index].backdrop_path, 'backdrop', 2)} className={`${styles.slides}`} alt='backdrop'/>
                        </div>

                        <MovieCard {...{propsObj}} />
                        
                    </Carousel.Item> 
            )
        }

        return slides;
    }
    
    render() {

        let index = this.state.index;
        let setIndex = (p) => (this.setState({index: p}));

        const handleSelect = (selectedIndex) => {
            setIndex(selectedIndex);
        };
        
        

        
        return (
            <div className='' style={{position: 'relative'}}>
                <Carousel activeIndex={index} onSelect={handleSelect}>
                    
                    {this.getSlideItems()}
                    
                                        
                </Carousel>
            </div>
        )
    }
}
