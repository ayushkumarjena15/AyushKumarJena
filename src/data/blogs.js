export const author = {
    name: 'Ayush Kumar Jena',
    bio: 'Computer Science Engineering student with specialization in AI/ML, aspiring Full Stack & MLOps developer based in Sambalpur, Odisha, India.',
    avatar: '/profile.webp',
    social: {
        github: 'https://github.com/ayushkumarjena15',
        linkedin: 'https://linkedin.com/in/ayush-kumar-jena-b19151321/',
        twitter: 'https://x.com/AyushJena1504',
        instagram: 'https://www.instagram.com/ig_ayush099/',
        leetcode: 'https://leetcode.com/u/R57Cb5EtNk/',
    },
};

export const blogs = [
    {
        id: 1,
        slug: 'how-to-show-website-on-google-search-and-bing',
        coverImage: '/blogs/seo-cover.webp',
        title: 'How to Show Your Website on Google Search and Bing After Buying a Domain',
        excerpt: 'Buying a domain is just the first step. Learn the complete process of submitting your website to Google Search Console and Bing Webmaster Tools so search engines can discover and index your site.',
        date: '2026-03-14',
        tags: ['SEO', 'Web Development', 'Beginners'],
        readTime: '6 min read',
        sections: [
            {
                type: 'intro',
                content: 'Buying a domain and launching a website is an exciting step, but many beginners face one common problem: their website does not appear in search engines like Google or Bing. This happens because search engines need to discover and index your website first.\n\nIn this blog, I will explain the complete process of submitting your website to Google Search Console and Bing Webmaster Tools so that your site can appear in search results.',
            },
            {
                type: 'heading',
                content: 'Why Your Website Does Not Appear on Google Immediately',
            },
            {
                type: 'paragraph',
                content: 'After purchasing a domain and publishing a website, search engines do not automatically show it in search results.\n\nSearch engines must:',
            },
            {
                type: 'list',
                items: ['Discover your website', 'Crawl your pages', 'Index the content'],
            },
            {
                type: 'paragraph',
                content: 'This process is called website indexing, and it can take time if you do not submit your website properly.',
            },
            {
                type: 'heading',
                content: 'Step 1: Make Sure Your Website is Live',
            },
            {
                type: 'paragraph',
                content: 'Before submitting your website to search engines, check the following:',
            },
            {
                type: 'list',
                items: [
                    'Your website is publicly accessible',
                    'Your domain is working (example: https://yourdomain.com)',
                    'Your pages load correctly',
                    'Your website has a sitemap',
                ],
            },
            {
                type: 'paragraph',
                content: 'A sitemap helps search engines understand the structure of your website.',
            },
            {
                type: 'code',
                label: 'Example sitemap URL',
                content: 'https://yourdomain.com/sitemap.xml',
            },
            {
                type: 'heading',
                content: 'Step 2: Add Your Website to Google Search Console',
            },
            {
                type: 'paragraph',
                content: 'Google Search Console is a free tool that allows website owners to submit and monitor their websites in Google Search.\n\nSteps to Add Your Website:',
            },
            {
                type: 'list',
                items: [
                    'Visit Google Search Console',
                    'Click Add Property',
                    'Enter your domain name',
                    'Verify ownership of the domain',
                ],
            },
            {
                type: 'paragraph',
                content: 'The most common verification method is DNS verification. You need to add a TXT record in your domain provider (like Hostinger, GoDaddy, etc.).',
            },
            {
                type: 'code',
                label: 'Example DNS record',
                content: 'Type: TXT\nName: @\nValue: google-site-verification=XXXXXXXX',
            },
            {
                type: 'paragraph',
                content: 'After adding it, return to Google Search Console and click Verify.',
            },
            {
                type: 'heading',
                content: 'Step 3: Submit Your Sitemap to Google',
            },
            {
                type: 'paragraph',
                content: 'Once your website is verified, you should submit your sitemap.',
            },
            {
                type: 'list',
                items: [
                    'Go to Sitemaps section',
                    'Enter your sitemap URL',
                    'Click Submit',
                ],
            },
            {
                type: 'code',
                label: 'Sitemap URL',
                content: 'https://yourdomain.com/sitemap.xml',
            },
            {
                type: 'paragraph',
                content: 'Google will now start crawling and indexing your website.',
            },
            {
                type: 'heading',
                content: 'Step 4: Request Indexing for Important Pages',
            },
            {
                type: 'paragraph',
                content: 'If you want Google to index your pages faster, you can manually request indexing.',
            },
            {
                type: 'list',
                items: [
                    'Open URL Inspection Tool',
                    'Enter your website URL',
                    'Click Request Indexing',
                ],
            },
            {
                type: 'paragraph',
                content: 'You can do this for your homepage, blog pages, and other important pages.',
            },
            {
                type: 'heading',
                content: 'Step 5: Add Your Website to Bing Webmaster Tools',
            },
            {
                type: 'paragraph',
                content: 'Bing also has its own platform called Bing Webmaster Tools.',
            },
            {
                type: 'list',
                items: [
                    'Visit Bing Webmaster Tools',
                    'Click Add Site',
                    'Enter your website URL',
                ],
            },
            {
                type: 'paragraph',
                content: 'Bing allows you to import your website directly from Google Search Console, which is the easiest method.',
            },
            {
                type: 'heading',
                content: 'Step 6: Submit Sitemap to Bing',
            },
            {
                type: 'paragraph',
                content: 'After verifying your site, go to Sitemaps, add your sitemap URL, and submit it. Bing will begin indexing your pages.',
            },
            {
                type: 'heading',
                content: 'Step 7: Check Your Website Indexing',
            },
            {
                type: 'paragraph',
                content: 'You can check whether your website is indexed using the following search command:',
            },
            {
                type: 'code',
                label: 'Google search command',
                content: 'site:yourdomain.com',
            },
            {
                type: 'paragraph',
                content: 'If your pages appear in the results, it means Google has indexed your website.',
            },
            {
                type: 'heading',
                content: 'How Long Does Indexing Take?',
            },
            {
                type: 'paragraph',
                content: 'The indexing time varies depending on several factors.',
            },
            {
                type: 'list',
                items: [
                    'Google: 1 day to 2 weeks',
                    'Bing: 2 days to 2 weeks',
                ],
            },
            {
                type: 'paragraph',
                content: 'Submitting your sitemap and requesting indexing can speed up the process.',
            },
            {
                type: 'heading',
                content: 'Tips to Get Indexed Faster',
            },
            {
                type: 'list',
                items: [
                    'Submit a sitemap',
                    'Add proper meta titles and descriptions',
                    'Create quality content or blogs',
                    'Share your website on social media',
                    'Build backlinks',
                ],
            },
            {
                type: 'heading',
                content: 'Conclusion',
            },
            {
                type: 'paragraph',
                content: 'Showing your website on Google and Bing requires a few important steps. By submitting your website to Google Search Console and Bing Webmaster Tools, verifying ownership, and submitting your sitemap, you help search engines discover and index your site faster.\n\nOnce indexed, your website can start appearing in search results and reach more visitors.',
            },
        ],
    },
    {
        id: 2,
        slug: 'how-to-study-dsa-topic-wise-or-pattern-wise',
        coverImage: '/blogs/dsa-cover.webp',
        title: 'How to Study Data Structures and Algorithms (DSA): Topic-Wise or Pattern-Wise?',
        excerpt: 'Many beginners get confused about the best way to study DSA. Should you go topic-wise or pattern-wise? Learn the difference and find the best strategy to master DSA effectively.',
        date: '2026-03-14',
        tags: ['DSA', 'Programming', 'Career'],
        readTime: '5 min read',
        sections: [
            {
                type: 'intro',
                content: 'Data Structures and Algorithms (DSA) are one of the most important subjects for computer science students and developers preparing for technical interviews. Many beginners often get confused about the best way to study DSA: Should you study topic-wise or pattern-wise?\n\nBoth approaches are useful, but choosing the right method at the right time can make your learning process much more effective.',
            },
            {
                type: 'heading',
                content: 'What is Topic-Wise DSA Learning?',
            },
            {
                type: 'paragraph',
                content: 'Topic-wise learning means studying DSA concepts one topic at a time. You first learn the theory, then solve problems related to that topic.',
            },
            {
                type: 'heading',
                content: 'Example Order of Topics',
            },
            {
                type: 'numbered_list',
                items: ['Arrays', 'Strings', 'Linked Lists', 'Stacks and Queues', 'Recursion', 'Trees', 'Graphs', 'Dynamic Programming'],
            },
            {
                type: 'heading',
                content: 'Advantages of Topic-Wise Learning',
            },
            {
                type: 'list',
                items: [
                    'Builds a strong conceptual foundation',
                    'Easy for beginners to understand',
                    'Helps in understanding how data structures work internally',
                ],
            },
            {
                type: 'callout',
                label: 'Best For',
                content: 'Beginners starting DSA, students learning DSA for the first time, and people who want strong fundamentals.',
            },
            {
                type: 'heading',
                content: 'What is Pattern-Wise DSA Learning?',
            },
            {
                type: 'paragraph',
                content: 'Pattern-wise learning focuses on recognizing problem-solving patterns instead of just studying topics. Instead of solving random problems, you learn patterns like:',
            },
            {
                type: 'list',
                items: [
                    'Sliding Window',
                    'Two Pointers',
                    'Binary Search Pattern',
                    'Fast and Slow Pointers',
                    'Backtracking',
                    'Dynamic Programming Patterns',
                ],
            },
            {
                type: 'heading',
                content: 'Advantages of Pattern-Wise Learning',
            },
            {
                type: 'list',
                items: [
                    'Helps solve problems faster in interviews',
                    'Improves problem-solving skills',
                    'Makes it easier to handle medium and hard problems',
                ],
            },
            {
                type: 'callout',
                label: 'Best For',
                content: 'Interview preparation, practicing on platforms like LeetCode, and improving problem-solving speed.',
            },
            {
                type: 'heading',
                content: 'Topic-Wise vs Pattern-Wise: Which One is Better?',
            },
            {
                type: 'paragraph',
                content: 'The best strategy is to **combine both methods**. Topic-wise learning is best for beginners focused on concepts, while pattern-wise learning excels for interview preparation and problem-solving.',
            },
            {
                type: 'heading',
                content: 'Best Strategy to Learn DSA',
            },
            {
                type: 'paragraph',
                content: 'A smart way to study DSA is to follow these steps:',
            },
            {
                type: 'numbered_list',
                items: [
                    '**Learn Concepts Topic-Wise** — Start by understanding the fundamentals of each data structure.',
                    '**Solve Basic Problems** — Practice basic problems related to each topic.',
                    '**Learn Problem Patterns** — After solving many problems, start identifying patterns.',
                    '**Practice Regularly** — Use platforms like LeetCode, HackerRank, and Codeforces.',
                ],
            },
            {
                type: 'callout',
                label: 'Key Insight',
                content: '**Consistency is the key to mastering DSA.** Even 1-2 problems per day adds up significantly over time.',
            },
            {
                type: 'heading',
                content: 'Tips for Learning DSA Effectively',
            },
            {
                type: 'list',
                items: [
                    'Practice daily coding',
                    'Focus on understanding logic instead of memorizing solutions',
                    'Solve problems of increasing difficulty',
                    'Review mistakes and learn from them',
                    'Track your progress',
                ],
            },
            {
                type: 'heading',
                content: 'Conclusion',
            },
            {
                type: 'paragraph',
                content: 'Both topic-wise and pattern-wise approaches are important for mastering Data Structures and Algorithms. Beginners should start with topic-wise learning to build strong fundamentals. After that, pattern-wise practice helps improve problem-solving skills and prepares you for coding interviews.\n\nWith consistent practice and the right learning strategy, anyone can become strong in DSA.',
            },
        ],
    },
];
