import React, { Component, createRef } from 'react'
import { movieData } from '../appdata/MovieData';
import styles from './ReviewForm.module.css'
import RatingsFormControl from './RatingsFormControl';
import AllReviews from './AllReviews';

// Form for submitting review
export default class ReviewForm extends Component {
    constructor(props) {
        super(props);

        // Movie ID and reference to MovieData class instance
        this.movieID = props.movieID;
        this.movieData = movieData.getSampleData().results;

        // Obtain index value of movie ID within collection of movie data
        let movieIndex = this.movieData.findIndex(movie => movie.id === this.movieID);

        if (this.movieData !== undefined) {
            this.movieData = this.movieData[movieIndex]
        }

        // State for recording selected rating and to track state of button click to open reviews div
        this.state = {
            rating: 0,
            reviewsClicked: false
        }

        // Create reference to current movie listing to scroll back to when reviews div is closed
        this.ref = createRef(props.key);
        this.inputRef = createRef('author'); // Ref to input field to get user's name on form submission
        this.reviewRef = createRef('review'); // Ref to textarea field to get user's review on form submission

        // Object to hold selected rating value. Object passed in as props to rating form control component 
        this.formData = {
            rating: this.state.rating,
            review: this.state.review,
            setRating: (rating) => {
                this.setState({rating: rating});
            }
        }

        // Send data to MovieData class method
        this.submitForm = () => {
            let dt = new Date();

            let template = {
                author: this.inputRef.current.value,
                created_at: dt,
                updated_at: dt,
                author_details: {
                    name: this.inputRef.current.value,
                    rating: this.state.rating * 2 // Rating from API is out of 10, but star rating is out of 5, so convert to match API
                },
                content: this.reviewRef.current.value //this.state.review
            }

            movieData.submitReview(this.movieID, template);

            this.closeForm();
        }

        // Stops rendering form
        this.closeForm = () => {
            props.callBack();
        }

        // Click state for button to open reviews
        this.showReviewsClicked = () => {
            this.setState({reviewsClicked: ! this.state.reviewsClicked}) // Toggle state for rendering reviews page
        }
    }

    // When reviews div is rendered, rest of app is locked to scrolling. When reviews div is closed, restore scrolling to app.
    componentDidUpdate() {
        if (this.state.reviewsClicked === false) this.ref.current?.scrollIntoView({ behavior: 'instant' });
        document.querySelector(':root').style.overflowY = 'unset'
    } 

    render() {

        const ref = this.ref;
        const inputRef = this.inputRef;
        const reviewRef = this.reviewRef;

        let handleInput = () => {
            this.setState({author: inputRef.current.value})
        }

        

        return (
        <div ref={ref} className={styles.main}>
            <form>
                <div className={styles.formDiv}>
                    <h1>{this.movieData.title}</h1>
                    <h4>Submit Review</h4>
                    <div className={styles.inputDiv}>
                        <label htmlFor="nameField">Name</label>
                        <input ref={inputRef} type="text" id="nameField" placeholder='Name' onChange={handleInput}/>
                    </div>
                    <div className={styles.reviewDiv} >
                        <h5>How many stars?</h5>
                        <RatingsFormControl styles={styles} formData={this.formData}  />
                    </div>
                    <div className={styles.reviewComments} >
                        <h6>Write your review</h6>
                        <textarea ref={reviewRef}></textarea>
                    </div>
                    <div>
                        <input type='button' className={`btn btn-primary ${styles.reviewButtons}`} onClick={this.submitForm} value='Submit' />
                        <input type='button' className={`btn btn-primary ${styles.reviewButtons}`} onClick={this.closeForm} value='Close' />
                        <input type='button' className={`btn btn-primary ${styles.reviewButtons}`} onClick={this.showReviewsClicked} value='Show Reviews' />
                    </div>
                    {this.state.reviewsClicked?  <AllReviews mainRef={this.props.mainRef} callBack={this.showReviewsClicked} movieID={this.movieID}/> : null}
                </div>
            </form>
        </div>
        )
    }
}
