import React, { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {

  return (
    <div className="bg-gray-50">
      
      <section
        className="bg-center mt-14 flex items-center justify-center text-center px-4"
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <motion.div
          className="relative z-10 text-black max-w-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <h2 className="text-5xl font-bold mb-4">
            The Complete CRM for Multi-Institute Management
          </h2>
          <p className="text-lg mb-6">
            From admissions to analytics — manage your entire education business
            with Sinfode CRM.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <a
              href="/sinfode-admin/login"
              className="px-6 py-3 bg-yellow-500 text-white rounded-lg font-semibold"
            >
              SUPER ADMIN LOGIN
            </a>
            <a
              href="/sinfode-manager/login"
              className="px-6 py-3 bg-green-500 rounded-lg text-white font-semibold"
            >
              BRANCH MANAGER LOGIN
            </a>
            <a
              href="/custom-user/login"
              className="px-6 py-3 bg-indigo-500 rounded-lg text-white font-semibold"
            >
              CUSTOM USER LOGIN
            </a>
          </div>
        </motion.div>
      </section>
      {/* Stats Section */}
     
    </div>
  );
};

export default Home;
