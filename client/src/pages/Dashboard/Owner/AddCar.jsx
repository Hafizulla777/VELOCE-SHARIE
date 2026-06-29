import { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiUploadCloud, FiDollarSign, FiMapPin, FiTruck } from 'react-icons/fi';
import api from '../../../utils/api';
import { fadeUp, staggerContainer } from '../../../components/animations/variants';

const categories = ['Sports', 'SUV', 'Sedan', 'Coupe', 'Convertible', 'Luxury'];
const fuelTypes = ['Petrol', 'Diesel', 'Electric', 'Hybrid'];
const transmissions = ['Automatic', 'Manual'];

const AddCar = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [imageInput, setImageInput] = useState('');
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: new Date().getFullYear(),
    category: 'Sports',
    pricePerDay: '',
    location: '',
    images: [],
    specs: { fuel: 'Petrol', transmission: 'Automatic', seats: 4, mileage: '' },
    features: [],
    description: ''
  });

  const { specs } = formData;

  const onChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSpecChange = (e) => setFormData({ ...formData, specs: { ...specs, [e.target.name]: e.target.value } });

  const handleAddImage = (e) => {
    e.preventDefault();
    if (imageInput.trim() && formData.images.length < 5) {
      setFormData({ ...formData, images: [...formData.images, imageInput.trim()] });
      setImageInput('');
    } else if (formData.images.length >= 5) {
      toast.error('Maximum 5 images allowed');
    }
  };

  const removeImage = (index) => {
    setFormData({ ...formData, images: formData.images.filter((_, i) => i !== index) });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length === 0) return toast.error('Please add at least one image');
    setLoading(true);
    try {
      await api.post('/cars', formData);
      toast.success('Vehicle listed successfully!');
      navigate('/dashboard/owner/my-fleet');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to list vehicle');
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div initial="hidden" animate="visible" variants={staggerContainer(0.1)} className="p-6 lg:p-8 max-w-5xl mx-auto">
      <motion.h1 variants={fadeUp} className="text-3xl font-display font-bold text-white mb-2">
        List a New Vehicle
      </motion.h1>
      <motion.p variants={fadeUp} className="text-gray-400 mb-8">
        Add your premium vehicle to the Veloce Share fleet.
      </motion.p>

      <form onSubmit={onSubmit} className="space-y-8">
        
        {/* Image Upload Section */}
        <motion.div variants={fadeUp} className="glass-card p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
            <FiUploadCloud className="text-primary-500" /> Gallery
          </h2>
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              placeholder="Enter Image URL (Cloudinary, Imgur, etc.)"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              className="input-field flex-1"
            />
            <button type="button" onClick={handleAddImage} className="btn-primary px-6 rounded-xl font-semibold">
              Add
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {formData.images.map((img, index) => (
              <div key={index} className="relative group aspect-video rounded-xl overflow-hidden border border-white/10">
                <img src={img} alt="Car" className="w-full h-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 bg-red-600 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Remove
                </button>
              </div>
            ))}
            {formData.images.length < 5 && (
              <div className="aspect-video border-2 border-dashed border-white/10 rounded-xl flex items-center justify-center text-gray-500">
                {formData.images.length}/5
              </div>
            )}
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Basic Info */}
          <motion.div variants={fadeUp} className="glass-card p-6 rounded-2xl space-y-4">
            <h2 className="text-xl font-semibold text-white mb-2">Identity</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Brand *</label>
                <input type="text" name="brand" value={formData.brand} onChange={onChange} required className="input-field" placeholder="e.g., Porsche" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Model *</label>
                <input type="text" name="model" value={formData.model} onChange={onChange} required className="input-field" placeholder="e.g., 911 Turbo S" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Year *</label>
                <input type="number" name="year" value={formData.year} onChange={onChange} required className="input-field" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Category *</label>
                <select name="category" value={formData.category} onChange={onChange} required className="input-field bg-dark-200">
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Description *</label>
              <textarea name="description" value={formData.description} onChange={onChange} required rows={4} className="input-field resize-none" placeholder="Describe the experience of driving this vehicle..."></textarea>
            </div>
          </motion.div>

          {/* Specs & Pricing */}
          <motion.div variants={fadeUp} className="space-y-8">
            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <FiDollarSign className="text-primary-500" /> Pricing & Location
              </h2>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Price Per Day (USD) *</label>
                <input type="number" name="pricePerDay" value={formData.pricePerDay} onChange={onChange} required className="input-field" placeholder="500" />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1 flex items-center gap-2"><FiMapPin /> Pickup Location *</label>
                <input type="text" name="location" value={formData.location} onChange={onChange} required className="input-field" placeholder="Beverly Hills, CA" />
              </div>
            </div>

            <div className="glass-card p-6 rounded-2xl space-y-4">
              <h2 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                <FiTruck className="text-primary-500" /> Specifications
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Fuel</label>
                  <select name="fuel" value={specs.fuel} onChange={onSpecChange} className="input-field bg-dark-200">
                    {fuelTypes.map(f => <option key={f} value={f}>{f}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Transmission</label>
                  <select name="transmission" value={specs.transmission} onChange={onSpecChange} className="input-field bg-dark-200">
                    {transmissions.map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Seats</label>
                  <input type="number" name="seats" value={specs.seats} onChange={onSpecChange} className="input-field" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Mileage (km)</label>
                  <input type="number" name="mileage" value={specs.mileage} onChange={onSpecChange} className="input-field" placeholder="12000" />
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div variants={fadeUp} className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary px-10 py-4 rounded-xl text-lg font-bold tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Listing Vehicle...' : 'Publish Listing'}
          </button>
        </motion.div>
      </form>
    </motion.div>
  );
};

export default AddCar;