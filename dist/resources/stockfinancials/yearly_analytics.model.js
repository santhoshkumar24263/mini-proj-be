"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const AnalyticsSchema = new mongoose_1.Schema({
    Symbol: { type: String, required: true },
    Date: { type: String, required: true },
    Profit: { type: Number, required: true },
});
exports.default = (0, mongoose_1.model)("stockfinancials", AnalyticsSchema);