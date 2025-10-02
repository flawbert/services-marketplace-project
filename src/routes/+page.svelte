<script lang="ts">
  import type { PageData } from './$types';
  
  export let data: PageData;
  
  let searchQuery = '';
  let locationQuery = '';
  
  // Service type mapping for display
  const serviceTypeMapping: Record<string, string> = {
    'haircut': 'Haircut',
    'massage': 'Massage',
    'fitness': 'Fitness',
    'beauty': 'Beauty',
    'wellness': 'Wellness',
    'cleaning': 'Cleaning'
  };
  
  // Sample data for demonstration (will be replaced with real data from backend)
  const sampleServices = [
    {
      _id: '1',
      name: 'Professional Haircut & Styling',
      service_type: 'haircut',
      description: 'Expert haircut and styling service with latest trends and techniques',
      photos: ['/haircut-service.jpg'],
      provider: { name: 'João Silva' },
      variations: [{ price: 50, duration: 60 }]
    },
    {
      _id: '2',
      name: 'Deep Tissue Massage',
      service_type: 'massage',
      description: 'Therapeutic massage to relieve muscle tension and stress',
      photos: ['/massage-service.jpg'],
      provider: { name: 'Maria Santos' },
      variations: [{ price: 120, duration: 90 }]
    },
    {
      _id: '3',
      name: 'Personal Training Session',
      service_type: 'fitness',
      description: 'One-on-one fitness training tailored to your goals',
      photos: ['/fitness-service.jpg'],
      provider: { name: 'Carlos Mendes' },
      variations: [{ price: 80, duration: 60 }]
    },
    {
      _id: '4',
      name: 'Professional Makeup',
      service_type: 'beauty',
      description: 'Complete makeup service for any occasion',
      photos: ['/beauty-service.jpg'],
      provider: { name: 'Ana Costa' },
      variations: [{ price: 150, duration: 90 }]
    },
    {
      _id: '5',
      name: 'Yoga Classes',
      service_type: 'wellness',
      description: 'Relaxing yoga sessions for all levels',
      photos: ['/yoga-service.jpg'],
      provider: { name: 'Paula Lima' },
      variations: [{ price: 60, duration: 75 }]
    },
    {
      _id: '6',
      name: 'Home Cleaning Service',
      service_type: 'cleaning',
      description: 'Professional deep cleaning for your home',
      photos: ['/cleaning-service.jpg'],
      provider: { name: 'Limpeza Pro' },
      variations: [{ price: 200, duration: 180 }]
    }
  ];

  // Use sample data if no services from backend
  $: displayServices = data.services.length > 0 ? data.services : sampleServices;

  function getLowestPrice(variations: Array<{price: number}>) {
    if (!variations || variations.length === 0) return 0;
    return Math.min(...variations.map(v => v.price));
  }
  function getShortestDuration(variations: Array<{duration: number}>) {
    if (!variations || variations.length === 0) return 0;
    return Math.min(...variations.map(v => v.duration));
  }
  
  function formatPrice(price: number) {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }
</script>

<svelte:head>
  <title>ServiceX - Discover Local Services</title>
  <meta name="description" content="Connect with trusted professionals in your area. From beauty to wellness, find and book services that match your needs." />
</svelte:head>

