import React from 'react';
import './../../styles/sidebar.css';

const NAV_ITEMS = ['About', 'Go to the bar', 'Contact'];
const Sidebar = ({ activeSection, isTransitioning, hasInteracted, navigateToSection }) => {
    return (
        <div className="sidebar">
            <div className="floralBorderTop" />
            <h1 className="title">Welcome in weary traveller, to the Outlier's Rest.</h1>
            <p className="subhead_1">"It is not down in any map; true places never are."</p>
            <p className="subhead_2">- Moby Dick</p>
            <p className="subhead_3">Pull up a stool and share a tale or two with the barkeep. On the board, you'll find today's specials — a selection to stir your spirits.</p>
            
            {NAV_ITEMS.map((section, index) => (
                <div 

                key={section}

                onClick={() => !isTransitioning && navigateToSection(index)}
                className={`
                    nav-item
                    ${activeSection === index ? 'active' : ''}
                    ${isTransitioning ? 'transitioning' : ''}
                    ${index === 0 && !hasInteracted ? 'pulse' : ''}
                `}
                >
                - {section}
                </div>
            ))}
            <div className="floralBorderBottom"/>
        </div>
    )    
    };
export default Sidebar;