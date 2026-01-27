# GA4 AI Referral Tracking Setup Guide

## Overview
This guide helps you track referral traffic from AI platforms (ChatGPT, Perplexity, Gemini, Claude, etc.) in Google Analytics 4.

## Why This Matters
By 2028, Gartner predicts 50%+ of search traffic will shift to AI platforms. Tracking AI referrals helps you:
- Measure AI optimization ROI
- Identify which AI platforms drive traffic
- Compare AI vs traditional search performance
- Track AI-driven conversions

## Setup Steps

### 1. Create AI Source Filter

**Navigate to:** Reports → Acquisition → Traffic acquisition

**Steps:**
1. Click "Add comparison" button
2. Select dimension: "Session source / medium"
3. Choose condition: "contains (regex)"
4. Enter this regex pattern:
   ```
   (chatgpt|openai|perplexity|gemini|bard|claude|you\.com|andi|phind|deepseek)
   ```
5. Name the comparison: "AI Referrals"
6. Click "Apply"

### 2. Create Custom Dimension for AI Source

**Navigate to:** Admin → Data display → Custom definitions → Create custom dimension

**Settings:**
- Dimension name: `AI Source`
- Scope: `Event`
- Event parameter: `page_referrer` or `session_source`
- Description: "Tracks referral source from AI platforms"

**Click:** Create

### 3. Expected AI Referral Sources

Monitor these domains in your traffic reports:
- `chat.openai.com` or `chatgpt.com` (ChatGPT)
- `perplexity.ai` (Perplexity)
- `gemini.google.com` (Google Gemini)
- `claude.ai` (Anthropic Claude)
- `you.com` (You.com)
- `andisearch.com` (Andi Search)
- `phind.com` (Phind)
- `deepseek.com` (DeepSeek)

### 4. Key Metrics to Track

Create a custom report or dashboard tracking:
- **Sessions from AI platforms** - Total traffic volume
- **Bounce rate from AI referrals** - Engagement quality
- **Conversion rate from AI traffic** - Business impact
- **Pages per AI session** - Content engagement
- **Goal completions** - Contact forms, phone calls
- **Average session duration** - Time spent

### 5. Create Monthly Scorecard

Track these KPIs monthly:

| Metric | Current | Last Month | % Change |
|--------|---------|------------|----------|
| AI Referral Sessions | | | |
| AI Conversion Rate | | | |
| Top AI Source | | | |
| AI vs Search Ratio | | | |

### 6. Set Up Alerts

**Navigate to:** Admin → Property → Alerts

Create alert for:
- **Name:** "AI Traffic Spike"
- **Condition:** AI referral sessions increase by 50%+ week-over-week
- **Recipients:** Your email

### 7. Verification

To verify tracking is working:

1. Visit your site from an AI platform
2. Wait 24-48 hours for data processing
3. Check: Reports → Acquisition → Traffic acquisition
4. Look for your AI source domains in the referral list

## Troubleshooting

**Not seeing AI traffic?**
- Wait 48 hours after setup
- Verify GA4 tag is properly installed
- Check that AI bots can access your site (robots.txt)
- Test manually by clicking link from ChatGPT

**Traffic showing as "direct" instead of AI referral?**
- Some AI platforms may not pass referrer headers
- This is expected for privacy-focused AI tools
- Focus on the sources that do provide referrers

## Advanced: Custom Exploration

**Navigate to:** Explore → Create new exploration

**Template:** Free form

**Add:**
- Dimension: Session source
- Dimension: Landing page
- Metric: Sessions
- Metric: Conversions
- Filter: Session source contains "chatgpt|perplexity|gemini|claude"

**Use this to:**
- Identify which pages AI users visit most
- Understand AI user journey
- Optimize high-traffic AI landing pages

## Monthly Reporting Checklist

- [ ] Review AI referral sessions (month-over-month growth)
- [ ] Check AI conversion rate vs overall site
- [ ] Identify top-performing AI source
- [ ] Compare AI traffic to traditional search
- [ ] Document AI-driven revenue/leads
- [ ] Update AI visibility testing results (from plan's testing checklist)

## Next Steps

After GA4 is configured:
1. Run monthly AI visibility tests (see main SEO plan)
2. Query ChatGPT, Perplexity, etc. with business-related questions
3. Track if Buratina Bar appears in AI responses
4. Correlate AI mentions with referral traffic spikes

## Resources

- [GA4 Custom Dimensions Guide](https://support.google.com/analytics/answer/10075209)
- [GA4 Acquisition Reports](https://support.google.com/analytics/answer/9212670)
- [Regex Pattern Testing](https://regex101.com/)

---

**Setup Status:** 
- [ ] AI Source Filter created
- [ ] Custom Dimension configured
- [ ] Monthly scorecard template created
- [ ] Alerts configured
- [ ] Verification complete

**Configured by:** _____________
**Date:** _____________
