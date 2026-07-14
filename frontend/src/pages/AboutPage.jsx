import React from 'react';

const AboutPage = () => {
  return (
    <div className="min-h-screen pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* About the Archive */}
        <section className="max-w-4xl mx-auto space-y-12 mb-32">
          <h1 className="text-5xl md:text-6xl font-serif text-archive-text">
            About the Archive
          </h1>
          
          <div className="space-y-8">
            <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
              Living Heritage is an open-access digital archive documenting Rajwada and Lal Bagh through architecture, photographs, conservation records, and oral histories.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
              Rather than presenting a single historical narrative, the archive invites visitors to explore the many ways these palace spaces continue to shape the cultural life of Indore.
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
              The archive is organized into three series: Rajwada (architecture and public spaces), Lal Bagh (interiors and gardens), and Voices (oral histories from caretakers, researchers, and community members).
            </p>
            
            <p className="text-base md:text-lg leading-relaxed text-archive-text/90">
              All materials are available under open access for research, education, and public engagement. The archive is designed to grow over time, incorporating new documentation, voices, and perspectives.
            </p>
          </div>
        </section>
        
        {/* About the Archivist */}
        <section className="border-t border-archive-secondary pt-24">
          <div className="grid md:grid-cols-12 gap-12">
            <div className="md:col-span-4">
              <div className="aspect-[3/4] bg-archive-secondary overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/38281680/pexels-photo-38281680.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
                  alt="Taarina Therese Chandiramani"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="md:col-span-8 space-y-8">
              <h2 className="text-3xl md:text-4xl font-serif text-archive-text">
                About the Archivist
              </h2>
              
              <p className="text-base leading-relaxed text-archive-text/90">
                Taarina Therese Chandiramani is an artist-researcher currently pursuing an M.A. in English with Digital Humanities. Her work lies at the intersection of museums, archives, oral history, material culture and heritage documentation. Through digital storytelling and archival practices, she explores how digital technologies can make cultural heritage more accessible while preserving the complexity of historical narratives. Living Heritage reflects her ongoing commitment to documenting built heritage through open-access digital archives that encourage public engagement and new ways of experiencing the cultural landscapes of Indore.
              </p>
              
              <div className="space-y-4">
                <p className="text-xs tracking-widest uppercase text-archive-text/60">Research Interests</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Digital Humanities',
                    'Museums',
                    'Archives',
                    'Material Culture',
                    'Oral History',
                    'Heritage Documentation',
                    'Public History',
                    'Digital Storytelling'
                  ].map((interest, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 border border-archive-secondary text-xs tracking-wider text-archive-text/80"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="pt-6 space-y-4">
                <p className="text-xs tracking-widest uppercase text-archive-text/60">Contact</p>
                <p className="text-base text-archive-text/70">
                  For inquiries about the archive, contributions, or research access, please contact via the university department.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;