/**
 * Standalone Admin Credential Updater Script
 * 
 * Usage:
 *   node scripts/updateAdmin.js <email> <password> [name] [role]
 * Or via npm:
 *   npm run update-admin -- <email> <password> [name] [role]
 */

const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const mongoose = require('mongoose');
const Admin = require('../models/Admin');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/najjodam';

async function updateAdmin() {
  const args = process.argv.slice(2);

  if (args.length < 2) {
    console.error('\n❌ ভুল ব্যবহার! (Invalid Usage)');
    console.log('----------------------------------------------------');
    console.log('সঠিক নিয়ম (Syntax):');
    console.log('  npm run update-admin -- <email> <new_password> [name] [role: MASTER_ADMIN|ADMIN]');
    console.log('\nউদাহরণ (Example):');
    console.log('  npm run update-admin -- admin@najjodam.com SecretPass2026 "Master Admin" MASTER_ADMIN');
    console.log('----------------------------------------------------\n');
    process.exit(1);
  }

  const [inputEmail, newPassword, inputName, inputRole] = args;

  const email = inputEmail.toLowerCase().trim();
  const name = inputName ? inputName.trim() : 'Master Admin';
  const role = inputRole && ['MASTER_ADMIN', 'ADMIN'].includes(inputRole.toUpperCase())
    ? inputRole.toUpperCase()
    : 'MASTER_ADMIN';

  // Basic validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    console.error(`\n❌ অবৈধ ইমেইল ফরম্যাট: "${inputEmail}"\n`);
    process.exit(1);
  }

  if (newPassword.length < 6) {
    console.error('\n❌ পাসওয়ার্ড ন্যূনতম ৬ অক্ষরের হতে হবে (Minimum 6 characters required)\n');
    process.exit(1);
  }

  console.log('====================================================');
  console.log('      ন্যায্য দাম (Najjo Dam) - Admin Credential Updater');
  console.log('====================================================');
  console.log(`Connecting to MongoDB...`);

  try {
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 15000
    });
    console.log(' MongoDB connected successfully.');

    let admin = await Admin.findOne({ email });

    if (!admin) {
      admin = await Admin.findOne({ role: 'MASTER_ADMIN' }) || await Admin.findOne();
    }

    if (admin) {
      console.log(`\nবিদ্যমান অ্যাকাউন্ট পাওয়া গেছে: "${admin.email}" (ID: ${admin._id})`);
      admin.name = name;
      admin.username = email.split('@')[0];
      admin.email = email;
      admin.password = newPassword; // Will be hashed automatically by pre-save hook
      admin.role = role;

      await admin.save();

      console.log('\n অ্যাডমিন ক্রিডেনশিয়াল সফলভাবে আপডেট হয়েছে!');
      console.log('----------------------------------------------------');
      console.log(`👤 Name:     ${admin.name}`);
      console.log(`📧 Email:    ${admin.email}`);
      console.log(`🔑 Password: [BCRYPT হাশ করা হয়েছে এবং ডাটাবেসে সেভ হয়েছে]`);
      console.log(`🛡️ Role:     ${admin.role}`);
      console.log('----------------------------------------------------');
    } else {
      console.log('\nকোনো বিদ্যমান অ্যাডমিন পাওয়া যায়নি। নতুন মাস্টার অ্যাডমিন তৈরি হচ্ছে...');
      const newAdmin = new Admin({
        name,
        username: email.split('@')[0],
        email,
        password: newPassword, // Will be hashed automatically by pre-save hook
        role
      });

      await newAdmin.save();

      console.log('\n নতুন অ্যাডমিন অ্যাকাউন্ট তৈরি সফল হয়েছে!');
      console.log('----------------------------------------------------');
      console.log(`👤 Name:     ${newAdmin.name}`);
      console.log(`📧 Email:    ${newAdmin.email}`);
      console.log(`🔑 Password: [BCRYPT হাশ করা হয়েছে এবং ডাটাবেসে সেভ হয়েছে]`);
      console.log(`🛡️ Role:     ${newAdmin.role}`);
      console.log('----------------------------------------------------');
    }

    await mongoose.disconnect();
    console.log('\n MongoDB সংযোগ সমাপ্ত। আপনি এখন /admin/login এ প্রবেশ করতে পারেন।\n');
    process.exit(0);
  } catch (error) {
    console.error('\n❌ অ্যাডমিন আপডেট করতে সমস্যা হয়েছে:', error.message);
    if (mongoose.connection.readyState !== 0) {
      await mongoose.disconnect();
    }
    process.exit(1);
  }
}

updateAdmin();
