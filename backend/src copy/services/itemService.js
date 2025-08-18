const driver = require('../config/neo4j');

// Fetch all items from the graph
exports.fetchAllItems = async () => {
  const session = driver.session();
  try {
    const result = await session.run('MATCH (i:Item) RETURN i');
    return result.records.map(record => record.get('i').properties);
  } finally {
    await session.close();
  }
};


// Create a new item node
exports.createItem = async (itemData) => {
  const session = driver.session();
  console.log(123);
  try {
    const query = `
      CREATE (i:Item {
          id: randomUUID(),
          title: $title,
          description: $description,
          category: $category,
          createdAt: datetime()
      })
      WITH i
      MATCH (u:User {id: $userId})
      CREATE (u)-[:LISTED]->(i)
      RETURN i
    `;

    const result = await session.run(query, {
      userId: itemData.userId,
      title: itemData.title,
      description: itemData.description,
      category: itemData.category
    });


    console.log("Item created successfully:", result.records[0].get('i').properties);

    return result.records[0].get('i').properties;
  } finally {
    await session.close();
  }
};

