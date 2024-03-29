import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import styles from './TitleBar.module.css'
import SvgHomeIcon from './SvgHomeIcon'
import SvgSearchIcon from './SvgSearchIcon'
import TitleBarButton from './TitleBarButton' 
import Title from './Title'
import SearchForm from './SearchForm'

// Renders completed navbar with title and buttons
export default class TitleBarContainer extends Component {

    constructor(props) {
        super(props)
        
        this.state = {
            searchClicked: false,
            homeClicked: false
        }
    }

    // OnClick function for search button to toggle search form opening/closing. 
    setSearchFormVisibility = () => {
        let currentState = ! this.state.searchClicked;
        let obj = {searchClicked: currentState} // Toggle search form visibility
        this.setState(obj)
    }

    // Onclick function for home button
    goHome = () => {
        let obj = {homeClicked: true};
        this.setState(obj)
        window.location.reload();
    }

    render() {

        let searchClicked = this.state.searchClicked;
        //let homeClicked = this.state.homeClicked;

        return (
            <>
                <div className={`container-fluid ${styles.titleBarMainDiv}`} style={{position: 'relative'}}>
                    
                    {/** Div container for title and button components */}
                    <div className={`d-flex flex-row `} >
                        
                        {/** Renders app title with logo */}
                        <Title className='d-flex flex-column flex-sm-row'/>
                
                        {/** Spacer div with filmstrip background*/}
                        <div className={`d-flex ${styles.titleBarBackground}`} ></div> 
                    
                        {/** Home button */}
                        <TitleBarButton stateObject={{homeClicked: true}} className={`${styles.homeButton} `} icon={SvgHomeIcon} onClick={this.goHome} text='Home'/>

                        {/** Search Button */}
                        <TitleBarButton stateObject={{searchClicked: true}} className={styles.searchButton} icon={SvgSearchIcon} onClick={this.setSearchFormVisibility} text='Search'/>
                        
                    </div>

                    
                </div>
                {/* Renders drop down search form - Currently not implemnted yet except as a demo concept */}
                <div> 
                    {searchClicked? <SearchForm /> : null}
                </div>
            </>
        )
    }

}


