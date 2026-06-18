import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Calendar, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Article {
  slug: string;
  title: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
  content: {
    introduction: string;
    sections: {
      title: string;
      content: string[];
    }[];
    conclusion: string;
    keyFindings: string[];
  };
}

const articles: Record<string, Article> = {
  'freeze-thaw-def-analysis': {
    slug: 'freeze-thaw-def-analysis',
    title: 'Freeze-Thaw Analysis of Diesel Exhaust Fluid in SCR Systems',
    date: 'Research Publication',
    category: 'CFD & Phase Change Modeling',
    readTime: '12 min read',
    author: 'Ambarish Khot',
    content: {
      introduction: 'The automotive industry faces significant challenges in maintaining the performance of Selective Catalytic Reduction (SCR) systems under extreme cold-weather conditions. This comprehensive study addresses the critical issue of Diesel Exhaust Fluid (DEF) freezing and defrosting behavior in aftertreatment systems, a phenomenon that directly impacts emission control effectiveness and system reliability.',
      sections: [
        {
          title: 'Research Background and Motivation',
          content: [
            'Diesel Exhaust Fluid, commonly known as DEF or AdBlue, is a urea-based solution essential for reducing NOx emissions in modern diesel engines. The fluid consists of 32.5% high-purity urea and 67.5% deionized water, with a freezing point of approximately -11°C (12°F).',
            'In cold climates, DEF crystallization poses significant operational challenges. When temperatures drop below freezing, the solution undergoes phase change, potentially causing system failures, dosing inaccuracies, and compromised emission performance. Understanding and predicting this behavior is crucial for robust SCR system design.',
            'At Cummins Research and Technology, we developed advanced CFD simulation methodologies to accurately predict freeze-thaw cycles, enabling engineers to design systems that maintain functionality across all operating temperatures.'
          ]
        },
        {
          title: 'Computational Methodology',
          content: [
            'Our simulation approach combines multiphase flow modeling with phase change phenomena, utilizing commercial CFD tools including ANSYS Fluent and Star CCM+. The methodology incorporates:',
            '• Conjugate heat transfer analysis between DEF tank walls and ambient conditions',
            '• Phase change modeling using enthalpy-porosity techniques for solidification and melting',
            '• Transient thermal analysis accounting for thermal mass and insulation effects',
            '• Validation against experimental freeze-thaw test data from controlled laboratory conditions',
            'The simulation framework captures the complex physics of ice formation, including supercooling effects, nucleation sites, and non-uniform freezing patterns within the tank geometry.'
          ]
        },
        {
          title: 'Key Technical Findings',
          content: [
            'Through extensive simulation studies validated against experimental data, several critical insights emerged:',
            'Thermal Stratification: DEF tanks exhibit significant temperature gradients during freezing, with bottom regions freezing first due to heat loss through mounting brackets and tank walls. This finding led to optimized heating element placement.',
            'Defrost Time Prediction: Our models accurately predict defrost duration based on ambient temperature, heater power, and initial ice fraction. This enables intelligent heating strategies that minimize power consumption while ensuring timely system readiness.',
            'Volume Expansion Management: The 9% volume expansion during freezing requires careful tank design. Our simulations identified optimal headspace requirements and structural reinforcement zones to prevent tank deformation.',
            'Heating Strategy Optimization: Comparative analysis of various heating configurations (immersion heaters, external heating jackets, thermal blankets) revealed that strategic heater placement based on CFD insights reduces energy consumption by up to 35%.'
          ]
        },
        {
          title: 'Industrial Applications and Impact',
          content: [
            'This research directly contributed to multiple production programs at Cummins, including BS-VI and Euro 6 emission systems. The simulation methodology became a standard tool in the development process, enabling:',
            '• Reduction in physical prototype iterations by 40%',
            '• Faster time-to-market for cold climate variants',
            '• Design validation for extreme operating conditions (-40°C to +50°C)',
            '• Integration with vehicle thermal management systems',
            'The work resulted in several patent applications focused on innovative heating configurations and freeze-protection strategies, contributing to Cummins\' intellectual property portfolio in emission solutions.'
          ]
        },
        {
          title: 'Advanced Modeling Techniques',
          content: [
            'Our simulation framework employs sophisticated numerical techniques to capture the complete freeze-thaw physics:',
            'Enthalpy-Porosity Method: This approach treats the mushy zone (partially frozen region) as a porous medium with porosity proportional to liquid fraction. The method accurately captures the phase transition without explicit interface tracking.',
            'User-Defined Functions (UDF): Custom C++ code extends commercial CFD solvers to incorporate DEF-specific thermophysical properties, concentration-dependent freezing points, and thermal conductivity variations during phase change.',
            'Uncertainty Quantification: Statistical analysis incorporating manufacturing tolerances, ambient condition variations, and material property uncertainties ensures robust predictions across the entire operating envelope.'
          ]
        },
        {
          title: 'Future Research Directions',
          content: [
            'Building on this foundational work, ongoing research explores:',
            '• Real-time freeze prediction algorithms for intelligent heating control',
            '• Integration of machine learning models for adaptive thermal management',
            '• Multi-scale modeling connecting molecular-level urea crystallization with system-level thermal response',
            '• Coupled electro-thermal simulations for electrically heated catalyst systems in hybrid and electric vehicles'
          ]
        }
      ],
      conclusion: 'This comprehensive CFD study on DEF freeze-thaw behavior represents a significant advancement in emission control system design. By accurately predicting phase change phenomena, we enable robust SCR systems that maintain performance across all climatic conditions. The methodology has been successfully implemented in multiple production programs, delivering substantial cost savings and performance improvements. This work exemplifies the power of simulation-based product development in addressing complex multiphysics challenges in the automotive industry.',
      keyFindings: [
        'Developed validated CFD methodology for predicting DEF freezing and defrosting behavior',
        'Identified optimal heating strategies reducing energy consumption by 35%',
        'Enabled 40% reduction in physical prototype testing through accurate virtual validation',
        'Contributed to patent portfolio with innovative freeze-protection designs',
        'Successfully implemented in BS-VI and Euro 6 production programs',
        'Publication pending in leading international journals'
      ]
    }
  },
  'aeroacoustics-noise-prediction': {
    slug: 'aeroacoustics-noise-prediction',
    title: 'Aeroacoustics Noise Prediction in Aftertreatment Systems',
    date: 'International Publication',
    category: 'Computational Aeroacoustics',
    readTime: '10 min read',
    author: 'Ambarish Khot',
    content: {
      introduction: 'Noise emissions from automotive exhaust systems represent a critical concern for vehicle manufacturers and end customers. As emission regulations become more stringent, aftertreatment systems have grown in complexity, often introducing undesirable acoustic signatures. This research addresses the challenge of predicting and mitigating aeroacoustic noise in SCR and DPF systems through advanced computational methods.',
      sections: [
        {
          title: 'Acoustic Challenges in Modern Aftertreatment',
          content: [
            'Modern aftertreatment systems incorporate complex geometries including mixers, dosers, catalysts, and particulate filters. These components create turbulent flow patterns that generate broadband and tonal noise across the audible spectrum.',
            'Traditional exhaust system design focused primarily on emissions performance and backpressure. However, increasing customer expectations for refined vehicle operation demand simultaneous optimization of acoustic performance without compromising emission reduction efficiency.',
            'At Cummins, we developed comprehensive computational aeroacoustics (CAA) capabilities to predict noise generation mechanisms and guide design modifications for noise mitigation while maintaining emission control effectiveness.'
          ]
        },
        {
          title: 'Computational Aeroacoustics Methodology',
          content: [
            'Our aeroacoustics prediction framework integrates multiple simulation approaches:',
            '• Large Eddy Simulation (LES) for resolving turbulent flow structures that generate noise',
            '• Ffowcs Williams-Hawkings (FW-H) acoustic analogy for far-field noise prediction',
            '• Linearized Euler equations for capturing acoustic wave propagation',
            '• Frequency domain analysis using GT-Power for system-level acoustic behavior',
            'The methodology was validated against microphone array measurements in anechoic chamber conditions, demonstrating excellent agreement in both sound pressure level and frequency content predictions.'
          ]
        },
        {
          title: 'Noise Generation Mechanisms',
          content: [
            'Through detailed flow analysis and acoustic source identification, we characterized primary noise sources in aftertreatment systems:',
            'Mixer-Induced Turbulence: Static mixers create coherent vortical structures that produce tonal noise at specific frequencies. Our simulations identified vortex shedding frequencies and their relationship to mixer geometry parameters.',
            'Flow Separation and Reattachment: Sharp geometry changes cause flow separation, generating broadband noise. CFD analysis revealed optimal radius specifications to minimize separation while maintaining mixing efficiency.',
            'Substrate Interaction: Flow interaction with catalyst and DPF substrates creates high-frequency noise. Porous media modeling coupled with acoustic analysis quantified this contribution.',
            'Doser Spray Atomization: DEF and hydrocarbon dosers introduce droplet-laden flows that modify acoustic behavior. Multiphase flow simulations captured spray-turbulence interactions affecting noise generation.'
          ]
        },
        {
          title: 'Design Optimization for Noise Reduction',
          content: [
            'Based on simulation insights, we developed design modifications that achieved significant noise reduction:',
            '• Modified mixer geometries with optimized blade angles reducing tonal noise by 8-12 dB',
            '• Aerodynamic fairings at component junctions eliminating flow separation zones',
            '• Perforated tubes and acoustic liners targeting specific frequency bands',
            '• Strategic placement of expansion chambers for reactive silencing',
            'A critical achievement was the CMD Innovation Award-winning work that delivered noise reduction without increasing backpressure or compromising NOx conversion efficiency—a challenging multi-objective optimization problem.'
          ]
        },
        {
          title: 'Industrial Impact and Recognition',
          content: [
            'This aeroacoustics research directly addressed customer concerns in heavy-duty truck applications where cabin noise significantly impacts driver experience. The work resulted in:',
            '• Noise reduction of 10-15 dB in critical frequency bands (500-2000 Hz)',
            '• Zero performance penalty in emissions or backpressure',
            '• Successful implementation in John Deere and other major OEM platforms',
            '• Recognition through Cummins CMD Innovation Award',
            '• International publications and conference presentations',
            'The simulation-led approach eliminated costly acoustic testing iterations, reducing development time by approximately 6 months per program.'
          ]
        }
      ],
      conclusion: 'Computational aeroacoustics has become an indispensable tool in modern aftertreatment system development. This research demonstrates that careful application of advanced CFD and acoustic simulation methods enables simultaneous optimization of emission performance and acoustic refinement. The methodologies developed continue to guide noise reduction efforts across Cummins\' global product portfolio, ensuring customer satisfaction while meeting stringent emission regulations.',
      keyFindings: [
        'Developed validated CAA methodology for aftertreatment systems',
        'Achieved 10-15 dB noise reduction in critical frequency bands',
        'Zero performance penalty in emissions or backpressure',
        'Received CMD Innovation Award for simulation-led design',
        'Reduced development time by 6 months through virtual validation',
        'Successfully implemented in multiple production platforms'
      ]
    }
  },
  'urea-deposit-mitigation': {
    slug: 'urea-deposit-mitigation',
    title: 'Urea Deposit Mitigation Strategies in SCR Technology',
    date: 'Research Publication',
    category: 'Emission Technology',
    readTime: '15 min read',
    author: 'Ambarish Khot',
    content: {
      introduction: 'Urea deposit formation in Selective Catalytic Reduction (SCR) systems represents one of the most persistent challenges in diesel emission control technology. Solid deposits can block decomposition tubes, degrade mixing efficiency, and ultimately compromise NOx reduction performance. This comprehensive study addresses deposit formation mechanisms and develops effective mitigation strategies through advanced multiphase flow simulation and innovative design solutions.',
      sections: [
        {
          title: 'The Urea Deposit Challenge',
          content: [
            'When aqueous urea solution (DEF) is injected into hot exhaust gas, it undergoes thermolysis and hydrolysis to produce ammonia. However, incomplete evaporation, impingement on walls, and non-ideal decomposition conditions lead to solid deposit formation.',
            'These deposits consist of various urea byproducts including biuret, cyanuric acid, and ammelide. Once formed, deposits are difficult to remove and accumulate over vehicle lifetime, potentially causing system failures and warranty claims.',
            'Industry data indicates that deposit-related issues account for significant warranty costs. At Cummins, we developed a systematic simulation and experimental approach to understand deposit mechanisms and implement robust mitigation strategies.'
          ]
        },
        {
          title: 'Multiphase Flow Simulation Framework',
          content: [
            'Understanding deposit formation requires capturing complex multiphase physics:',
            '• Lagrangian particle tracking for DEF spray droplets',
            '• Evaporation modeling with temperature-dependent properties',
            '• Wall film formation and surface interaction physics',
            '• Urea thermolysis chemistry (NH2-CO-NH2 → NH3 + HNCO)',
            '• Byproduct formation kinetics',
            'Our simulation framework in ANSYS Fluent and Converge CFD incorporates detailed chemistry mechanisms validated against experimental decomposition studies. The approach predicts spatial distribution of liquid impingement, wall film thickness, and local thermochemical conditions favoring deposit formation.'
          ]
        },
        {
          title: 'Key Deposit Formation Mechanisms',
          content: [
            'Through extensive simulation and experimental correlation, we identified primary mechanisms:',
            'Spray Impingement: Poor atomization or targeting leads to direct wall impingement. Droplets exceeding 100 microns have insufficient residence time for complete evaporation. CFD optimization of doser spray cone angle and positioning minimizes impingement risk.',
            'Low Wall Temperature: Surfaces below 250°C cannot sustain complete decomposition. Thermal management simulation identified insulation requirements and heater integration strategies.',
            'Insufficient Mixing: Non-uniform temperature and concentration distributions create local zones favorable for byproduct formation. Advanced mixer designs ensure rapid dispersion and temperature homogenization.',
            'Thermodynamic Dead Zones: Recirculation regions with low velocity allow prolonged exposure to intermediate temperatures (250-350°C) where byproduct formation rates peak. Flow optimization eliminates these zones.'
          ]
        },
        {
          title: 'Innovative Mitigation Strategies',
          content: [
            'Based on simulation insights, we developed and validated multiple mitigation approaches:',
            'Air-Assisted Dosing: Patent-pending technology utilizing compressed air for enhanced atomization, reducing droplet size by 40% and ensuring rapid evaporation. CFD-guided optimization determined optimal air-to-DEF mass ratio and injector configuration.',
            'Heated Decomposition Tubes: Strategic heating element placement based on conjugate heat transfer analysis maintains wall temperatures above critical thresholds. Reduced deposit formation by 85% in validation testing.',
            'Optimized Mixer Geometry: Novel blade configurations create swirl patterns that prevent wall film accumulation while enhancing mixing. Achieved SCR uniformity index of 0.99 with zero deposit formation in 1000-hour durability testing.',
            'Surface Coatings: Hydrophobic and catalytic coatings modify surface interaction characteristics. Coupled with aerodynamic optimization, these coatings prevent nucleation sites for deposit formation.'
          ]
        },
        {
          title: 'Patent Portfolio and Industrial Implementation',
          content: [
            'This research generated substantial intellectual property for Cummins:',
            '• Prime inventor on air-assisted doser patent (US Patent pending)',
            '• Novel mixer designs with self-cleaning features',
            '• Deposit mitigation strategies for low-pressure injector systems',
            '• Integrated thermal management approaches',
            'These innovations have been successfully implemented in BS-VI, Euro 6, and EPA 2010 production systems across passenger car, light commercial vehicle, and heavy-duty truck applications. Field performance data demonstrates significant reduction in deposit-related warranty claims.',
            'The work contributed to $4M+ in cost savings through reduced warranty exposure and improved system robustness. Several derivative patents continue to expand the intellectual property portfolio.'
          ]
        },
        {
          title: 'Experimental Validation and Field Performance',
          content: [
            'All simulation-led designs underwent rigorous validation:',
            '• Burner rig testing with optical diagnostics for deposit visualization',
            '• Engine dynamometer testing across complete regulatory cycles',
            '• Vehicle field trials in extreme climatic conditions',
            '• Accelerated aging tests (thermal cycling, chemical exposure)',
            'Results consistently demonstrated that CFD-optimized configurations met zero-deposit criteria even under severe operating conditions. Post-test teardowns confirmed simulation predictions of clean surfaces and maintained mixing efficiency.'
          ]
        }
      ],
      conclusion: 'This comprehensive research on urea deposit mitigation demonstrates the power of combining advanced multiphase CFD simulation with systematic innovation methodologies. By understanding fundamental physics and chemistry of deposit formation, we developed effective mitigation strategies that are now deployed globally in Cummins emission systems. The work represents a significant contribution to SCR technology robustness and has established new industry benchmarks for deposit-free operation. Ongoing research continues to explore next-generation solutions for increasingly stringent emission standards.',
      keyFindings: [
        'Developed comprehensive multiphase flow simulation framework for deposit prediction',
        'Identified four primary mechanisms driving deposit formation',
        'Invented air-assisted dosing technology reducing deposits by 85%',
        'Prime inventor on multiple patents focused on deposit mitigation',
        'Successfully implemented in BS-VI, Euro 6, and EPA production systems',
        'Contributed to $4M+ cost savings through improved system robustness',
        'Publication pending in leading emission technology journals'
      ]
    }
  }
};

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = articles[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-6 lg:px-8 py-32">
        <Link
          href="/#insights"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Insights
        </Link>

        <header className="mb-12">
          <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6">
            <span className="px-3 py-1 bg-accent text-accent-foreground rounded-full font-medium">
              {article.category}
            </span>
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              {article.date}
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              {article.readTime}
            </div>
          </div>

          <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-3 text-muted-foreground">
            <span>By</span>
            <span className="font-semibold text-foreground">{article.author}</span>
          </div>
        </header>

        <div className="prose prose-lg max-w-none">
          <p className="text-xl text-muted-foreground leading-relaxed mb-12 border-l-4 border-foreground pl-6">
            {article.content.introduction}
          </p>

          {article.content.sections.map((section, index) => (
            <section key={index} className="mb-12">
              <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
                {section.title}
              </h2>
              {section.content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-muted-foreground leading-relaxed mb-6">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}

          <section className="mb-12">
            <h2 className="font-serif text-3xl font-bold text-foreground mb-6">
              Conclusion
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              {article.content.conclusion}
            </p>
          </section>

          <section className="bg-accent p-8 rounded-xl">
            <h3 className="font-serif text-2xl font-bold text-foreground mb-6">
              Key Research Findings
            </h3>
            <ul className="space-y-3">
              {article.content.keyFindings.map((finding, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="text-foreground mt-1">•</span>
                  <span className="text-muted-foreground">{finding}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border">
          <Button asChild variant="outline" size="lg">
            <Link href="/#contact">
              Discuss This Research
              <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
            </Link>
          </Button>
        </div>
      </article>
    </div>
  );
}

export async function generateStaticParams() {
  return Object.keys(articles).map((slug) => ({
    slug,
  }));
}
