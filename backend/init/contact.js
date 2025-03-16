const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); 
const Patient = require('./models/Patient'); 

/
mongoose.connect('mongodb://localhost:27017/yourdbname', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });


const createRandomPatients = async (numPatients) => {
  const patients = [];
  for (let i = 0; i < numPatients; i++) {
    const patient = {
      name: faker.name.findName(),
      email: faker.internet.email(),
      message: faker.lorem.sentence(),
    };
    patients.push(patient);
  }

  try {
    
    const createdPatients = await Patient.insertMany(patients);
    console.log(`${createdPatients.length} patients inserted`);
  } catch (err) {
    console.error('Error inserting patients:', err);
  } finally {
    
    mongoose.connection.close();
  }
};


createRandomPatients(10);
