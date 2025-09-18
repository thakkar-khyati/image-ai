# 🚀 Replicate API Setup Guide

## ✅ **Integration Complete!**

Your backend is now configured to use **Replicate API** for high-quality AI image generation.

## 🔑 **Step-by-Step: Get Your Replicate API Key**

### **Step 1: Create Replicate Account**
1. **Go to Replicate:**
   - Visit [https://replicate.com](https://replicate.com)
   - Click **"Sign up"** in the top right

2. **Sign up options:**
   - **Email + Password** (recommended)
   - **GitHub** (if you prefer)
   - **Google** (if you prefer)

3. **Verify your email:**
   - Check your email for verification link
   - Click the link to activate your account

### **Step 2: Get Your API Token**
1. **Go to API Tokens page:**
   - Visit [https://replicate.com/account/api-tokens](https://replicate.com/account/api-tokens)
   - Or: Dashboard → Account → API Tokens

2. **Create a new token:**
   - Click **"Create token"**
   - Give it a name: `"Image Generator App"`
   - Click **"Create token"**

3. **Copy your token:**
   - **IMPORTANT:** Copy the token immediately (starts with `r8_`)
   - You won't be able to see it again!
   - Example: `r8_abc123def456ghi789...`

### **Step 3: Add Token to Your App**
1. **Open your .env file:**
   ```bash
   nano backend/.env
   ```

2. **Add your token:**
   ```
   REPLICATE_API_TOKEN=r8_your_actual_token_here
   PORT=5000
   ```

3. **Save the file:**
   - Press `Ctrl + X`
   - Press `Y` to confirm
   - Press `Enter` to save

## 🚀 **Step 4: Test Your App**

1. **Start your backend:**
   ```bash
   cd backend
   node server.js
   ```

2. **Start your frontend:**
   ```bash
   cd frontend
   npm start
   ```

3. **Test in browser:**
   - Open `http://localhost:3000`
   - Enter any prompt (e.g., "a cute cat")
   - Click "Generate Image"

## 📊 **What You Get with Replicate:**

- ✅ **1,000,000 seconds free** per month (~10-20 images/day)
- ✅ **High quality Stable Diffusion XL** images
- ✅ **No credit card required** for free tier
- ✅ **Reliable server-to-server** communication
- ✅ **Professional API** with good documentation

## 🔧 **How It Works:**

1. **User enters prompt** → Frontend sends to backend
2. **Backend creates prediction** → Replicate API
3. **Polling for completion** → Check status every 2 seconds
4. **Download generated image** → Convert to base64
5. **Return to frontend** → Display high-quality image

## ⚠️ **Important Notes:**

- **Free tier limits:** 1,000,000 seconds compute per month
- **Image generation time:** 30-60 seconds per image
- **Token security:** Keep your token secret, don't share it
- **Rate limits:** Be respectful of API limits

## 🎯 **Ready to Generate Images!**

Your app is now ready for **real AI image generation**! Just add your Replicate token and start creating amazing images! 🎨✨

## 🆘 **Need Help?**

If you encounter any issues:
1. **Check your token** is correct in `.env`
2. **Restart your server** after adding the token
3. **Check the console** for error messages
4. **Verify your Replicate account** is active

**Happy image generating!** 🚀
