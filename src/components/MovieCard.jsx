import React, { Component } from 'react'
import stylesModule from './MovieShowCase.module.css'
import RatingsCard from './RatingsCard';
import ReviewForm from './ReviewForm';

// Renders poster card with movie synopsis and rating/review of movie
export default class MovieCard extends Component {
    constructor(props) {
        
        super(props);

        // For creating reference to top of poster to implement scroll snapping
        this.ref = React.createRef(null);

        props = props.propsObj;

        // Default styling from css module can be overridden by styles passed from parent component
        if (props.styles !== undefined) {
            this.styles = props.styles;
        } else {
            this.styles = stylesModule;
        }

        // Click state for review card to support onClick function
        this.state = {
            isClicked: false
        }
    }

    // Handles click for opening reviews component and scrolling to top of page for access to navbar
    handleClick = () => {
        if (this.props.propsObj.noClick != undefined && this.props.propsObj.noClick === true) {   // Disables onClick if noClick property passed in propsObj
            return;
        }

        let clickState = !this.state.isClicked;
        this.setState({isClicked: clickState});
        if (clickState === true){ this.ref.current?.scrollIntoView({ behavior: 'smooth' }) }
    }

    render() {

        let props = this.props.propsObj;
        let styles = this.styles;
        let isClicked = this.state.isClicked;
        let handleClick = this.handleClick;
        const ref = this.ref;

        return (
            <div ref={ref} className={styles.showcaseCard}>
                <div className='d-flex flex-column flex-sm-row'>
                    <div className={styles.posterContainer}>
                        <img className={` ${styles.showcasePoster}`} src={props.posterPath} alt='poster' />
                    </div>
                    <div style={{position: 'relative'}}>
                        <div className={styles.showcaseDetails}>
                            <h3 className={styles.showcaseTitle}>{props.movieTitle}</h3>
                            <p className={styles.showcaseOverview}>{props.overview}</p>
                            <RatingsCard onClick={handleClick} reviewsMaxLength={props.reviewsMaxLength} styles={props.styles} rating={props.rating} key={props.key} movieID={props.movieID}/>
                            
                            <div className={styles.extraControls}>
                                <input className='btn btn-primary' type='button' value='Submit Review' onClick={handleClick}/>
                            </div>
                            {/** Conditional render of reviews div. When rendered, locks scrolling on body and enables on reviews div. pass props callback function for discarding component */}
                            {isClicked? <ReviewForm mainRef={this.props.mainRef} callBack={handleClick} movieID={props.movieID} collectionIndex={props.key}/> : null}
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}
