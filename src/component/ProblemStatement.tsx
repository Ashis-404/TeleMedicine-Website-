import React from 'react';
import { AlertTriangle, TrendingDown, DollarSign, Clock } from 'lucide-react';

export default function ProblemStatement() {
  const problems = [
    {
      icon: TrendingDown,
      title: "Critical Staff Shortage",
      description: "Only 11 doctors for 23 sanctioned posts at Nabha Civil Hospital",
      stat: "48% Staffing"
    },
    {
      icon: Clock,
      title: "Long Travel Times",
      description: "Patients from 173 villages travel long distances, often missing work",
      stat: "2-4 Hours"
    },
    {
      icon: AlertTriangle,
      title: "Medicine Shortages",
      description: "Frequent stockouts lead to wasted trips and delayed treatment",
      stat: "30% Unavailable"
    },
    {
      icon: DollarSign,
      title: "Financial Burden",
      description: "Daily-wage earners lose income due to healthcare-related travel",
      stat: "₹500-1000 Lost/Visit"
    }
  ];

  return (
    <section id="problem" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            The Healthcare Crisis in Rural Punjab
          </h2>

          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Thousands of rural residents face significant barriers to accessing quality healthcare, 
            leading to preventable complications and financial hardship.
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((problem, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-red-100 p-3 rounded-lg mb-4 inline-block">
                <problem.icon className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{problem.title}</h3>
              <p className="text-gray-600 mb-4">{problem.description}</p>
              <div className="text-2xl font-bold text-red-600">{problem.stat}</div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 bg-white rounded-2xl p-8 shadow-xl">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Impact on Rural Communities</h3>
              <ul className="space-y-3 text-gray-600">
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Daily-wage workers and farmers lose income due to healthcare travel</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Preventable complications worsen due to delayed medical attention</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Poor road conditions and sanitation further hinder healthcare access</span>
                </li>
                <li className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></div>
                  <span>Community well-being declines due to inadequate medical care</span>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Key Statistics</h4>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Internet Access (Rural Punjab)</span>
                  <span className="font-semibold text-orange-600">31%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Villages Served</span>
                  <span className="font-semibold text-orange-600">173</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Doctor Shortage</span>
                  <span className="font-semibold text-red-600">52%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}