import React from 'react'
import styles from './TitleBar.module.css'
import SvgTitleLogo from './SvgTitleLogo'

// Renders app title for navbar
export default function Title(props) {
    
    // Inline styles related to alignment of elements only. Theming is handled in CSS module
    return (
        
        <div className={props.className} style={{fontSize: '2.5vh', fontWeight: 'bold', paddingTop: '.1em', paddingRight: 4, paddingBottom: 6, marginLeft: '20px'}}>
            <span style={{textWrap: 'nowrap'}}>
                The Movie
            </span>
            <span style={{display: 'flex', paddingLeft: 4, textWrap: 'nowrap'}}>
                React <SvgTitleLogo className={styles.AppLogo} /> 
                r
            </span>
        </div>
  )
}
