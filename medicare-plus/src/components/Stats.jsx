import React from 'react';

const Stats = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-primary to-secondary">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-white/20">
          <div className="py-4 md:py-0">
            <p className="text-4xl font-extrabold text-white mb-2">500+</p>
            <p className="text-white/90 font-medium tracking-wide uppercase text-sm">Hospitals Listed</p>
          </div>
          <div className="py-4 md:py-0">
            <p className="text-4xl font-extrabold text-white mb-2">1,000+</p>
            <p className="text-white/90 font-medium tracking-wide uppercase text-sm">Verified Doctors</p>
          </div>
          <div className="py-4 md:py-0">
            <p className="text-4xl font-extrabold text-white mb-2">50,000+</p>
            <p className="text-white/90 font-medium tracking-wide uppercase text-sm">Happy Patients</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Stats;
