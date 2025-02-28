const mongoose = require('mongoose');
const { faker } = require('@faker-js/faker'); // Use faker for generating random data
const Patient = require('./models/Patient'); // Adjust the path if needed

// Connect to MongoDB (replace 'mongodb://localhost:27017/yourdbname' with your MongoDB URI)
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

// Function to create random patients
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
    // Insert the generated random patients into the database
    const createdPatients = await Patient.insertMany(patients);
    console.log(`${createdPatients.length} patients inserted`);
  } catch (err) {
    console.error('Error inserting patients:', err);
  } finally {
    // Close the connection after insertion
    mongoose.connection.close();
  }
};

// Call the function to insert 10 random patients
createRandomPatients(10);
