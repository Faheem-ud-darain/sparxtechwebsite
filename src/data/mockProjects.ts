import EcomImg from '@/assets/ecommerce-mockup.png';
import SaasImg from '@/assets/saas-mockup.png';
import MobileImg from '@/assets/mobile-mockup.png';

// New specific project assets
import AgencyManagementImg from '@/assets/Agency Management App.webp';
import AlbatrossImg from '@/assets/Albatross Edvisors.png';
import CarWashImg from '@/assets/Car wash App.webp';
import DaehanImg from '@/assets/Daehan Links.png';
import KingdomImg from '@/assets/Kingdom Watch Company.png';
import NMAImg from '@/assets/NMA Watch Guy.webp';
import SparxWebsiteImg from '@/assets/Sparx tech Agency Website.webp';
import GoldOfHimalayaImg from '@/assets/gold of himalaya.png';

export const mockProjects = [
  {
    _id: '1',
    title: 'Tooth Clinic Mansehra - Meta Ads Management & Growth Strategy',
    slug: { current: 'tooth-clinic-mansehra-meta-ads' },
    category: 'Social Media Advertising',
    techStack: ['Meta Ads Manager', 'Facebook Pixel', 'Canva / Photoshop', 'Google Analytics', 'Meta Business Suite'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Tooth Clinic in Mansehra struggled with low patient appointments and minimal online visibility. Despite offering quality dental services, they had no digital marketing strategy to reach potential patients in their local area. Their revenue was stagnant, and they needed a cost-effective way to attract new clients and grow their practice.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies developed and executed a comprehensive Meta Ads campaign targeting local audiences in Mansehra and surrounding areas. We created compelling ad creatives highlighting the clinic\'s services, implemented precise audience targeting based on demographics and location, and continuously optimized campaigns based on performance metrics. Our data-driven approach included A/B testing ad copies, strategic bid management, and conversion tracking to maximize ROI. The results were exceptional - the clinic experienced a 200% increase in monthly revenue within the campaign period, with significantly higher patient bookings and enhanced brand recognition in the local market.' }] }
    ],
    image: EcomImg, // Mock image
    gridClass: 'md:col-span-4 md:row-span-2'
  },
  {
    _id: '2',
    title: 'BERT & RoBERTa Based Fake News Detection Model',
    slug: { current: 'fake-news-detection-ai-model-thesis' },
    category: 'Artificial Intelligence',
    techStack: ['Python', 'BERT & RoBERTa', 'TensorFlow', 'Scikit-learn', 'Pandas & NumPy'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'A UK-based client pursuing their Master\'s degree needed a comprehensive research project on fake news detection using advanced natural language processing techniques. The challenge involved not only building a functional AI model but also producing a complete academic thesis with proper research methodology.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies delivered an end-to-end AI research project combining cutting-edge machine learning models with rigorous academic documentation. We developed a sophisticated fake news detection system leveraging BERT and RoBERTa models, fine-tuned on verified news datasets to achieve high accuracy.' }] }
    ],
    image: SaasImg,
    gridClass: 'md:col-span-2 md:row-span-2'
  },
  {
    _id: '3',
    title: 'Kingdom Watch Company - Social Media Graphics Suite',
    slug: { current: 'kingdom-watch-company-social-graphics' },
    category: 'Graphics Design',
    techStack: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro', 'Figma', 'Adobe After Effects'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Kingdom Watch Company, a luxury watch brand based in the USA, required consistent, high-quality visual content to maintain their premium brand image across multiple social media platforms and YouTube.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies became Kingdom Watch Company\'s dedicated design partner, creating over 200 premium graphics including Instagram posts, Facebook ads, promotional banners, and custom YouTube thumbnails.' }] }
    ],
    image: KingdomImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '4',
    title: 'NMA Watch Guy - Professional E-Commerce Website',
    slug: { current: 'nma-watch-guy-godaddy-website' },
    category: 'Web Development',
    techStack: ['GoDaddy Website Builder', 'Custom CSS/HTML', 'Payment Gateway Integration', 'Google Analytics'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'NMA Watch Guy, a watch retailer based in the USA, needed a professional online presence to showcase their watch collection and facilitate online sales.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies built a fully functional, visually appealing website using GoDaddy Website Builder, optimized for the watch retail business.' }] }
    ],
    image3D: NMAImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '5',
    title: 'Daehan Links Korean Consultancy - Digital Marketing',
    slug: { current: 'daehan-links-social-media-ads-management' },
    category: 'Social Media Management',
    techStack: ['Adobe Premiere Pro', 'Adobe After Effects', 'Meta Ads Manager', 'TikTok Ads Manager'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Daehan Links, a Korean-based consultancy with an office in Islamabad, needed to establish a strong social media presence to attract Pakistani students interested in studying or working in South Korea.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies delivered a 360-degree digital marketing solution for Daehan Links. We produced 16 high-quality reels from concept to completion and managed their entire social media presence.' }] }
    ],
    image: DaehanImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '6',
    title: 'Mufasa Herbal - Premium Reel Production',
    slug: { current: 'mufasa-herbal-reel-production-studio' },
    category: 'Content Creation',
    techStack: ['Professional Camera Equipment', 'Studio Lighting Setup', 'Adobe Premiere Pro', 'DaVinci Resolve'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Mufasa Herbal, an Abbottabad-based herbal products brand, needed professional video content to showcase their natural products and build trust with health-conscious consumers.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies provided a complete production solution for Mufasa Herbal, creating over 20 professionally shot and edited reels. We arranged professional models and set up a dedicated studio space.' }] }
    ],
    image: MobileImg,
    gridClass: 'md:col-span-4 md:row-span-2'
  },
  {
    _id: '7',
    title: 'Gold Of Himalaya - Shopify E-Commerce Store',
    slug: { current: 'gold-of-himalaya-shopify-meta-ads' },
    category: 'E-Commerce Development',
    techStack: ['Shopify Platform', 'Shopify Liquid', 'Meta Ads Manager', 'Facebook Pixel'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Gold Of Himalaya, a Swat-based honey and natural products brand, needed to expand beyond local sales and reach customers nationwide through e-commerce.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies built a fully functional Shopify store for Gold Of Himalaya, featuring custom theme design, product catalog setup, and secure payment gateway integration.' }] }
    ],
    image: GoldOfHimalayaImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '8',
    title: 'MASHI Fashion Studios - WordPress E-Commerce',
    slug: { current: 'mashi-fashion-studios-ecommerce-photography' },
    category: 'Web Development',
    techStack: ['WordPress', 'WooCommerce', 'Professional Photography Equipment', 'Adobe Lightroom'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'MASHI Fashion Studios needed a complete digital transformation - from having no online presence to launching a fully functional e-commerce website with professional product imagery.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'We delivered an all-in-one e-commerce solution, including professional product photography sessions and a custom WordPress website with WooCommerce.' }] }
    ],
    image: SaasImg,
    gridClass: 'md:col-span-2 md:row-span-2'
  },
  {
    _id: '9',
    title: 'WizStrapz Abbottabad - Custom WordPress E-Commerce',
    slug: { current: 'wizstrapz-wordpress-ecommerce-abbottabad' },
    category: 'Web Development',
    techStack: ['WordPress', 'WooCommerce', 'Elementor Page Builder', 'Payment Gateway Integration'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'WizStrapz, an Abbottabad-based accessories brand, needed an affordable yet professional e-commerce website to sell their products online.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies developed a custom WordPress e-commerce website for WizStrapz using WooCommerce as the foundation.' }] }
    ],
    image: EcomImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '10',
    title: 'MHA Real Estate Islamabad - Property Showcase Reel',
    slug: { current: 'mha-real-estate-reel-editing-islamabad' },
    category: 'Video Editing',
    techStack: ['Adobe Premiere Pro', 'CapCut', 'Adobe After Effects', 'DaVinci Resolve'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'MHA Real Estate, based in Islamabad, needed professionally edited video content to showcase their property listings on social media platforms.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies edited 5+ high-quality reels for MHA Real Estate, transforming raw property footage into polished, engaging content optimized for Instagram and Facebook.' }] }
    ],
    image: MobileImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '11',
    title: 'Realty With Ankita India - Real Estate Content',
    slug: { current: 'realty-with-ankita-india-reel-editing' },
    category: 'Video Editing',
    techStack: ['Adobe Premiere Pro', 'CapCut', 'Adobe After Effects', 'Canva'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Ankita from "Realty With Ankita," a real estate professional based in India, required consistent, professional video editing services to maintain her social media presence.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies provided professional reel editing services for Realty With Ankita, handling multiple video projects with quick turnaround times.' }] }
    ],
    image: SaasImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '12',
    title: 'SPARX Hub - Company Internal Management System',
    slug: { current: 'sparx-hub-internal-management-system' },
    category: 'Custom Software Development',
    techStack: ['React.js / Next.js', 'Node.js / Express', 'MongoDB / PostgreSQL', 'Tailwind CSS'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies needed an internal management system to streamline project tracking, team collaboration, client communication, and resource management.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'We developed SPARX Hub, a comprehensive internal management application custom-built for our agency\'s unique needs.' }] }
    ],
    image3D: AgencyManagementImg,
    gridClass: 'md:col-span-4 md:row-span-2'
  },
  {
    _id: '13',
    title: 'Car Wash Pro - Complete Management Application',
    slug: { current: 'car-wash-pro-management-app' },
    category: 'SaaS Application',
    techStack: ['React.js / Next.js', 'Node.js / Express', 'MongoDB', 'Stripe'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Car wash businesses often struggle with managing multiple aspects of their operations. The market needed an affordable, comprehensive management solution.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies developed Car Wash Pro, a comprehensive management application tailored for car wash businesses of all sizes.' }] }
    ],
    image3D: CarWashImg,
    gridClass: 'md:col-span-2 md:row-span-2'
  },
  {
    _id: '14',
    title: 'SPARX Studioz & Technologies - Corporate Website',
    slug: { current: 'sparx-studioz-corporate-website-portfolio' },
    category: 'Web Development',
    techStack: ['React.js / Next.js', 'Tailwind CSS', 'Vercel', 'Figma'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'As a growing IT firm and creative agency, SPARX Studioz & Technologies needed a powerful online presence that would serve multiple purposes: showcase our diverse service portfolio, establish credibility with potential clients, and differentiate our brand.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies built our own corporate website from the ground up, serving as both our digital headquarters and a live demonstration of our web development capabilities.' }] }
    ],
    image3D: SparxWebsiteImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  },
  {
    _id: '15',
    title: 'Albatross Edvisors - Social Media Graphics',
    slug: { current: 'albatross-edvisors-social-media-graphics' },
    category: 'Graphics Design',
    techStack: ['Adobe Photoshop', 'Adobe Illustrator', 'Canva Pro', 'Figma'],
    challenge: [
      { _type: 'block', _key: '1', style: 'normal', children: [{ _type: 'span', text: 'Albatross Edvisors, an educational consultancy based in Abbottabad, needed consistent, professional social media content to celebrate student achievements, company milestones, and special occasions.' }] }
    ],
    solution: [
      { _type: 'block', _key: '2', style: 'normal', children: [{ _type: 'span', text: 'SPARX Studioz & Technologies created over 10 custom social media posts for Albatross Edvisors, each designed to highlight their achievements, celebrations, and key moments.' }] }
    ],
    image: AlbatrossImg,
    gridClass: 'md:col-span-2 md:row-span-1'
  }
];
