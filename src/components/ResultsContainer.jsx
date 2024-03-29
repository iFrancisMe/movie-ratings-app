import React, { Component } from 'react'
import {movieData} from '../appdata/MovieData'
import styles from './ResultsContainer.module.css'
import MovieCard from './MovieCard';

// Displays current movie results from API data shown on movie card components, but styled differently from previous movie cards rendered for carousel. 
// Styles module reference passed to movie card to override default styling  
export default class ResultsContainer extends Component {

    constructor(props) {
        super(props)
        this.movieData = movieData;
    }

    // Gets synopsis of movie
    getOverview(index) {
        if (index === undefined || isNaN(index)) {
            return undefined;
        }

        let overview = this.movieData.getSampleData().results[index].overview;

        return overview;
    }

    // Get collection of movie card components
    getCards() {
        let collection = this.movieData.getSampleData().results;
        let cards = [];
        let propsObj;

        for (let index = 0; index < collection.length; index++) {
            propsObj = {
                posterPath: this.movieData.getResource(collection[index].poster_path, 'poster', 4),
                movieTitle: collection[index].title,
                overview: this.getOverview(index),
                rating: collection[index].vote_average,
                movieID: collection[index].id,
                key: index,
                moviesClassInstance: this.movieData,
                styles: styles,
                reviewsMaxLength: 2820,
                maxReviews: 1
            }

            cards.push(<MovieCard {...{propsObj}} mainRef={this.props.mainRef} key={index}/>)
        }

        return cards;
    }

    // Render card collection
    render() {
        return (
        <div className={styles.results}>
            {this.getCards()}
        </div>
        )
    }
}
