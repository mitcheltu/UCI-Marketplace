const driver = require('../config/neo4j');

// Fetch all users
exports.fetchAllUsers = async () => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (u:User) RETURN u');
    return result.records.map(record => record.get('u').properties);
    
  } finally {
    await session.close();
  }
};

// Create a new user
exports.createUser = async (userData) => {
  const session = driver.session();
  try {
    const query = `
      CREATE (u:User {
        id: randomUUID(),
        name: $name,
        createdAt: datetime()
      })
      RETURN u
    `;

    const result = await session.run(query, {
        name: userData.name
    // can add email later->  email: userData.email
    });

    return result.records[0].get('u').properties;
  } finally {
    await session.close();
  }
};