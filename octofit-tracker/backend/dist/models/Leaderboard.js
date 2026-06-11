"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leaderboard = void 0;
const mongoose_1 = require("mongoose");
const leaderboardSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true },
    totalActivities: { type: Number, default: 0 },
    totalCalories: { type: Number, default: 0 },
    totalDistance: { type: Number, default: 0 },
}, { timestamps: true });
exports.Leaderboard = (0, mongoose_1.model)('Leaderboard', leaderboardSchema);
