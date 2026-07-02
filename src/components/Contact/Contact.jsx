import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaMapMarkerAlt, FaPaperPlane, FaGithub, FaLinkedin, FaTwitter, FaCode } from 'react-icons/fa';
import { personalInfo, socialLinks } from '../../data/portfolio.jsx';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState('idle');

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setStatus('sending');
    setTimeout(() => {
      setStatus('sent');
      setFormData({ name: '', email: '', message: '' });
      setErrors({});
      setTimeout(() => setStatus('idle'), 3000);
    }, 1500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error dynamically as user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const socialIcons = { github: <FaGithub />, linkedin: <FaLinkedin />, twitter: <FaTwitter />, leetcode: <FaCode /> };

  return (
    <section id="contact" className="section">
      <div className="container">
        <motion.div className="section-header" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <span className="section-label">Contact</span>
          <h2 className="section-title">Get In Touch</h2>
          <p className="section-subtitle">I'm always open to discussing new opportunities, collaborations, or just having a chat about technology.</p>
        </motion.div>

        <div className={styles.contactGrid}>
          <motion.form className={`glass-card ${styles.formCard}`} onSubmit={handleSubmit} initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
            <div className={styles.formGroup}>
              <label className={styles.label}>Name</label>
              <input 
                type="text" 
                name="name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`} 
                placeholder="Your name" 
                value={formData.name}
                onChange={handleChange}
                required 
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input 
                type="email" 
                name="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`} 
                placeholder="you@example.com" 
                value={formData.email}
                onChange={handleChange}
                required 
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
            <div className={styles.formGroup}>
              <label className={styles.label}>Message</label>
              <textarea 
                name="message"
                className={`${styles.input} ${styles.textarea} ${errors.message ? styles.inputError : ''}`} 
                placeholder="Tell me about your project or idea..." 
                value={formData.message}
                onChange={handleChange}
                required 
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>
            <button type="submit" className={styles.submitBtn} disabled={status !== 'idle'}>
              {status === 'sending' ? 'Sending...' : status === 'sent' ? '✓ Sent!' : <><FaPaperPlane /> Send Message</>}
            </button>
          </motion.form>

          <motion.div className={`glass-card ${styles.infoCard}`} initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay: 0.2 }}>
            <h3>Let's Connect</h3>
            <p className={styles.infoText}>Feel free to reach out through the form or connect with me on social media. I typically respond within 24 hours.</p>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FaEnvelope /></div>
              <div>
                <div className={styles.contactLabel}>Email</div>
                <div className={styles.contactValue}><a href={`mailto:${personalInfo.email}`}>{personalInfo.email}</a></div>
              </div>
            </div>

            <div className={styles.contactItem}>
              <div className={styles.contactIcon}><FaMapMarkerAlt /></div>
              <div>
                <div className={styles.contactLabel}>Location</div>
                <div className={styles.contactValue}>{personalInfo.location}</div>
              </div>
            </div>

            <div className={styles.socialRow}>
              {socialLinks.map((link, i) => (
                <a key={i} href={link.url} className={`${styles.socialLink} ${link.icon === 'leetcode' ? styles.leetcode : ''}`} target="_blank" rel="noopener noreferrer" aria-label={link.name}>
                  {socialIcons[link.icon]}
                </a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
