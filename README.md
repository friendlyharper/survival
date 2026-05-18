# WildCraft Academy - Survival Training App

A comprehensive survival education platform with tiered access, referral rewards, and interactive learning.

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Initialize database
npx prisma db push

# Seed with sample data
npm run db:seed

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see the app.

## 📋 Features

### 🏕️ Core Functionality
- **Interactive Video Lessons** - Expert-led survival training
- **Downloadable Resources** - Offline guides and checklists
- **Progress Tracking** - Monitor learning advancement
- **Mobile Responsive** - Works on all devices

### 💰 Monetization
- **Free Tier** - Basic survival content
- **Premium Subscription** - Advanced techniques ($14.99/month)
- **Referral Rewards** - Earn premium access through referrals
- **Affiliate Integration** - Curated survival gear recommendations

### 👥 Community Features
- **User Accounts** - Personalized experience
- **Referral System** - 5 referrals = 1 month premium
- **Progress Sharing** - Achievement system
- **Community Forum** - Connect with other survivalists

## 🛠 Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS, Radix UI
- **Database**: Prisma ORM with SQLite (dev) / PostgreSQL (prod)
- **Authentication**: NextAuth.js
- **Payments**: Stripe
- **File Storage**: AWS S3 compatible
- **Deployment**: Vercel (recommended)

## 📊 Content Structure

### Free Content
- Basic fire starting techniques
- Finding and purifying water
- Simple shelter construction
- Basic first aid
- Common edible plant identification

### Premium Content
- Advanced fire methods (bow drill, flint & steel)
- Water procurement in extreme environments
- Advanced shelter techniques
- Hunting and trapping
- GPS-free navigation
- Extreme weather survival
- Urban survival tactics
- Psychological survival

## 🎯 Referral System

- **5 referrals** = 1 month premium access
- **25 referrals** = 6 months premium access
- **100 referrals** = Lifetime premium access
- Social sharing tools included
- Real-time referral tracking

## 📱 Development

### Environment Variables

```env
# Database
DATABASE_URL="file:./dev.db"

# Authentication
NEXTAUTH_SECRET="your-secret"
NEXTAUTH_URL="http://localhost:3000"

# Payments
STRIPE_SECRET_KEY="sk_test_..."
STRIPE_PUBLISHABLE_KEY="pk_test_..."

# File Storage
S3_BUCKET_NAME="survival-app-uploads"
S3_ACCESS_KEY_ID="your-key"
S3_SECRET_ACCESS_KEY="your-secret"
```

### Database Commands

```bash
# Reset database
npx prisma db push --force-reset

# View database
npx prisma studio

# Generate Prisma client
npx prisma generate
```

### Folder Structure

```
/app                 # Next.js app directory
  /api              # API routes
  /auth             # Authentication pages
  /dashboard        # User dashboard
  /lessons          # Lesson pages
  /premium          # Premium features
/components         # Reusable UI components
/lib                # Utilities and configurations
/prisma            # Database schema and migrations
/public            # Static assets
```

## 🚀 Deployment

### Vercel (Recommended)

1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main

### Manual Deployment

```bash
# Build production
npm run build

# Start production server
npm start
```

## 💡 Content Strategy

### Video Content
- 5-15 minute focused lessons
- HD quality with clear audio
- Multiple camera angles for demonstrations
- Downloadable transcripts

### Downloadable Resources
- PDF survival guides
- Printable checklists
- Plant identification cards
- Emergency action plans
- Knot-tying diagrams

### Affiliate Products
- Survival knives and multi-tools
- Fire starting equipment
- Water purification systems
- Emergency food supplies
- First aid kits
- Outdoor gear and clothing
- Survival books and guides

## 🎨 Design System

### Colors
- **Primary Green**: Forest/nature theme
- **Secondary Orange**: Action/emergency
- **Earth Tones**: Brown/tan accents
- **Clean Grays**: Professional layout

### Typography
- **Headers**: Bold, outdoor-inspired
- **Body**: Clean, readable fonts
- **Captions**: Subtle, informative

## 📈 Analytics & Metrics

### Key Performance Indicators
- User registration rate
- Free-to-premium conversion
- Referral program effectiveness
- Lesson completion rates
- Download engagement
- Affiliate click-through rates

### User Journey
1. **Discovery** - Landing page, SEO, social
2. **Engagement** - Free content consumption
3. **Conversion** - Premium upgrade or referrals
4. **Retention** - Continued learning, community
5. **Advocacy** - Referrals and testimonials

## 🔒 Security

- Secure authentication with NextAuth.js
- Input validation and sanitization
- HTTPS enforcement
- Rate limiting on APIs
- Secure file uploads
- Payment data handled by Stripe

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is proprietary. All rights reserved.

## 📞 Support

For questions or support:
- Email: support@wildcraft-academy.com
- Discord: [Community Server](https://discord.gg/survival)
- Documentation: [docs.wildcraft-academy.com](https://docs.wildcraft-academy.com)

---

**Ready to master the wild? Start building your survival skills today!** 🏕️