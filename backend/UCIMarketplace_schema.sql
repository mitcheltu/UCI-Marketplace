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
    firebase_uid VARCHAR(100) NOT NULL UNIQUE,
    username VARCHAR(50) NOT NULL UNIQUE,
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

CREATE TABLE trade_requests (
    request_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    requester_id UUID NOT NULL,
    receiver_id UUID NOT NULL,
    status VARCHAR(20) CHECK (status IN ('pending', 'accepted', 'rejected')) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (requester_id) REFERENCES Users(user_id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES Users(user_id) ON DELETE CASCADE
);

CREATE TABLE trade_items (
    trade_item_id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    request_id UUID NOT NULL,
    item_id UUID NOT NULL,
    owner_role VARCHAR(20) NOT NULL CHECK (owner_role IN ('requester', 'receiver')),
    FOREIGN KEY (request_id) REFERENCES trade_requests(request_id) ON DELETE CASCADE,
    FOREIGN KEY (item_id) REFERENCES Items(item_id) ON DELETE CASCADE
);

CREATE INDEX idx_items_user_id ON Items(user_id);
CREATE INDEX idx_trade_requests_requester_id ON trade_requests(requester_id);
CREATE INDEX idx_trade_requests_receiver_id ON trade_requests(receiver_id);
CREATE INDEX idx_trade_items_request_id ON trade_items(request_id);
CREATE INDEX idx_trade_items_item_id ON trade_items(item_id);

CREATE INDEX idx_items_category ON Items(category);
CREATE INDEX idx_items_created_at ON Items(created_at DESC);
CREATE INDEX idx_users_created_at ON Users(created_at DESC);
CREATE INDEX idx_trade_requests_created_at ON trade_requests(created_at DESC);