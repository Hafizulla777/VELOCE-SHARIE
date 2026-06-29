import React, { useState } from 'react';
import { FaCheck, FaExclamationCircle, FaSpinner, FaPaperPlane, FaLock } from 'react-icons/fa';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Please select a subject';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message cannot be empty';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log('📧 Form submitted:', formData);
      
      setSubmitSuccess(true);
      
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: ''
        });
        setSubmitSuccess(false);
      }, 3000);

    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const subjects = [
    'General Inquiry',
    'Booking Question',
    'Fleet Partnership',
    'Press & Media',
    'Careers',
    'Other'
  ];

  return (
    <div className="bg-gradient-to-br from-[#141414] to-[#1a1a1a] border border-[rgba(212,175,55,0.15)] rounded-xl p-8 md:p-10">
      
      <div className="mb-8">
        <h2 className="font-playfair text-3xl font-bold text-white mb-2">
          Send Us a Message
        </h2>
        <p className="text-gray-400 text-sm">
          Fill out the form below and we'll get back to you within 24 hours.
        </p>
      </div>

      {submitSuccess ? (
        <div className="text-center py-12">
          <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheck className="text-green-400 text-4xl animate-bounce" />
          </div>
          <h3 className="font-playfair text-2xl font-bold text-white mb-3">
            Message Sent Successfully! 🎉
          </h3>
          <p className="text-gray-400">
            Thank you for contacting us. We'll respond within 24 hours.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Full Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className={`w-full bg-[#0a0a0a] border ${
                  errors.name ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors`}
              />
              {errors.name && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.name}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Email Address *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className={`w-full bg-[#0a0a0a] border ${
                  errors.email ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors`}
              />
              {errors.email && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.email}
                </p>
              )}
            </div>

          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+1 (555) 123-4567"
                className={`w-full bg-[#0a0a0a] border ${
                  errors.phone ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors`}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Subject *
              </label>
              <select
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                className={`w-full bg-[#0a0a0a] border ${
                  errors.subject ? 'border-red-500' : 'border-gray-700'
                } rounded-lg px-4 py-3 text-white focus:outline-none focus:border-[#d4af37] transition-colors appearance-none cursor-pointer`}
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%23999'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 12px center',
                  backgroundSize: '16px'
                }}
              >
                <option value="">Select a subject...</option>
                {subjects.map(subject => (
                  <option key={subject} value={subject}>{subject}</option>
                ))}
              </select>
              {errors.subject && (
                <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                  <FaExclamationCircle /> {errors.subject}
                </p>
              )}
            </div>

          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-2">
              Your Message *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows="5"
              placeholder="Tell us how we can help you..."
              className={`w-full bg-[#0a0a0a] border ${
                errors.message ? 'border-red-500' : 'border-gray-700'
              } rounded-lg px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] transition-colors resize-none`}
            ></textarea>
            {errors.message && (
              <p className="text-red-400 text-xs mt-1 flex items-center gap-1">
                <FaExclamationCircle /> {errors.message}
              </p>
            )}
            <p className="text-xs text-gray-500 mt-1">{formData.message.length}/500 characters</p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-4 rounded-lg font-bold text-base flex items-center justify-center gap-2 transition-all duration-300 ${
              isSubmitting
                ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#d4af37] to-[#c9a227] text-[#0a0a0a] hover:shadow-lg hover:shadow-[#d4af37]/30 hover:-translate-y-0.5'
            }`}
          >
            {isSubmitting ? (
              <>
                <FaSpinner className="animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <FaPaperPlane />
                Send Message
              </>
            )}
          </button>

          <p className="text-xs text-gray-500 text-center">
            <FaLock className="mr-1 inline" />
            Your information is secure and will never be shared with third parties.
          </p>

        </form>
      )}

    </div>
  );
};

export default ContactForm;