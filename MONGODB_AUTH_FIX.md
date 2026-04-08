# 🔑 MongoDB Authentication Issue - Quick Fix

## ⚠️ Current Status
Backend is trying to connect to MongoDB Atlas, but authentication is failing.

## 🔍 The Issue

Your connection string has a placeholder:
```
mongodb+srv://saurabh_db:<db_password>@cluster0.d21wjed.mongodb.net/?appName=Cluster0
```

The `<db_password>` part needs to be replaced with your **actual MongoDB password**.

## ✅ How to Fix

### Step 1: Get Your MongoDB Password
1. Go to: https://cloud.mongodb.com
2. Login with your account
3. Click on "Database Users" (left menu)
4. Find user "saurabh_db"
5. Copy or reset the password

### Step 2: Update the Connection String
Replace `<db_password>` with your actual password. 

**Example:**
```
If your password is: MySecurePass123
Then the full URI becomes:

mongodb+srv://saurabh_db:MySecurePass123@cluster0.d21wjed.mongodb.net/?appName=Cluster0
```

### Step 3: Update backend/.env
Open file: `backend/.env`

Find this line:
```
MONGODB_URI=mongodb+srv://saurabh_db:<db_password>@cluster0.d21wjed.mongodb.net/?appName=Cluster0
```

Replace `<db_password>` with your actual password:
```
MONGODB_URI=mongodb+srv://saurabh_db:YOUR_ACTUAL_PASSWORD@cluster0.d21wjed.mongodb.net/?appName=Cluster0
```

### Step 4: Backend Auto-Restarts
Once you save the file, the backend will auto-restart and connect!

---

## ⚠️ Security Note
- Never commit this file with real password to GitHub
- Use environment variables in production
- Consider resetting password after development

## 🆘 If You Don't Know Your Password

### Option A: Reset It
1. Go to MongoDB Atlas > Database Users
2. Click the user "saurabh_db"
3. Click "Edit" > "Update Password"
4. Set a new password
5. Use that new password in the connection string

### Option B: Create New User
1. Go to MongoDB Atlas > Database Users
2. Click "+ Add New Database User"
3. Set username and password
4. Use the new credentials

---

## ✅ Once Fixed
Backend will show:
```
✅ Connected to MongoDB
Server running on port 5000
```

Then you can use the platform!

---

**Need help? Let me know your MongoDB password and I'll update it for you! 🔐**
