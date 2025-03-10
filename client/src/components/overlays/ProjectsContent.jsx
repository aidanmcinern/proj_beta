import { useState } from 'react';
import { TreePine, Users } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar } from 'recharts';


const ProjectsContent = ({ datasets }) => {
  const [activeTab, setActiveTab] = useState('Climate Analysis');
  return(
      <div style={{ color: '#ffffff', fontFamily: 'Arial', padding: '50px', height: '100%', overflow: 'auto' }}>
        <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
          <div
            onClick={() => setActiveTab('Climate Analysis')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: activeTab === 'Climate Analysis' ? '2px solid #f0a500' : 'none',
            }}
          >
            <TreePine size={20} /> Climate Analysis
          </div>
          <div
            onClick={() => setActiveTab('Migration & Development')}
            style={{
              padding: '10px',
              cursor: 'pointer',
              borderBottom: activeTab === 'Migration & Development' ? '2px solid #f0a500' : 'none',
            }}
          >
            <Users size={20} /> Migration & Development
          </div>
        </div>
  
        {activeTab === 'Climate Analysis' ? (
          <div>
            <p>Some placeholder stuff (populated from an azure hosted Cosmos Dabtabse)</p>
            <LineChart width={500} height={300} data={datasets.climate}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="temperature" stroke="#f0a500" />
              <Line type="monotone" dataKey="rainfall" stroke="#82ca9d" />
            </LineChart>
          </div>
        ) : (
          <div>
            <p>Some placeholder stuff (populated from an azure hosted Cosmos Dabtabse)</p>
            <BarChart width={500} height={300} data={datasets.migration}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="migration" fill="#f0a500" />
              <Bar dataKey="gdp" fill="#82ca9d" />
            </BarChart>
          </div>
        )}
        
      </div>
    );
};

  export default ProjectsContent;