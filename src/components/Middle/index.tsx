import { Link } from 'react-router-dom';
import conferenceRoom from '../../assets/conference-room.jpg';
import teamCollaboration from '../../assets/team-collaboration.jpg';
import earthGlobe from '../../assets/earth-globe.jpg';
import blueWavesBg from '../../assets/blue-waves-bg.jpg';

export function Middle() {
  return (
    <div 
      className="w-full min-h-screen relative flex items-center justify-between px-8 py-16"
      style={{ background: 'var(--gradient-main-bg)' }}
    >
      {/* Left Side - Images */}
      <div className="flex flex-col gap-4 w-1/4">
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <img 
            src={conferenceRoom} 
            alt="Conference Room" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="w-full h-48 overflow-hidden rounded-lg">
          <img 
            src={teamCollaboration} 
            alt="Team Collaboration" 
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Center - Main Content */}
      <div className="text-center text-white flex-1 mx-12">
        <h1 className="text-6xl font-bold mb-4 leading-tight">
          Earth<br />
          <span className="text-5xl">is our Goal</span>
        </h1>
        <p className="text-xl mb-2">Enjoy our best solutions for</p>
        <p className="text-xl">
          <span className="text-blue-300">scientific</span><br />
          and trade proposals
        </p>
      </div>

      {/* Right Side - Earth Globe */}
      <div className="w-1/3 flex justify-center">
        <img 
          src={earthGlobe} 
          alt="Earth Globe" 
          className="w-96 h-96 object-cover rounded-full"
        />
      </div>

      {/* Bottom Wave Pattern */}
      <div 
        className="absolute bottom-0 left-0 w-full h-64 bg-cover bg-center"
        style={{ backgroundImage: `url(${blueWavesBg})` }}
      />

      {/* News Links - Positioned absolutely */}
      <div className="absolute bottom-8 left-8">
        <p className="text-white text-sm mb-2">Clique sobre a notícia para mais detalhes</p>
      </div>
    </div>
  );
}