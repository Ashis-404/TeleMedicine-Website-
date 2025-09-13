
/*ServiceAreaMap.tsx*/
import { useState, useEffect } from 'react';
import { Users, Activity, Zap } from 'lucide-react';

const stats = {
  coverage: 85,
  connectivity: 92,
  response: 2
};

export default function ServiceAreaMap() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              Service Coverage Area
            </span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive healthcare coverage across the Nabha region, connecting rural communities 
            with quality medical care through our innovative telemedicine platform.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Image instead of Interactive Map */}
          <div className={`relative transform transition-all duration-1000 delay-300 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            <div className="bg-white rounded-2xl shadow-2xl p-8 hover:shadow-3xl transition-all duration-500">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Nabha Region Coverage Map
              </h3>

              {/* Replace this with your own image */}
              <div className="relative w-full h-96 rounded-xl overflow-hidden border-2 border-gray-200">
                <img 
                  src="/NABHA_MAP.png" 
                  alt="Nabha Region Map" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Legend */}
              <div className="flex justify-center space-x-6 mt-6">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <span className="text-sm text-gray-600">Medical Hub (Nabha)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Connected Villages</span>
                </div>
              </div>
            </div>
          </div>

          {/* Statistics and Info */}
          <div className={`space-y-8 transform transition-all duration-1000 delay-500 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`}>
            {/* Coverage Stats */}
            <div className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl transition-all duration-500">
              <h4 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Activity className="h-6 w-6 text-blue-600 mr-2" />
                Coverage Statistics
              </h4>
              
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Area Coverage</span>
                    <span className="text-blue-600 font-bold">{stats.coverage}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${stats.coverage}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Network Connectivity</span>
                    <span className="text-green-600 font-bold">{stats.connectivity}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-green-600 h-full rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${stats.connectivity}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-gray-700 font-medium">Response Time</span>
                    <span className="text-purple-600 font-bold">&lt;{stats.response}h</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div 
                      className="bg-gradient-to-r from-purple-500 to-purple-600 h-full rounded-full transition-all duration-2000 ease-out"
                      style={{ width: `${100 - stats.response * 10}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Key Features */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-blue-100 to-blue-200 p-4 rounded-lg mb-3 inline-block group-hover:scale-110 transition-transform duration-300">
                    <Users className="h-8 w-8 text-blue-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900">173 Villages</h5>
                  <p className="text-sm text-gray-600">Connected Communities</p>
                </div>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 group">
                <div className="text-center">
                  <div className="bg-gradient-to-r from-green-100 to-green-200 p-4 rounded-lg mb-3 inline-block group-hover:scale-110 transition-transform duration-300">
                    <Zap className="h-8 w-8 text-green-600" />
                  </div>
                  <h5 className="font-semibold text-gray-900">Real-time</h5>
                  <p className="text-sm text-gray-600">Health Monitoring</p>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-6 text-white">
              <h4 className="text-lg font-bold mb-2">Expand Our Reach</h4>
              <p className="text-blue-100 mb-4 text-sm">
                Help us connect more villages and improve rural healthcare accessibility.
              </p>
              <button className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors text-sm">
                Join Our Mission
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

