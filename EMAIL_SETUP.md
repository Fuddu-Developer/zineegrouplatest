# Email Setup Instructions

## Quick Setup to Send Emails to yamraj26yam@gmail.com

The form data will be sent to **yamraj26yam@gmail.com** when applications are submitted.

### Option 1: Using Resend (Recommended - Free Tier Available)

1. **Sign up for Resend** (free tier available):
   - Go to https://resend.com
   - Sign up for a free account
   - Get your API key from https://resend.com/api-keys

2. **Create `.env` file** in the root directory:
   ```env
   LOAN_EMAIL=yamraj26yam@gmail.com
   RESEND_API_KEY=re_your_api_key_here
   RESEND_FROM_EMAIL=onboarding@resend.dev
   ```

3. **Verify your domain** (optional but recommended):
   - In Resend dashboard, add and verify your domain
   - Update `RESEND_FROM_EMAIL` to use your verified domain

4. **Restart your dev server**:
   ```bash
   npm run dev
   ```

### Option 2: Using Gmail SMTP (Alternative)

1. **Enable 2-Factor Authentication** on your Gmail account

2. **Generate App Password**:
   - Go to Google Account → Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"

3. **Create `.env` file**:
   ```env
   LOAN_EMAIL=yamraj26yam@gmail.com
   SMTP_HOST=smtp.gmail.com
   SMTP_PORT=587
   SMTP_USER=your-email@gmail.com
   SMTP_PASS=your-app-password
   SMTP_FROM=noreply@zineegroup.com
   ```

4. **Install nodemailer**:
   ```bash
   npm install nodemailer
   npm install --save-dev @types/nodemailer
   ```

5. **Update the API route** to use nodemailer instead of Resend

### Current Status

✅ **Email recipient configured**: yamraj26yam@gmail.com  
✅ **Resend package installed**  
⚠️ **API key needed**: Set `RESEND_API_KEY` in `.env` file to enable sending

### Testing

1. Fill out the bank application form
2. Submit the form
3. Check your email at **yamraj26yam@gmail.com**
4. Also check the server console for logged email details

### Email Content

The email will include:
- Bank Information (Bank name, Bank ID)
- Personal Information (Mobile, DOB, Income source)
- Loan Details (Amount, Tenure)
- Consent information
- Submission timestamp

### Troubleshooting

- **Emails not sending?** Check that `RESEND_API_KEY` is set in `.env`
- **Check console logs** - email details are logged even if sending fails
- **Verify API key** is correct in Resend dashboard
- **Check spam folder** if emails don't arrive
