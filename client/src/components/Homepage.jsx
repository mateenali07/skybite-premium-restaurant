import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChefHat, Clock, Star, TruckIcon, Shield, Heart } from 'lucide-react';

const Homepage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stagger = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const features = [
    {
      icon: React.createElement(ChefHat, { className: "w-8 h-8" }),
      title: "Expert Chefs",
      description: "Our master chefs craft every dish with passion and precision"
    },
    {
      icon: React.createElement(Clock, { className: "w-8 h-8" }),
      title: "Fast Delivery",
      description: "Hot food delivered to your doorstep in 30 minutes or less"
    },
    {
      icon: React.createElement(Star, { className: "w-8 h-8" }),
      title: "Premium Quality",
      description: "Only the finest ingredients for an exceptional dining experience"
    },
    {
      icon: React.createElement(Shield, { className: "w-8 h-8" }),
      title: "Safe & Hygienic",
      description: "Highest standards of food safety and hygiene maintained"
    }
  ];

  const testimonials = [
    {
      name: "Ahmed Khan",
      comment: "Best restaurant app I've ever used! Food is amazing and delivery is super fast.",
      rating: 5,
      avatar: "AK"
    },
    {
      name: "Sara Ali",
      comment: "The quality of food is outstanding. Highly recommend the biryani!",
      rating: 5,
      avatar: "SA"
    },
    {
      name: "Hassan Raza",
      comment: "Love the chatbot feature. Makes ordering so easy!",
      rating: 5,
      avatar: "HR"
    }
  ];

  return (
    <div className="min-h-screen">
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-orange-50 pt-20 pb-32">
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute top-20 -left-20 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              rotate: [360, 180, 0],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear"
            }}
            className="absolute -bottom-20 -right-20 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl opacity-30"
          />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="initial"
              animate="animate"
              variants={stagger}
              className="text-center md:text-left"
            >
              <motion.div variants={fadeInUp} className="inline-block mb-4">
                <span className="bg-orange-100 text-orange-600 px-4 py-2 rounded-full text-sm font-semibold">
                  🎉 Free Delivery on First Order
                </span>
              </motion.div>

              <motion.h1
                variants={fadeInUp}
                className="text-5xl md:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight"
              >
                Delicious Food
                <span className="gradient-text block">Delivered Fast</span>
              </motion.h1>

              <motion.p
                variants={fadeInUp}
                className="text-xl text-gray-600 mb-8 leading-relaxed"
              >
                Experience culinary excellence delivered to your doorstep. 
                Order from our premium menu and enjoy restaurant-quality meals at home.
              </motion.p>

              <motion.div
                variants={fadeInUp}
                className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              >
                <Link to="/menu" className="btn-primary inline-flex items-center justify-center gap-2 group">
                  <span>Order Now</span>
                  <TruckIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link to="/menu" className="btn-secondary inline-flex items-center justify-center gap-2">
                  <span>View Menu</span>
                </Link>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="grid grid-cols-3 gap-6 mt-12 pt-12 border-t border-gray-200"
              >
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-orange-600">5000+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-orange-600">50+</div>
                  <div className="text-sm text-gray-600">Menu Items</div>
                </div>
                <div className="text-center md:text-left">
                  <div className="text-3xl font-bold text-orange-600">4.9★</div>
                  <div className="text-sm text-gray-600">Rating</div>
                </div>
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="relative z-10"
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-orange-400 to-orange-600 rounded-full blur-3xl opacity-30"></div>
                  <img
                    src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=600&h=600&fit=crop"
                    alt="Delicious Food"
                    className="relative rounded-3xl shadow-2xl w-full h-auto"
                  />
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 0.5
                }}
                className="absolute top-10 -left-6 bg-white rounded-2xl shadow-xl p-4 glass"
              >
                <div className="flex items-center gap-2">
                  <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                    <Heart className="w-6 h-6 text-orange-600 fill-orange-600" />
                  </div>
                  <div>
                    <div className="text-sm font-bold text-gray-900">Top Rated</div>
                    <div className="text-xs text-gray-600">5.0 ★★★★★</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="gradient-text">SkyBite</span>
            </h2>
            <p className="text-xl text-gray-600">Experience the difference with our premium service</p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="bg-gradient-to-br from-orange-50 to-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white mx-auto mb-4 shadow-lg">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 to-orange-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Our <span className="gradient-text">Customers Say</span>
            </h2>
            <p className="text-xl text-gray-600">Trusted by thousands of food lovers</p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-14 h-14 bg-gradient-to-br from-orange-400 to-orange-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">{testimonial.name}</div>
                    <div className="text-orange-500">{'★'.repeat(testimonial.rating)}</div>
                  </div>
                </div>
                <p className="text-gray-600 italic">"{testimonial.comment}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Ready to Order?
            </h2>
            <p className="text-xl text-orange-100 mb-8">
              Join thousands of satisfied customers and experience the best food delivery service
            </p>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-white text-orange-600 px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300"
            >
              <span>Browse Menu</span>
              <ChefHat className="w-6 h-6" />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
