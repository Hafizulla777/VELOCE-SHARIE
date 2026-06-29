import Car from '../models/Car.js';

// ── GET ALL CARS (Public) ──
export const getCars = async (req, res) => {
  try {
    const { category, brand, search, minPrice, maxPrice, sort } = req.query;

    let query = {
      $or: [{ isAvailable: true }, { isAvailable: { $exists: false } }],
    };

    if (category && category !== 'All') {
      query.$or = [
        { category },
        { type: category },
        { category: { $exists: false }, type: category },
      ];
    }

    if (brand) {
      query.brand = { $regex: brand, $options: 'i' };
    }

    if (search) {
      query.$and = [
        query,
        {
          $or: [
            { brand: { $regex: search, $options: 'i' } },
            { model: { $regex: search, $options: 'i' } },
            { name: { $regex: search, $options: 'i' } },
            { location: { $regex: search, $options: 'i' } },
          ],
        },
      ];
    }

    if (minPrice || maxPrice) {
      query.$or = query.$or || [{ isAvailable: true }, { isAvailable: { $exists: false } }];
      let priceQuery = {};
      if (minPrice) priceQuery.$gte = Number(minPrice);
      if (maxPrice) priceQuery.$lte = Number(maxPrice);
      
      query.$and = query.$and || [];
      query.$and.push({
        $or: [
          { pricePerDay: priceQuery },
          { price: priceQuery },
        ],
      });
    }

    let sortOption = { createdAt: -1 };
    if (sort === 'price_low') sortOption = { pricePerDay: 1, price: 1 };
    if (sort === 'price_high') sortOption = { pricePerDay: -1, price: -1 };
    if (sort === 'newest') sortOption = { year: -1 };

    const cars = await Car.find(query).sort(sortOption).populate('owner', 'name phone');
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching cars' });
  }
};

// ── GET SINGLE CAR (Public) ──
export const getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id).populate('owner', 'name phone avatar');
    if (!car) {
      return res.status(404).json({ success: false, message: 'Car not found' });
    }
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching car' });
  }
};

// ── CREATE CAR (Owner Only) ──
export const createCar = async (req, res) => {
  try {
    req.body.owner = req.user._id;
    const car = await Car.create(req.body);
    res.status(201).json({ success: true, data: car });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((e) => e.message);
      return res.status(400).json({ success: false, message: messages.join(', ') });
    }
    res.status(500).json({ success: false, message: 'Server error creating car' });
  }
};

// ── GET OWNER'S CARS ──
export const getMyCars = async (req, res) => {
  try {
    const cars = await Car.find({ owner: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: cars.length, data: cars });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error fetching your cars' });
  }
};

// ── UPDATE CAR (Owner Only) ──
export const updateCar = async (req, res) => {
  try {
    let car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found' });
    
    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to update this car' });
    }

    car = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: car });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error updating car' });
  }
};

// ── DELETE CAR (Owner Only) ──
export const deleteCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) return res.status(404).json({ success: false, message: 'Car not found' });

    if (car.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: 'Not authorized to delete this car' });
    }

    await car.deleteOne();
    res.status(200).json({ success: true, message: 'Car deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error deleting car' });
  }
};