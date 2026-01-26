# Bank Application Form Data Access

## Where to Access Form Data

### 1. **Console Logs (Development)**
When a form is submitted, the data is logged to the server console:
- **Location**: Terminal/Console where `npm run dev` is running
- **Format**: JSON object with all form fields
- **Example Output**:
```
Bank loan application received: {
  bankId: 'hdfc',
  bankName: 'HDFC Bank',
  mobileNumber: '9876543210',
  dateOfBirth: '15/05/1990',
  sourceOfIncome: 'salaried',
  loanAmount: '500000',
  tenure: '3',
  tenureUnit: 'Yr',
  ...
}
```

### 2. **API Endpoint**
- **Endpoint**: `/api/bank-application`
- **Method**: POST (to submit) or GET (to retrieve)
- **File**: `app/api/bank-application/route.ts`

#### To Submit Data:
```javascript
POST /api/bank-application
Body: {
  bankId: 'hdfc',
  bankName: 'HDFC Bank',
  mobileNumber: '9876543210',
  day: '15',
  month: '05',
  year: '1990',
  sourceOfIncome: 'salaried',
  loanAmount: '500000',
  tenure: '3',
  tenureUnit: 'Yr',
  consentPersonalData: true,
  consentPersonalizedOffers: true,
  consentPerfios: true
}
```

#### To Retrieve Data:
```javascript
GET /api/bank-application
GET /api/bank-application?bankId=hdfc  // Filter by bank
```

### 3. **Email Notifications** (To Be Configured)
Currently, the email body is prepared but not sent. To enable email notifications:

1. **Set Environment Variable**:
   ```env
   LOAN_EMAIL=your-email@zineegroup.com
   ```

2. **Configure Email Service** (choose one):
   - **Nodemailer** (SMTP)
   - **Resend**
   - **SendGrid**
   - **AWS SES**

3. **Uncomment and configure** the email code in `app/api/bank-application/route.ts`

### 4. **Database Storage** (To Be Implemented)
Currently commented out. To store in database:

1. **Set up database** (PostgreSQL, MySQL, MongoDB, etc.)
2. **Uncomment database code** in `app/api/bank-application/route.ts`
3. **Configure database connection**

Example structure:
```typescript
{
  id: string,
  bankId: string,
  bankName: string,
  mobileNumber: string,
  dateOfBirth: string,
  sourceOfIncome: string,
  loanAmount: number,
  tenure: number,
  tenureUnit: string,
  consentPersonalData: boolean,
  consentPersonalizedOffers: boolean,
  consentPerfios: boolean,
  submittedAt: Date,
  applicationId: string
}
```

### 5. **Frontend Display**
After submission, the data is displayed to the user in the success overlay:
- Mobile Number
- Date of Birth
- Source of Income

## Current Data Flow

1. User fills form → Frontend (`app/apply/[bankId]/page.tsx`)
2. Form submitted → API endpoint (`app/api/bank-application/route.ts`)
3. Data validated → Console log (development)
4. Success response → Frontend shows success message
5. Data displayed → User sees their details in success overlay

## Next Steps to Access Data

### Option 1: Check Console Logs
- Run `npm run dev`
- Submit a form
- Check terminal for logged data

### Option 2: Add Database
- Install database (e.g., Prisma, MongoDB)
- Uncomment database code in API route
- Query database to retrieve applications

### Option 3: Add Email Service
- Configure email service (Resend, SendGrid, etc.)
- Uncomment email code in API route
- Receive email notifications with form data

### Option 4: Create Admin Dashboard
- Create admin page to view all applications
- Use GET endpoint to fetch data
- Display in table format

## Environment Variables Needed

```env
LOAN_EMAIL=info@zineegroup.com
# For email service (if using):
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your-email@example.com
SMTP_PASS=your-password
# OR
RESEND_API_KEY=your-resend-api-key
```