<div class="homepage">
  <!-- Header -->
  <header class="header">
    <div class="container">
      <div class="nav-brand">
        <div class="logo">
          <div class="logo-icon"></div>
          <span class="logo-text">ServiceX</span>
        </div>
      </div>
      
      <nav class="nav-menu">
        <a href="/services" class="nav-link">Services</a>
        <a href="/how-it-works" class="nav-link">How It Works</a>
        <a href="/become-provider" class="nav-link">Become a Provider</a>
        <a href="/auth/login" class="nav-link sign-in">
          <span class="user-icon">👤</span>
          Sign In
        </a>
      </nav>
    </div>
  </header>

  <!-- Hero Section -->
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <div class="hero-badge">
          <span class="star-icon">⭐</span>
          Find the Perfect Service Provider
        </div>
        
        <h1 class="hero-title">
          Discover Local Services<br>
          Book Instantly
        </h1>
        
        <p class="hero-subtitle">
          Connect with trusted professionals in your area. From beauty to wellness, 
          find and book services that match your needs.
        </p>
        
        <div class="search-form">
          <div class="search-input-group">
            <input 
              type="text" 
              placeholder="Search for services..." 
              bind:value={searchQuery}
              class="search-input"
            />
            <input 
              type="text" 
              placeholder="Location" 
              bind:value={locationQuery}
              class="location-input"
            />
            <button class="search-button" type="button">
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- Available Services Section -->
  <section class="services-section">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Available Services</h2>
        <p class="section-subtitle">{displayServices.length} services found</p>
      </div>
      
      <div class="services-grid">
        {#each displayServices as service}
          <div class="service-card">
            <div class="service-image">
              {#if service.photos && service.photos.length > 0}
                <img src={service.photos[0]} alt={service.name} />
              {:else}
                <div class="placeholder-image"></div>
              {/if}
            </div>
            
            <div class="service-content">
              <div class="service-category">
                {serviceTypeMapping[service.service_type] || service.service_type}
              </div>
              
              <h3 class="service-name">{service.name}</h3>
              <p class="service-provider">{service.provider?.name || 'Provider'}</p>
              
              <p class="service-description">{service.description}</p>
              
              <div class="service-meta">
                <div class="service-duration">
                  <span class="clock-icon">🕐</span>
                  {getShortestDuration(service.variations)} min
                </div>
              </div>
              
              <div class="service-footer">
                <div class="service-price">
                  {formatPrice(getLowestPrice(service.variations))}
                  <span class="price-suffix">+</span>
                </div>
                <button class="view-details-btn">View Details</button>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </section>

  <!-- CTA Section -->
  <section class="cta-section">
    <div class="container">
      <div class="cta-content">
        <h2 class="cta-title">Are You a Service Provider?</h2>
        <p class="cta-subtitle">
          Join our platform and connect with thousands of potential clients. 
          Grow your business with ServiceHub.
        </p>
        <a href="/auth/register" class="cta-button">Start Offering Services</a>
      </div>
    </div>
  </section>
</div>

<style>
  /* Global Styles */
  :global(body) {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    background-color: #ffffff;
  }

  .homepage {
    min-height: 100vh;
  }

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
  }

  /* Header Styles */
  .header {
    background: white;
    border-bottom: 1px solid #e5e7eb;
    position: sticky;
    top: 0;
    z-index: 100;
  }

  .header .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 20px;
  }

  .nav-brand .logo {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    border-radius: 8px;
  }

  .logo-text {
    font-size: 1.5rem;
    font-weight: 700;
    color: #1f2937;
  }

  .nav-menu {
    display: flex;
    align-items: center;
    gap: 2rem;
  }

  .nav-link {
    text-decoration: none;
    color: #6b7280;
    font-weight: 500;
    transition: color 0.2s;
  }

  .nav-link:hover {
    color: #8b5cf6;
  }

  .sign-in {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    color: #1f2937;
  }

  .user-icon {
    font-size: 1.2rem;
  }

  /* Hero Section */
  .hero {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    padding: 4rem 0;
    text-align: center;
  }

  .hero-content {
    max-width: 800px;
    margin: 0 auto;
  }

  .hero-badge {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    background: rgba(255, 255, 255, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 50px;
    font-size: 0.9rem;
    margin-bottom: 2rem;
  }

  .star-icon {
    font-size: 1rem;
  }

  .hero-title {
    font-size: 3.5rem;
    font-weight: 700;
    line-height: 1.1;
    margin: 0 0 1.5rem 0;
  }

  .hero-subtitle {
    font-size: 1.25rem;
    line-height: 1.6;
    margin: 0 0 3rem 0;
    opacity: 0.9;
  }

  .search-form {
    max-width: 600px;
    margin: 0 auto;
  }

  .search-input-group {
    display: flex;
    background: white;
    border-radius: 12px;
    padding: 4px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .search-input,
  .location-input {
    flex: 1;
    border: none;
    padding: 1rem;
    font-size: 1rem;
    background: transparent;
    color: #1f2937;
  }

  .search-input::placeholder,
  .location-input::placeholder {
    color: #9ca3af;
  }

  .search-input:focus,
  .location-input:focus {
    outline: none;
  }

  .search-button {
    background: linear-gradient(135deg, #8b5cf6, #a855f7);
    color: white;
    border: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: transform 0.2s;
  }

  .search-button:hover {
    transform: translateY(-1px);
  }

  /* Services Section */
  .services-section {
    padding: 4rem 0;
    background: #f9fafb;
  }

  .section-header {
    margin-bottom: 3rem;
  }

  .section-title {
    font-size: 2rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.5rem 0;
  }

  .section-subtitle {
    color: #6b7280;
    margin: 0;
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2rem;
  }

  .service-card {
    background: white;
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .service-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }

  .service-image {
    height: 200px;
    overflow: hidden;
  }

  .service-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .placeholder-image {
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, #e5e7eb, #d1d5db);
  }

  .service-content {
    padding: 1.5rem;
  }

  .service-category {
    display: inline-block;
    background: #f3f4f6;
    color: #6b7280;
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.875rem;
    font-weight: 500;
    margin-bottom: 1rem;
  }

  .service-name {
    font-size: 1.25rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 0.25rem 0;
  }

  .service-provider {
    color: #6b7280;
    font-size: 0.9rem;
    margin: 0 0 1rem 0;
  }

  .service-description {
    color: #4b5563;
    line-height: 1.5;
    margin: 0 0 1rem 0;
  }

  .service-meta {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
  }

  .service-duration {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    color: #6b7280;
    font-size: 0.9rem;
  }

  .clock-icon {
    font-size: 1rem;
  }

  .service-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .service-price {
    font-size: 1.5rem;
    font-weight: 700;
    color: #8b5cf6;
  }

  .price-suffix {
    font-size: 1rem;
    color: #6b7280;
  }

  .view-details-btn {
    background: #8b5cf6;
    color: white;
    border: none;
    padding: 0.75rem 1.5rem;
    border-radius: 8px;
    font-weight: 600;
    cursor: pointer;
    transition: background-color 0.2s;
  }

  .view-details-btn:hover {
    background: #7c3aed;
  }

  /* CTA Section */
  .cta-section {
    padding: 4rem 0;
    background: #f9fafb;
    text-align: center;
  }

  .cta-content {
    max-width: 600px;
    margin: 0 auto;
  }

  .cta-title {
    font-size: 2.5rem;
    font-weight: 700;
    color: #1f2937;
    margin: 0 0 1rem 0;
  }

  .cta-subtitle {
    font-size: 1.125rem;
    color: #6b7280;
    line-height: 1.6;
    margin: 0 0 2rem 0;
  }

  .cta-button {
    display: inline-block;
    background: #8b5cf6;
    color: white;
    text-decoration: none;
    padding: 1rem 2rem;
    border-radius: 8px;
    font-weight: 600;
    font-size: 1.1rem;
    transition: background-color 0.2s, transform 0.2s;
  }

  .cta-button:hover {
    background: #7c3aed;
    transform: translateY(-1px);
  }

  /* Responsive Design */
  @media (max-width: 768px) {
    .hero-title {
      font-size: 2.5rem;
    }
    
    .search-input-group {
      flex-direction: column;
      gap: 0.5rem;
    }
    
    .search-button {
      width: 100%;
    }
    
    .nav-menu {
      display: none;
    }
    
    .services-grid {
      grid-template-columns: 1fr;
    }
  }
</style>