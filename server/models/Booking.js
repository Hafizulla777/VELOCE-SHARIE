const mongoose = require('mongoose');

const VALID_TRANSITIONS = {
  pending: ['approved', 'rejected', 'cancelled', 'confirmed', 'active'],
  approved: ['completed', 'cancelled'],
  confirmed: ['completed', 'cancelled'],
  active: ['completed', 'cancelled'],
  rejected: [],
  completed: [],
  cancelled: [],
};

const bookingSchema = new mongoose.Schema(
  {
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: [true, 'Car reference is required'] },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: [true, 'Customer reference is required'] },
    
    // FIXED: Removed 'required: true' so old bookings without an owner don't crash the app on save()
    owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, 
    
    startDate: { type: Date, required: [true, 'Start date is required'] },
    endDate: { type: Date, required: [true, 'End date is required'] },
    
    // Supports both simple totalPrice and advanced totalAmount
    totalPrice: { type: Number }, 
    totalAmount: { type: Number },
    
    status: {
      type: String,
      // FIXED: Added 'confirmed' and 'active' so database doesn't reject them
      enum: ['pending', 'approved', 'rejected', 'confirmed', 'active', 'completed', 'cancelled'],
      default: 'pending',
    },
    message: { type: String, trim: true, default: '' },
    adminNotes: { type: String, trim: true, default: '' },
  },
  { timestamps: true }
);

bookingSchema.pre('save', function () {
  if (this.endDate <= this.startDate) {
    throw new Error('End date must be after start date');
  }
});

bookingSchema.methods.transitionTo = function (newStatus) {
  const allowed = VALID_TRANSITIONS[this.status];
  if (!allowed.includes(newStatus)) {
    throw new Error(`Cannot transition from "${this.status}" to "${newStatus}". Allowed: ${allowed.join(', ') || 'none (terminal state)'}`);
  }
  this.status = newStatus;
  return this.save();
};

bookingSchema.statics.isCarAvailable = async function (carId, startDate, endDate, excludeBookingId = null) {
  const query = {
    car: carId,
    status: { $in: ['pending', 'approved', 'confirmed', 'active'] },
    $or: [
      { startDate: { $lte: endDate, $gte: startDate } },
      { endDate: { $lte: endDate, $gte: startDate } },
      { startDate: { $lte: startDate }, endDate: { $gte: endDate } },
    ],
  };
  if (excludeBookingId) {
    query._id = { $ne: excludeBookingId };
  }
  const conflictingBooking = await this.findOne(query);
  return !conflictingBooking;
};

bookingSchema.index({ car: 1, status: 1 });
bookingSchema.index({ customer: 1 });
bookingSchema.index({ owner: 1 });
bookingSchema.index({ startDate: 1, endDate: 1 });

module.exports = mongoose.model('Booking', bookingSchema);