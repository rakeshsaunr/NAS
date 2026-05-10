import React, { useState } from 'react';
import { Camera, Phone, Network, Wrench, LayoutGrid } from 'lucide-react';

const App = () => {
  // Filter categories state
  const [activeFilter, setActiveFilter] = useState('All Work');

  // Project data based on the screenshot
  const projects = [
    {
      id: 1,
      title: 'CCTV Installation - Anuj Gupta Ji',
      category: 'CCTV',
      imageUrl: 'https://images.unsplash.com/photo-1557597774-9d2739f85a94?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 2,
      title: 'CHOLAMANDALAM Office',
      category: 'CCTV',
      imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 3,
      title: 'Hotel Metro EPABX System',
      category: 'EPABX',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 4,
      title: 'Swastik Coal Installation',
      category: 'EPABX',
      imageUrl: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 5,
      title: 'Multiple Products Networking',
      category: 'Networking',
      imageUrl: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=800',
    },
    {
      id: 6,
      title: 'CCTV Maintenance - RED Moments',
      category: 'Maintenance',
      imageUrl: 'https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800',
    },
  ];

  // Icons array for filters
  const categories = [
    { name: 'All Work', icon: <LayoutGrid size={18} /> },
    { name: 'CCTV', icon: <Camera size={18} /> },
    { name: 'EPABX', icon: <Phone size={18} /> },
    { name: 'Networking', icon: <Network size={18} /> },
    { name: 'Maintenance', icon: <Wrench size={18} /> },
  ];

  const filteredProjects = activeFilter === 'All Work' 
    ? projects 
    : projects.filter(p => p.category === activeFilter);

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Hero Section - Project Gallery Header */}
      <section className="bg-[#1e3a8a] py-16 px-6 md:px-12">
        <div className="max-w-7xl mx-auto text-white">
          <h1 className="text-4xl font-bold mb-4 text-left">Project Gallery</h1>
          <p className="text-lg opacity-90 text-left">Browse through our completed projects and installations</p>
        </div>
      </section>

      {/* Filter Tabs Section */}
      <section className="max-w-7xl mx-auto -mt-8 px-6">
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 bg-white p-3 rounded-lg shadow-md border border-gray-100">
          {categories.map((cat) => (
            <button
              key={cat.name}
              onClick={() => setActiveFilter(cat.name)}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-md transition-all duration-300 text-sm font-medium ${
                activeFilter === cat.name
                  ? 'bg-gradient-to-r from-red-600 to-red-400 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat.icon}
              {cat.name}
            </button>
          ))}
        </div>
      </section>

      {/* Project Card Grid */}
      <section className="max-w-7xl mx-auto py-16 px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredProjects.map((project) => (
            <div 
              key={project.id} 
              className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-200">
                <img
                  src={project.imageUrl}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=Project+Image';
                  }}
                />
              </div>

              {/* Text Content */}
              <div className="p-5">
                <h3 className="text-gray-800 font-semibold text-base mb-4 line-clamp-2 min-h-[3rem]">
                  {project.title}
                </h3>
                
                {/* Category Badge */}
                <span className="inline-block px-3 py-1 bg-gray-100 text-gray-500 text-[10px] font-bold uppercase tracking-wider rounded">
                  {project.category}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        {/* Empty State message */}
        {filteredProjects.length === 0 && (
          <div className="text-center py-20 text-gray-500">
            Is category mein koi projects nahi mile.
          </div>
        )}
      </section>
    </div>
  );
};

export default App;