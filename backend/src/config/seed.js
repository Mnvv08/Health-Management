const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Hospital = require('../models/Hospital');
const Doctor = require('../models/Doctor');

// Load env vars
dotenv.config();

const hospitals = [
  {
    name: 'Apollo Hospitals',
    image: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80',
    location: {
      address: 'Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      coordinates: { lat: 17.412, lng: 78.411 }
    },
    specialities: ['Cardiology', 'Orthopedic', 'Neurology', 'Emergency'],
    facilities: ['ICU', 'Pharmacy', 'Lab', 'Ambulance', 'Emergency 24/7'],
    rating: 4.8,
    totalReviews: 12450,
    phone: '+91 40-1234-5678',
    email: 'info@apollohospitals.com',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: true,
    distance: '2.5 km'
  },
  {
    name: 'Fortis Healthcare',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&q=80',
    location: {
      address: 'Bannerghatta Road',
      city: 'Bangalore',
      state: 'Karnataka',
      coordinates: { lat: 12.891, lng: 77.596 }
    },
    specialities: ['Oncology', 'Cardiology', 'General', 'Pediatrics'],
    facilities: ['ICU', 'Pharmacy', 'Lab'],
    rating: 4.6,
    totalReviews: 8900,
    phone: '+91 80-9876-5432',
    email: 'contact@fortis.in',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: true,
    distance: '4.1 km'
  },
  {
    name: 'Max Super Speciality',
    image: 'https://images.unsplash.com/photo-1538108149393-fbbd81895907?auto=format&fit=crop&q=80',
    location: {
      address: 'Saket',
      city: 'New Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.527, lng: 77.213 }
    },
    specialities: ['Cardiology', 'Orthopedic', 'Emergency'],
    facilities: ['ICU', 'Ambulance', 'Emergency 24/7'],
    rating: 4.7,
    totalReviews: 10200,
    phone: '+91 11-2345-6789',
    email: 'help@maxhealthcare.com',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: true,
    distance: '5.0 km'
  },
  {
    name: 'AIIMS',
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&q=80',
    location: {
      address: 'Ansari Nagar',
      city: 'New Delhi',
      state: 'Delhi',
      coordinates: { lat: 28.565, lng: 77.206 }
    },
    specialities: ['General', 'Cardiology', 'Pediatrics', 'Neurology'],
    facilities: ['ICU', 'Pharmacy', 'Lab', 'Ambulance'],
    rating: 4.9,
    totalReviews: 50000,
    phone: '+91 11-4567-8901',
    email: 'contact@aiims.edu',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: false,
    distance: '6.2 km'
  },
  {
    name: 'Medanta - The Medicity',
    image: 'https://images.unsplash.com/photo-1586773860418-d37222d8fce3?auto=format&fit=crop&q=80',
    location: {
      address: 'Sector 38',
      city: 'Gurugram',
      state: 'Haryana',
      coordinates: { lat: 28.438, lng: 77.043 }
    },
    specialities: ['Cardiology', 'Orthopedic', 'Oncology'],
    facilities: ['ICU', 'Pharmacy', 'Lab', 'Ambulance'],
    rating: 4.8,
    totalReviews: 15600,
    phone: '+91 124-5678-9012',
    email: 'info@medanta.org',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: true,
    distance: '8.4 km'
  },
  {
    name: 'Manipal Hospital',
    image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80',
    location: {
      address: 'Old Airport Road',
      city: 'Bangalore',
      state: 'Karnataka',
      coordinates: { lat: 12.959, lng: 77.649 }
    },
    specialities: ['Orthopedic', 'Pediatrics', 'General', 'Emergency'],
    facilities: ['ICU', 'Pharmacy', 'Emergency 24/7'],
    rating: 4.5,
    totalReviews: 7200,
    phone: '+91 80-6789-0123',
    email: 'care@manipal.com',
    timings: 'Open 24/7',
    isOpenNow: true,
    isEmergency: true,
    distance: '3.8 km'
  }
];

