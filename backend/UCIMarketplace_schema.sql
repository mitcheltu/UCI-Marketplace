/* 
Users
Items

add user query
get users query

add item query
get items query


*/

CREATE TABLE IF NOT EXISTS Users (
    user_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS Items (
    item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10, 2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    category VARCHAR(50) CHECK (category IN ('Electronics', 'Furniture', 'Clothing', 'Books', 'Toys', 'Sports', 'Stationery', 'Other')),
    image_url VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

INSERT INTO Users (username, password, email) VALUES
('john_doe', 'hashed_password_1', 'email@gmail.com');

INSERT INTO Items (user_id, name, description, price, category, image_url) VALUES
(1, 'Sample Item', 'This is a sample item description.', 19.99, 'Electronics', 'http://example.com/image.jpg');


SELECT user_id, username
FROM Users
LIMIT 10;


SELECT item_id, user_id, name, description, price, category, image_url
FROM Items
LIMIT 10;

SELECT item_id, user_id, name, description, price, category, image_url
FROM Items
WHERE user_id = 
