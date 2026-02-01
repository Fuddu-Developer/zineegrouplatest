# Email Setup with Resend

This project uses [Resend](https://resend.com) to send emails from all form submissions.

## Setup Instructions

### 1. Create a Resend Account

1. Go to [https://resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address

### 2. Get Your API Key

1. Log in to your Resend dashboard
2. Navigate to **API Keys** in the sidebar
3. Click **Create API Key**
4. Give it a name (e.g., "Zineegroup Production")
5. Copy the API key (you'll only see it once!)

### 3. Configure Environment Variables

1. Create a `.env.local` file in the root of your project (if it doesn't exist)
2. Add the following variables:

```env
# Resend API Key
RESEND_API_KEY=re_your_actual_api_key_here

# Email addresses for different forms
PARTNER_EMAIL=info@zineegroup.com
CONTACT_EMAIL=info@zineegroup.com
LOAN_EMAIL=info@zineegroup.com
CIBIL_EMAIL=info@zineegroup.com

# From email address
# For development: use onboarding@resend.dev
# For production: use your verified domain email
FROM_EMAIL=onboarding@resend.dev
```

### 4. Verify Your Domain (For Production)

For production use, you should verify your own domain:

1. In the Resend dashboard, go to **Domains**
2. Click **Add Domain**
3. Enter your domain (e.g., `zineegroup.com`)
4. Add the DNS records provided by Resend to your domain's DNS settings
5. Wait for verification (usually takes a few minutes)
6. Once verified, update `FROM_EMAIL` in `.env.local` to use your domain:
   ```env
   FROM_EMAIL=noreply@zineegroup.com
   ```

### 5. Test the Setup

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Submit a test form on your website
3. Check the Resend dashboard under **Emails** to see if the email was sent
4. Check your inbox at `info@zineegroup.com`

## Free Tier Limits

Resend's free tier includes:
- **100 emails per day**
- **3,000 emails per month**
- Full API access
- Email logs and analytics

This should be sufficient for most small to medium websites. If you need more, check their pricing page.

## Forms Using Email

The following forms now send emails to `info@zineegroup.com`:

1. **Partner Application** (`/become-partner`)
2. **Contact Form** (`/contact`)
3. **CIBIL Score Application** (`/cibil-score`)
4. **Loan Application** (`/apply-for-loan`)

## Troubleshooting

### Emails not sending?

1. **Check your API key**: Make sure `RESEND_API_KEY` is set correctly in `.env.local`
2. **Restart the server**: After adding environment variables, restart your dev server
3. **Check Resend dashboard**: Look for error logs in the Resend dashboard
4. **Verify domain**: For production, make sure your domain is verified
5. **Check spam folder**: Emails might end up in spam initially

### Common Errors

- **"API key is invalid"**: Double-check your API key in `.env.local`
- **"Domain not verified"**: Use `onboarding@resend.dev` for testing, or verify your domain
- **"Rate limit exceeded"**: You've hit the free tier limit (100/day or 3,000/month)

## Support

For more help, visit:
- [Resend Documentation](https://resend.com/docs)
- [Resend Support](https://resend.com/support)
