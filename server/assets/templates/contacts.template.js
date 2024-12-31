const contactsList = () => [
  {
    fullName: 'John Doe',
    companyName: 'Example Corp',
    companyAddress: {
      street1: '123 Business Rd',
      street2: 'Suite 456',
      city: 'Metropolis',
      state: 'NY',
      postalCode: '12345',
      country: 'USA',
    },
    emailAddress: 'john.doe@example.com',
    phoneNumber: '(555) 123-4567',
  },
  {
    fullName: 'Jane Smith',
    companyName: 'Tech Innovations LLC',
    companyAddress: {
      street1: '789 Technology Blvd',
      street2: 'Building A',
      city: 'Silicon Valley',
      state: 'CA',
      postalCode: '98765',
      country: 'USA',
    },
    emailAddress: 'jane.smith@techinnovations.com',
    phoneNumber: '(555) 765-4321',
  },
  {
    fullName: 'Emily Johnson',
    companyName: 'Marketing Solutions Inc.',
    companyAddress: {
      street1: '456 Market St',
      street2: 'Floor 2',
      city: 'New York',
      state: 'NY',
      postalCode: '10001',
      country: 'USA',
    },
    emailAddress: 'emily.johnson@marketingsolutions.com',
    phoneNumber: '(555) 234-5678',
  },
];

module.exports = contactsList;
