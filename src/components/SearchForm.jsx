import React, { Component } from 'react'
import styles from './TitleBar.module.css'

// Dropdown form for searching for movie. Not implmented yet.
export default class SearchForm extends Component {

    constructor(props) {
        super(props)

    }
  
    render() {
        return (
        <div className={`container-fluid rounded-bottom ${styles.searchForm}`} >
            <form>
                <div className='card'>
                    
                </div>
                <button type="submit" className="btn btn-primary my-5">Submit</button>
            </form>
        </div>
        )
    }
}
//style={{position: 'absolute', top: 62, zIndex: 100, left: 0, right: 0} }
/*
<div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1"/>
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
                        <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                    </div>
*/