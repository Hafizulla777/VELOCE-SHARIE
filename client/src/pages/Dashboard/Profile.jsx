import { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import api from '../../utils/api';
import toast from 'react-hot-toast';
import {
  FaUser,
  FaEnvelope,
  FaPhone,
  FaLock,
  FaSave,
  FaEye,
  FaEyeSlash,
  FaShieldAlt,
} from 'react-icons/fa';
import { fadeUp, staggerContainer, blurReveal } from '../../components/animations/variants';

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [focusedField, setFocusedField] = useState(null);


    const handleProfileUpdate = async (e) => {
    e.preventDefault();
    if (!profileForm.name.trim()) {
      toast.error('Name is required');
      return;
    }
    setLoading(true);
    try {
      const { data } = await api.put('/auth/profile', profileForm);
      
      // BULLETPROOF EXTRACT: Handles any backend format
      const newUser = data?.data?.user || data?.user || data;
      
      // Update the context instantly
      updateUser(newUser);
      
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Profile update error:', error);
      toast.error(error.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };



  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    if (passwordForm.newPassword.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      await api.put('/auth/password', {
        currentPassword: passwordForm.currentPassword,
        newPassword: passwordForm.newPassword,
      });
      toast.success('Password updated successfully');
      setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-4xl">
      {/* Header */}
      <motion.div variants={blurReveal} initial="hidden" animate="visible">
        <h1 className="text-3xl font-black text-white tracking-tight">Profile Settings</h1>
        <p className="text-sm text-white/35 mt-1">Manage your account information and security</p>
      </motion.div>

      <motion.div
        variants={staggerContainer(0.15, 0.1)}
        initial="hidden"
        animate="visible"
        className="space-y-8"
      >
        {/* Profile Info Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg shadow-primary-500/20 flex items-center justify-center">
              <FaUser className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Personal Information</h2>
              <p className="text-xs text-white/35">Update your name, email, and phone number</p>
            </div>
          </div>

          <form onSubmit={handleProfileUpdate} className="space-y-5">
            {/* Avatar Preview */}
            <div className="flex items-center gap-5 pb-6 border-b border-white/5">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-primary-500/20">
                {profileForm.name?.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-bold text-white">{profileForm.name}</p>
                <p className="text-xs text-white/35 uppercase tracking-wider font-semibold mt-0.5">
                  {user?.role === 'owner' ? 'Fleet Owner' : 'Customer'}
                </p>
                <p className="text-xs text-white/25 mt-1">Member since {new Date(user?.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>

            {/* Name */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Full Name</label>
                <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'name' ? 'ring-2 ring-primary-500/30' : ''}`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaUser className="text-sm" /></div>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    onFocus={() => setFocusedField('name')}
                    onBlur={() => setFocusedField(null)}
                    className="input-field pl-11 pr-6 !rounded-xl"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Email Address</label>
                <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'email' ? 'ring-2 ring-primary-500/30' : ''}`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaEnvelope className="text-sm " /></div>
                  <input
                    type="email"
                    value={profileForm.email}
                    onChange={(e) => setProfileForm({ ...profileForm, email: e.target.value })}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className="input-field pl-11 pr-4 !rounded-xl"
                  />
                </div>
              </div>
            </div>

            {/* Phone */}
            <div className="max-w-md space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Phone Number</label>
              <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'phone' ? 'ring-2 ring-primary-500/30' : ''}`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaPhone className="text-sm" /></div>
                <input
                  type="tel"
                  value={profileForm.phone}
                  onChange={(e) => setProfileForm({ ...profileForm, phone: e.target.value })}
                  onFocus={() => setFocusedField('phone')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="+1 (555) 000-0000"
                  className="input-field pl-11 pr-4 !rounded-xl"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="pt-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-primary-500 to-primary-600 text-white font-bold text-xs uppercase tracking-[0.15em] px-8 py-3.5 rounded-xl shadow-lg shadow-primary-500/25 disabled:opacity-60 inline-flex items-center gap-2.5"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaSave className="text-sm" />
                    Save Changes
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>

        {/* Password Card */}
        <motion.div
          variants={fadeUp}
          className="rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent p-8"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg shadow-red-500/20 flex items-center justify-center">
              <FaShieldAlt className="text-white text-sm" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-white">Change Password</h2>
              <p className="text-xs text-white/35">Keep your account secure with a strong password</p>
            </div>
          </div>

          <form onSubmit={handlePasswordUpdate} className="space-y-5">
            {/* Current Password */}
            <div className="max-w-md space-y-2">
              <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Current Password</label>
              <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'currentPass' ? 'ring-2 ring-primary-500/30' : ''}`}>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaLock className="text-sm" /></div>
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={passwordForm.currentPassword}
                  onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                  onFocus={() => setFocusedField('currentPass')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter current password"
                  className="input-field pl-11 pr-12 !rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                >
                  {showCurrentPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-2xl">
              {/* New Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">New Password</label>
                <div className={`relative rounded-xl transition-all duration-300 ${focusedField === 'newPass' ? 'ring-2 ring-primary-500/30' : ''}`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaLock className="text-sm" /></div>
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    onFocus={() => setFocusedField('newPass')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Min 6 characters"
                    className="input-field pl-11 pr-12 !rounded-xl"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/70 transition-colors"
                  >
                    {showNewPassword ? <FaEyeSlash className="text-sm" /> : <FaEye className="text-sm" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <label className="text-[11px] font-bold uppercase tracking-[0.2em] text-white/60">Confirm New Password</label>
                <div className={`relative rounded-xl transition-all duration-300 ${
                  focusedField === 'confirmPass'
                    ? 'ring-2 ring-primary-500/30'
                    : passwordForm.confirmPassword.length > 0 && passwordForm.newPassword !== passwordForm.confirmPassword
                    ? 'ring-2 ring-red-500/30'
                    : passwordForm.confirmPassword.length > 0 && passwordForm.newPassword === passwordForm.confirmPassword
                    ? 'ring-2 ring-green-500/30'
                    : ''
                }`}>
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30"><FaLock className="text-sm" /></div>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    onFocus={() => setFocusedField('confirmPass')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Re-enter new password"
                    className="input-field pl-11 pr-4 !rounded-xl"
                  />
                </div>
              </div>
            </div>

            <div className="pt-3">
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold text-xs uppercase tracking-[0.15em] px-8 py-3.5 rounded-xl shadow-lg shadow-red-500/25 disabled:opacity-60 inline-flex items-center gap-2.5"
              >
                {loading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <FaShieldAlt className="text-sm" />
                    Update Password
                  </>
                )}
              </motion.button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Profile;