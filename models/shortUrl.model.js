import mongoose from "mongoose";

const clickSchema = new mongoose.Schema({
    userAgent: String,
    ipAddress: String,
    clickedAt: { type: Date, default: Date.now }
});

const shortenedUrlSchema = new mongoose.Schema({
    originalUrl: { type: String, required: true },
    shortenedUrl: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Reference to the user
    clicks: [clickSchema],
    lastClicked: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now }
});

// Update the lastClicked time when a link is clicked
shortenedUrlSchema.methods.recordClick = function (userAgent, ipAddress) {
    this.clicks.push({ userAgent, ipAddress });
    this.lastClicked = Date.now();
    this.updatedAt = Date.now();
    this.save();
};

// Logic for deleting links that have not been clicked in the last month
shortenedUrlSchema.statics.deleteInactiveLinks = async function () {
    const oneMonthAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    await this.deleteMany({ lastClicked: { $lt: oneMonthAgo } });
};

export default mongoose.model('ShortenedUrl', shortenedUrlSchema);
