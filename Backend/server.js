import express from 'express';
import db from './config/db.js';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';

import authRoutes from './routes/auth.routes.js';
import complaintRoutes from './routes/complaint.routes.js';
import remarkRoutes from './routes/remark.routes.js';
import passwordRoutes from './routes/password.routes.js';
import helpRoutes from './routes/help.routes.js';

import adminRoutes from './routes/admin.routes.js';
import staffImportRoutes from './routes/staffImport.routes.js';

import passwordResetRoutes from './routes/passwordReset.routes.js';


dotenv.config({ path: path.resolve('./.env') });

const app = express();

/* 
   MIDDLEWARES
 */
app.use(cors({
  origin: '*',
  methods: ['GET','POST','PUT','DELETE'],
  allowedHeaders: ['Content-Type','Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads', express.static('uploads'));

/*
   ROUTES
  */

// AUTH
app.use('/api/auth', authRoutes);

// COMPLAINTS
app.use('/api/complaints', complaintRoutes);

// REMARKS
app.use('/api/remarks', remarkRoutes);

// PASSWORD
app.use('/api/password', passwordRoutes);

// FORGOT / RESET PASSWORD
app.use('/api/password', passwordResetRoutes);

// HELP
app.use('/api/help', helpRoutes);

// ADMIN
app.use('/api/admin', adminRoutes);
app.use('/api/admin', staffImportRoutes);

app.get('/', (req, res) => {
  res.send('CRP Backend is running');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
