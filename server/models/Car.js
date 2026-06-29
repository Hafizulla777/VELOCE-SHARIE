const mongoose = require('mongoose');

const specsSchema = new mongoose.Schema(
  {
    fuel: {
      type: String,
      enum: ['Petrol', 'Diesel', 'Electric', 'Hybrid'],
      default: 'Petrol',
    },
    transmission: {
      type: String,
      enum: ['Automatic', 'Manual', 'CVT'],
      default: 'Automatic',
    },
    seats: { type: Number, default: 5, min: 1, max: 20 },
    engine: { type: String, default: '' },
    horsepower: { type: Number, default: 0 },
    acceleration: { type: String, default: '' },
    topSpeed: { type: String, default: '' },
    year: { type: Number, default: 2024 },
    mileage: { type: String, default: '' },
  },
  { _id: false }
);

const carSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
    brand: { type: String, trim: true, default: '' },
    model: { type: String, trim: true, default: '' },
    category: {
      type: String,
      enum: ['Sports', 'SUV', 'Sedan', 'Hatchback', 'Convertible', 'Luxury', 'Electric', 'Pickup', 'Van', 'Other'],
      default: 'Other',
    },
    pricePerDay: { type: Number, default: 0, min: [0, 'Price cannot be negative'] },
    images: {
      type: [String],
      default: [],
      validate: { validator: (arr) => arr.length <= 10, message: 'Maximum 10 images allowed' },
    },
    specs: { type: specsSchema, default: () => ({}) },
    name: { type: String, trim: true, default: '' },
    type: { type: String, trim: true, default: '' },
    price: { type: Number, default: 0 },
    imageUrl: { type: String, default: '' },
    fuel: { type: String, trim: true, default: '' },
    transmission: { type: String, trim: true, default: '' },
    description: { type: String, trim: true, default: '' },
    features: { type: [String], default: [] },
    location: { type: String, trim: true, default: '' },
    isAvailable: { type: Boolean, default: true },
    rating: { type: Number, default: 0, min: 0, max: 5 },
    reviewCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

carSchema.virtual('displayName').get(function () {
  if (this.brand && this.model) return `${this.brand} ${this.model}`;
  return this.name || 'Unknown Car';
});

carSchema.virtual('displayCategory').get(function () {
  return this.category || this.type || 'Other';
});

carSchema.virtual('displayPrice').get(function () {
  return this.pricePerDay || this.price || 0;
});

carSchema.virtual('displayImages').get(function () {
  if (this.images && this.images.length > 0) return this.images;
  return this.imageUrl ? [this.imageUrl] : [];
});

carSchema.virtual('displayFuel').get(function () {
  return this.specs?.fuel || this.fuel || '';
});

carSchema.virtual('displayTransmission').get(function () {
  return this.specs?.transmission || this.transmission || '';
});

carSchema.set('toJSON', { virtuals: true });
carSchema.set('toObject', { virtuals: true });

carSchema.index({ brand: 1, model: 1 });
carSchema.index({ category: 1 });
carSchema.index({ owner: 1 });
carSchema.index({ isAvailable: 1 });

module.exports = mongoose.model('Car', carSchema);