const doctorsList = [
  {
    name: 'Dr. Ramesh Kumar',
    photo: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80',
    speciality: 'Cardiologist',
    experience: 15,
    rating: 4.9,
    totalReviews: 450,
    qualifications: ['MBBS', 'MD - Cardiology'],
    languages: ['English', 'Hindi', 'Telugu'],
    consultationFee: 1500,
    availability: { days: ['Mon', 'Wed', 'Fri'], startTime: '10:00 AM', endTime: '02:00 PM' },
    isAvailableToday: true,
    phone: '+91 9876543210',
    bio: 'Expert in interventional cardiology with over 15 years of experience in treating complex heart conditions.',
    awards: ['Best Cardiologist 2021', 'Lifetime Achievement Award']
  },
  {
    name: 'Dr. Sunita Sharma',
    photo: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80',
    speciality: 'Pediatrician',
    experience: 12,
    rating: 4.8,
    totalReviews: 320,
    qualifications: ['MBBS', 'MD - Pediatrics'],
    languages: ['English', 'Hindi'],
    consultationFee: 1000,
    availability: { days: ['Tue', 'Thu', 'Sat'], startTime: '11:00 AM', endTime: '04:00 PM' },
    isAvailableToday: true,
    phone: '+91 9876543211',
    bio: 'Dedicated pediatrician specializing in neonatal care and child health.',
    awards: ['Top Pediatrician 2022']
  },
  {
    name: 'Dr. Amit Patel',
    photo: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80',
    speciality: 'Orthopedic',
    experience: 20,
    rating: 4.7,
    totalReviews: 510,
    qualifications: ['MBBS', 'MS - Orthopedics'],
    languages: ['English', 'Gujarati', 'Hindi'],
    consultationFee: 1200,
    availability: { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'], startTime: '09:00 AM', endTime: '05:00 PM' },
    isAvailableToday: false,
    phone: '+91 9876543212',
    bio: 'Senior orthopedic surgeon specializing in joint replacement and trauma surgery.',
    awards: ['Excellence in Orthopedics']
  },
  {
    name: 'Dr. Priya Singh',
    photo: 'https://images.unsplash.com/photo-1594824436998-d8869c4fa2eb?auto=format&fit=crop&q=80',
    speciality: 'Dermatologist',
    experience: 8,
    rating: 4.6,
    totalReviews: 280,
    qualifications: ['MBBS', 'MD - Dermatology'],
    languages: ['English', 'Hindi'],
    consultationFee: 800,
    availability: { days: ['Mon', 'Thu', 'Sat'], startTime: '12:00 PM', endTime: '06:00 PM' },
    isAvailableToday: true,
    phone: '+91 9876543213',
    bio: 'Experienced dermatologist treating a wide range of skin, hair, and nail conditions.',
    awards: ['Best Young Dermatologist']
  },
  {
    name: 'Dr. Vikram Reddy',
    photo: 'https://images.unsplash.com/photo-1537368910025-702800a968af?auto=format&fit=crop&q=80',
    speciality: 'Neurologist',
    experience: 18,
    rating: 4.9,
    totalReviews: 610,
    qualifications: ['MBBS', 'DM - Neurology'],
    languages: ['English', 'Telugu', 'Kannada'],
    consultationFee: 2000,
    availability: { days: ['Tue', 'Wed', 'Fri'], startTime: '10:00 AM', endTime: '01:00 PM' },
    isAvailableToday: true,
    phone: '+91 9876543214',
    bio: 'Leading neurologist known for treating complex neurological disorders and stroke management.',
    awards: ['Neuroscience Excellence Award']
  },
  {
    name: 'Dr. Anjali Desai',
    photo: 'https://images.unsplash.com/photo-1651008376811-b90baee60c1f?auto=format&fit=crop&q=80',
    speciality: 'General Physician',
    experience: 10,
    rating: 4.5,
    totalReviews: 400,
    qualifications: ['MBBS', 'MD - General Medicine'],
    languages: ['English', 'Hindi', 'Marathi'],
    consultationFee: 600,
    availability: { days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'], startTime: '09:00 AM', endTime: '08:00 PM' },
    isAvailableToday: true,
    phone: '+91 9876543215',
    bio: 'Compassionate general physician focusing on preventive care and chronic disease management.',
    awards: []
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing data
    await Hospital.deleteMany();
    await Doctor.deleteMany();

    // Insert hospitals
    const createdHospitals = await Hospital.insertMany(hospitals);
    
    // Assign random hospitals to doctors
    const doctorsWithHospitals = doctorsList.map((doctor, index) => {
      // Just distribute them among the created hospitals
      doctor.hospital = createdHospitals[index % createdHospitals.length]._id;
      return doctor;
    });

    // Insert doctors
    await Doctor.insertMany(doctorsWithHospitals);

    console.log('Seeding complete');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
