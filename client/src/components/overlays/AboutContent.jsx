import React from 'react';
import { Database, Globe2 } from 'lucide-react';

const AboutOverlay = ({ handleOverlayClick, navigateToSection, activeSection }) => (
  <div className="overlay" onClick={handleOverlayClick}> 
    <div >

    <div style={{ color: '#ffffff', fontFamily: 'Arial', padding: '20px', height: '100%', overflow: 'auto' }}>
      <h2 style={{ color: '#f0a500', marginBottom: '5px' }}>About This Page</h2>
      <div style={{ display: 'flex', gap: '20px', marginBottom: '-15px' }}>
        <div style={{ flex: 2 }}>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            You've found your way to my personal project site - welcome! - where i'm testing out a combination of data science and web development techniques and tools.
            Inspired by a virtual pub theme, it serves as a platform to experiment with coding development.
          </p>
          <h2 style={{ color: '#f0a500', marginBottom: '0px' }}>About Me</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
            I'm an experienced data scientist and statistician with a keen interest in storytelling through data.
            A problem solver, well-organised, and with high attention to detail; beyond my day-to-day work, I enjoy exploring new technologies and solving creative challenges.
            A fan of outdoor activities.
          </p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
        <div>
          <h3 style={{ 
            color: '#f0a500', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '8px' 
          }}>
            <Database size={20} /> Skills
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}>
            {['Python','SQL','DBT','Machine Learning','Computer Vision','Geospatial Analytics','Cloud: AWS, GCP, Azure','Git DevOps'].map((skill) => (
              <div
                key={skill}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#333',
                  display: 'inline-block',
                  margin: '4px'
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
        <div>
          <h3 style={{ 
            color: '#f0a500', 
            display: 'flex', 
            alignItems: 'center', 
            gap: '10px',
            marginBottom: '8px' 
          }}>
            <Globe2 size={20} /> Sector Expertise
          </h3>
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '4px',
          }}>
            {['Transport','Supply Chain','Retail','Cellular','Wi-Fi'].map((skill) => (
              <div
                key={skill}
                style={{
                  backgroundColor: '#f0f0f0',
                  border: '1px solid #ddd',
                  borderRadius: '4px',
                  padding: '5px',
                  textAlign: 'center',
                  fontSize: '14px',
                  color: '#333',
                  display: 'inline-block',
                  margin: '4px'
                }}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>

    </div>

  </div>
);

export default AboutOverlay