# O$P$
![image](https://github.com/user-attachments/assets/7eac31ac-44ec-44bc-a39b-b6288bc3e74e)
https://owe-money-pay-money.vercel.app/
## Overview
O$P$ is a web application designed to help you easily split shared costs from a receipt among multiple people. Whether you're splitting a dinner bill, groceries, or even a group outing, this tool ensures that each person only pays for their fair share.

No more awkward moments trying to figure out who owes what. Just upload your receipt, and the app will do the math for you. Perfect for group meals, outings, and any situation where you’re trying to divide costs between friends, family, or coworkers.

## Features
Easy Receipt Upload: Simply upload an image of your receipt, and the app will automatically extract the items.

Easy Item Add: Simply add a name, quantity, and price amount

Split by Items: Users can manually tag shared items to themselves by passing the phone around.

Automatic Calculation: The app calculates how much each person owes or how much they need to pay to the Payer.

Simple & Intuitive Interface: No complicated forms or difficult navigation. Everything is easy to access and use.

How It Works
1. Upload Receipt/Add Items
Upload a photo of your receipt. The app will automatically read the receipt to extract the itemized list of purchases or you can manually add them

2. Add People
Add the individuals who are part of the shared bill. You can either simply enter their names

3. Split the Bill
By Item: Assign individual items to specific people. The app will calculate their share of the cost.

4. Get the Final Summary
Once the calculations are done, you’ll receive a final summary, detailing each person’s contribution and balance.

Tech Stack
Frontend: Next.js/React.js

OCR: Gemini for receipt scanning

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
