"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const knex_1 = __importDefault(require("knex"));
const knexfile_1 = __importDefault(require("../knexfile"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 9001;
app.use((0, cors_1.default)());
// Initialize Knex instance
const knex = (0, knex_1.default)(knexfile_1.default);
// Middleware
app.use(body_parser_1.default.json());
app.post('/api/v1/balls', async (req, res) => {
    try {
        const { ball_name, volume } = req.body;
        if (typeof ball_name !== 'string' || typeof volume !== 'number') {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        // Insert data into database
        await knex('balls').insert({ ball_name, volume });
        res.status(201).json({ message: 'Ball data entered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/v1/buckets', async (req, res) => {
    try {
        // Validate request body
        const { bucket_name, volume } = req.body;
        if (typeof bucket_name !== 'string' || typeof volume !== 'number') {
            return res.status(400).json({ error: 'Invalid request body' });
        }
        // Insert data into database
        await knex('buckets').insert({ bucket_name, volume });
        res.status(201).json({ message: 'Bucket data entered successfully' });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/v1/balls', async (req, res) => {
    try {
        const balls = await knex('balls').pluck('ball_name');
        res.status(201).json({ ball_name: balls });
    }
    catch (error) {
        console.error('Error fetching balls:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.post('/api/v1/submit', async (req, res) => {
    const ballCounts = req.body;
    try {
        // Iterate through the received data and update the database accordingly
        for (const ballName in ballCounts) {
            const count = ballCounts[ballName];
            await knex('balls')
                .where({ ball_name: ballName })
                .update({ number_of_balls: knex.raw('COALESCE(number_of_balls, 0) + ?', [count]) });
        }
        res.status(200).json({ message: 'Balls count updated successfully' });
    }
    catch (error) {
        console.error('Error updating ball counts:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
app.get('/api/v1/buckets', async (req, res) => {
    try {
        const buckets = await knex('buckets').pluck('bucket_name');
        res.status(200).json({ bucket_names: buckets });
    }
    catch (error) {
        console.error('Error fetching bucket names:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
