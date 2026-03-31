import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

const resources = {
  en: {
    translation: {
      nav: {
        home: 'Home',
        projects: 'Projects',
        forSale: 'For Sale',
        investment: 'Investment',
        about: 'About',
        services: 'Services',
        contact: 'Contact',
        admin: 'Admin',
        logout: 'Logout'
      },
      hero: {
        title: 'Building Excellence,',
        subtitle: 'Defining Luxury.',
        companyNameFirst: 'Three Brothers',
        companyNameSecond: 'Construction',
        description: 'Three Brothers Construction delivers premium residential and commercial projects with unmatched craftsmanship and attention to detail.',
        viewProjects: 'View Projects',
        contactUs: 'Contact Us'
      },
      services: {
        title: 'Our Services',
        residential: {
          title: 'Residential Construction',
          desc: 'Bespoke luxury homes tailored to your lifestyle and vision.'
        },
        commercial: {
          title: 'Commercial Development',
          desc: 'High-end commercial spaces designed for modern business needs.'
        },
        renovation: {
          title: 'Premium Renovation',
          desc: 'Transforming existing spaces into modern masterpieces.'
        }
      },
      projects: {
        title: 'Our Masterpieces',
        description: 'A showcase of our finest construction and remodeling projects, where craftsmanship meets innovation.'
      },
      forSale: {
        title: 'Luxury Properties',
        filters: {
          all: 'All',
          newBuild: 'New Build',
          historic: 'Historic',
          investment: 'Investment'
        }
      },
      investment: {
        title: 'Exclusive Investment Opportunities',
        description: 'We offer unique investment opportunities in high-growth construction projects. From ground-up developments to historic upgrades, our model ensures maximum value creation.',
        highlights: [
          'Ground-up residential developments',
          'Historic property restoration & resale',
          'Multi-unit remodeling projects',
          'Commercial to residential conversions'
        ],
        cta: 'Request Investment Prospectus',
        roiLabel: 'Average Annual ROI'
      },
      about: {
        title: 'Our Legacy',
        subtitle: 'The team behind the hardhats',
        description: 'Founded on the principles of integrity, quality, and innovation, Three Brothers Construction has been a leader in the industry for over two decades. We believe that every building tells a story, and we are here to help you write yours.',
        vision: {
          title: 'Quality IS WHAT WE LIVE FOR',
          description: 'Our vision is to redefine the construction landscape through unmatched craftsmanship and a commitment to excellence that stands the test of time.'
        },
        whatWeDo: {
          title: 'WHAT WE DO',
          items: [
            { title: 'Design Build', desc: 'From initial concept to final completion, we handle every aspect of the design and construction process.' },
            { title: 'Logistics Planning', desc: 'Meticulous planning and scope management to ensure projects are delivered on time and within budget.' },
            { title: 'Quality Control', desc: 'Rigorous supervision and quality control management at every stage of construction.' }
          ]
        },
        advantage: {
          title: 'THE THREE BROTHERS ADVANTAGE',
          items: [
            { title: 'RESULTS', desc: 'We are driven by outcomes that exceed expectations.' },
            { title: 'CREATIVITY', desc: 'Innovative solutions for complex construction challenges.' },
            { title: 'TRANSPARENCY', desc: 'Open communication and honest reporting throughout the project.' }
          ]
        },
        cta: {
          title: 'Let’s start something great',
          button: 'Get Started'
        },
        stats: {
          years: 'Years Experience',
          projects: 'Projects Completed',
          awards: 'Awards Won',
          clients: 'Happy Clients'
        }
      },
      contact: {
        title: 'Let\'s Build Together',
        description: 'Ready to start your next project? Our team is here to guide you through every step of the process.',
        emailUs: 'Email Us',
        visitUs: 'Visit Our Office',
        phone: 'Call Us',
        website: 'Visit Website',
        address: 'Al-Tawam, Gaza, Palestine',
        email: 'raafatmohsen@gmail.com',
        phoneNumber: '+970 597 420 202',
        websiteUrl: 'http://3brothers.company',
        form: {
          title: 'Get in Touch',
          subtitle: 'Have a project in mind or interested in a property? Send us a message and we\'ll bring your vision to life.',
          name: 'Full Name',
          email: 'Email Address',
          message: 'Message',
          placeholderName: 'John Doe',
          placeholderEmail: 'raafatmohsen@gmail.com',
          placeholderMessage: 'Tell us about your project...',
          send: 'Send Message',
          success: 'Message sent successfully! We\'ll get back to you soon.',
          error: 'Something went wrong. Please try again later.'
        }
      },
      footer: {
        description: 'Three Brothers Construction is a leading luxury construction firm dedicated to building excellence and defining modern living.',
        quickLinks: 'Quick Links',
        services: 'Services',
        contact: 'Contact',
        rights: 'Three Brothers Construction Company - Mohsen Al-Khazandar & Sons. All rights reserved.'
      },
      common: {
        viewDetails: 'View Details',
        makeOffer: 'Make an Offer',
        requestCustomization: 'Request Customization',
        beds: 'Beds',
        baths: 'Baths',
        built: 'Built',
        yearBuilt: 'Built',
        price: 'Price',
        location: 'Location',
        description: 'Property Description',
        propertyDescription: 'This exceptional property represents the pinnacle of Three Brothers Construction\'s commitment to quality and design. Featuring premium finishes, modern amenities, and thoughtful layouts, it\'s ready for its new owners to move in and enjoy.'
      }
    }
  },
  ar: {
    translation: {
      nav: {
        home: 'الرئيسية',
        projects: 'المشاريع',
        forSale: 'للبيع',
        investment: 'الاستثمار',
        about: 'عن الشركة',
        services: 'الخدمات',
        contact: 'اتصل بنا',
        admin: 'لوحة التحكم',
        logout: 'تسجيل الخروج'
      },
      hero: {
        title: 'بناء التميز،',
        subtitle: 'تعريف الفخامة.',
        companyNameFirst: 'شركة الأخوة',
        companyNameSecond: 'الثلاثة',
        description: 'تقدم شركة الأخوة الثلاثة للمقاولات مشاريع سكنية وتجارية متميزة بحرفية لا تضاهى واهتمام بالتفاصيل.',
        viewProjects: 'عرض المشاريع',
        contactUs: 'اتصل بنا'
      },
      services: {
        title: 'خدماتنا',
        residential: {
          title: 'البناء السكني',
          desc: 'منازل فاخرة مصممة خصيصاً لتناسب أسلوب حياتك ورؤيتك.'
        },
        commercial: {
          title: 'التطوير التجاري',
          desc: 'مساحات تجارية راقية مصممة لتلبية احتياجات الأعمال الحديثة.'
        },
        renovation: {
          title: 'تجديد متميز',
          desc: 'تحويل المساحات الحالية إلى تحف فنية حديثة.'
        }
      },
      projects: {
        title: 'تحفنا الفنية',
        description: 'معرض لأفضل مشاريع البناء والتجديد لدينا، حيث تلتقي الحرفية بالابتكار.'
      },
      forSale: {
        title: 'عقارات فاخرة',
        filters: {
          all: 'الكل',
          newBuild: 'بناء جديد',
          historic: 'تاريخي',
          investment: 'استثماري'
        }
      },
      investment: {
        title: 'فرص استثمارية حصرية',
        description: 'نحن نقدم فرصاً استثمارية فريدة في مشاريع بناء عالية النمو. من التطويرات الجديدة إلى التحديثات التاريخية، يضمن نموذجنا خلق أقصى قيمة.',
        highlights: [
          'تطويرات سكنية من الصفر',
          'ترميم العقارات التاريخية وإعادة بيعها',
          'مشاريع تجديد الوحدات المتعددة',
          'تحويل العقارات التجارية إلى سكنية'
        ],
        cta: 'طلب نشرة الاستثمار',
        roiLabel: 'متوسط العائد السنوي'
      },
      about: {
        title: 'إرثنا',
        subtitle: 'الفريق الذي يقف خلف العمل',
        description: 'تأسست شركة الأخوة الثلاثة للمقاولات على مبادئ النزاهة والجودة والابتكار، وكانت رائدة في هذا المجال لأكثر من عقدين. نحن نؤمن بأن كل مبنى يحكي قصة، ونحن هنا لمساعدتك في كتابة قصتك.',
        vision: {
          title: 'الجودة هي ما نعيش من أجله',
          description: 'رؤيتنا هي إعادة تعريف مشهد البناء من خلال حرفية لا تضاهى والتزام بالتميز يصمد أمام اختبار الزمن.'
        },
        whatWeDo: {
          title: 'ماذا نفعل',
          items: [
            { title: 'التصميم والبناء', desc: 'من المفهوم الأولي إلى الاكتمال النهائي، نتولى كل جانب من جوانب عملية التصميم والبناء.' },
            { title: 'تخطيط الخدمات اللوجستية', desc: 'تخطيط دقيق وإدارة النطاق لضمان تسليم المشاريع في الوقت المحدد وضمن الميزانية.' },
            { title: 'مراقبة الجودة', desc: 'إشراف صارم وإدارة مراقبة الجودة في كل مرحلة من مراحل البناء.' }
          ]
        },
        advantage: {
          title: 'ميزة الأخوة الثلاثة',
          items: [
            { title: 'النتائج', desc: 'نحن مدفوعون بالنتائج التي تتجاوز التوقعات.' },
            { title: 'الإبداع', desc: 'حلول مبتكرة لتحديات البناء المعقدة.' },
            { title: 'الشفافية', desc: 'تواصل مفتوح وتقارير صادقة طوال فترة المشروع.' }
          ]
        },
        cta: {
          title: 'لنبدأ شيئاً رائعاً',
          button: 'ابدأ الآن'
        },
        stats: {
          years: 'سنوات الخبرة',
          projects: 'مشاريع مكتملة',
          awards: 'جوائز فزنا بها',
          clients: 'عملاء سعداء'
        }
      },
      contact: {
        title: 'لنبنِ معاً',
        description: 'هل أنت مستعد لبدء مشروعك القادم؟ فريقنا هنا لإرشادك خلال كل خطوة من العملية.',
        emailUs: 'راسلنا عبر البريد',
        visitUs: 'قم بزيارة مكتبنا',
        phone: 'اتصل بنا',
        website: 'الموقع الإلكتروني',
        address: 'التوام، غزة، فلسطين',
        email: 'raafatmohsen@gmail.com',
        phoneNumber: '+970 597 420 202',
        websiteUrl: 'http://3brothers.company',
        form: {
          title: 'تواصل معنا',
          subtitle: 'هل لديك مشروع في ذهنك أو مهتم بعقار؟ أرسل لنا رسالة وسنحول رؤيتك إلى حقيقة.',
          name: 'الاسم الكامل',
          email: 'البريد الإلكتروني',
          message: 'الرسالة',
          placeholderName: 'الاسم هنا',
          placeholderEmail: 'raafatmohsen@gmail.com',
          placeholderMessage: 'أخبرنا عن مشروعك...',
          send: 'إرسال الرسالة',
          success: 'تم إرسال الرسالة بنجاح! سنتواصل معك قريباً.',
          error: 'حدث خطأ ما. يرجى المحاولة مرة أخرى لاحقاً.'
        }
      },
      footer: {
        description: 'شركة الأخوة الثلاثة للمقاولات هي شركة رائدة في مجال البناء الفاخر مكرسة لبناء التميز وتعريف المعيشة الحديثة.',
        quickLinks: 'روابط سريعة',
        services: 'الخدمات',
        contact: 'الاتصال',
        rights: 'شركة ثري برذرز للمقاولات - محسن الخزندار وأولاده. جميع الحقوق محفوظة.'
      },
      common: {
        viewDetails: 'عرض التفاصيل',
        makeOffer: 'قدم عرضاً',
        requestCustomization: 'طلب تخصيص',
        beds: 'غرف نوم',
        baths: 'حمامات',
        built: 'سنة البناء',
        yearBuilt: 'سنة البناء',
        price: 'السعر',
        location: 'الموقع',
        description: 'وصف العقار',
        propertyDescription: 'يمثل هذا العقار الاستثنائي قمة التزام شركة الأخوة الثلاثة للمقاولات بالجودة والتصميم. يتميز بتشطيبات فاخرة، ووسائل راحة حديثة، وتخطيطات مدروسة، وهو جاهز لأصحابه الجدد للانتقال إليه والاستمتاع به.'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
