/**
 * BJA ENTERPRISE — Main Application Logic
 * Implements catalogue filtering, search, accessible product details modal,
 * gallery preview lightbox, mobile navigation, and contact enquiry links.
 */

document.addEventListener('DOMContentLoaded', () => {
  // State
  const state = {
    selectedCategory: 'all',
    searchQuery: '',
    filteredProducts: [...PRODUCTS_DATA.filter(p => p.active)],
    activeModalProductId: null,
    lastFocusedElement: null
  };

  // DOM Elements
  const header = document.getElementById('siteHeader');
  const productGrid = document.getElementById('productGrid');
  const categoryFilters = document.getElementById('categoryFilters');
  const searchInput = document.getElementById('searchInput');
  const searchClearBtn = document.getElementById('searchClearBtn');
  const resultsCount = document.getElementById('resultsCount');
  const resetFiltersBtn = document.getElementById('resetFiltersBtn');
  const resultsMeta = document.getElementById('resultsMeta');

  // Mobile Drawer Elements
  const menuToggleBtn = document.getElementById('menuToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavBackdrop = document.getElementById('mobileNavBackdrop');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  // Modal Dialog Elements
  const productModal = document.getElementById('productModal');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalImg = document.getElementById('modalImg');
  const modalCategory = document.getElementById('modalCategory');
  const modalTitle = document.getElementById('modalTitle');
  const modalPrice = document.getElementById('modalPrice');
  const modalAvailability = document.getElementById('modalAvailability');
  const modalDesc = document.getElementById('modalDesc');
  const modalSpecBlock = document.getElementById('modalSpecBlock');
  const modalSpecList = document.getElementById('modalSpecList');
  const modalCallBtn = document.getElementById('modalCallBtn');
  const modalWhatsappBtn = document.getElementById('modalWhatsappBtn');

  // --------------------------------------------------------------------------
  // Header Scroll Effect & Navigation Highlighting
  // --------------------------------------------------------------------------
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Update active nav link based on scroll position
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.scrollY + 120;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      const desktopLink = document.querySelector(`.nav-desktop a[href="#${id}"]`);
      const mobileLink = document.querySelector(`.mobile-nav-links a[href="#${id}"]`);

      if (scrollPosition >= top && scrollPosition < top + height) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        document.querySelectorAll('.mobile-nav-link').forEach(link => link.classList.remove('active'));
        if (desktopLink) desktopLink.classList.add('active');
        if (mobileLink) mobileLink.classList.add('active');
      }
    });
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  // --------------------------------------------------------------------------
  // Mobile Drawer Navigation
  // --------------------------------------------------------------------------
  const openMobileMenu = () => {
    mobileNavDrawer.classList.add('open');
    mobileNavBackdrop.classList.add('open');
    document.body.classList.add('modal-open');
    menuToggleBtn.setAttribute('aria-expanded', 'true');
    mobileDrawerClose.focus();
  };

  const closeMobileMenu = () => {
    mobileNavDrawer.classList.remove('open');
    mobileNavBackdrop.classList.remove('open');
    document.body.classList.remove('modal-open');
    menuToggleBtn.setAttribute('aria-expanded', 'false');
  };

  if (menuToggleBtn) menuToggleBtn.addEventListener('click', openMobileMenu);
  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
  if (mobileNavBackdrop) mobileNavBackdrop.addEventListener('click', closeMobileMenu);

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMobileMenu();
    });
  });

  // --------------------------------------------------------------------------
  // Catalogue Rendering & Filtering
  // --------------------------------------------------------------------------
  const renderCategories = () => {
    categoryFilters.innerHTML = PRODUCT_CATEGORIES.map(cat => {
      const isActive = cat.id === state.selectedCategory;
      return `
        <button 
          type="button" 
          class="filter-pill ${isActive ? 'active' : ''}" 
          data-category="${cat.id}"
          role="tab"
          aria-selected="${isActive}"
        >
          ${cat.label}
        </button>
      `;
    }).join('');

    // Attach listeners
    categoryFilters.querySelectorAll('.filter-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        state.selectedCategory = pill.dataset.category;
        applyFilters();
      });
    });
  };

  const formatPrice = (price) => {
    if (typeof price === 'number' && price > 0) {
      return `₹${price.toLocaleString('en-IN')}`;
    }
    return 'Ask for price';
  };

  const renderProducts = () => {
    if (state.filteredProducts.length === 0) {
      productGrid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon" aria-hidden="true">🔍</div>
          <h3 class="empty-state-title">No matching products found</h3>
          <p class="empty-state-desc">We couldn't find any products matching "${state.searchQuery}". Try a different search term or reset all filters.</p>
          <button type="button" class="btn-primary" id="emptyResetBtn">
            View All Products
          </button>
        </div>
      `;

      const emptyResetBtn = document.getElementById('emptyResetBtn');
      if (emptyResetBtn) {
        emptyResetBtn.addEventListener('click', resetFilters);
      }
      return;
    }

    productGrid.innerHTML = state.filteredProducts.map(product => {
      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-card-media">
            <span class="product-card-category">${escapeHtml(product.categoryName)}</span>
            <img 
              src="${product.image}" 
              alt="${escapeHtml(product.imageAlt)}" 
              loading="lazy"
              width="300"
              height="300"
            />
          </div>
          <div class="product-card-body">
            <h3 class="product-card-title">${escapeHtml(product.name)}</h3>
            <p class="product-card-desc">${escapeHtml(product.shortDescription)}</p>
            <div class="product-card-footer">
              <span class="product-card-price">${formatPrice(product.price)}</span>
              <button 
                type="button" 
                class="btn-view-details" 
                data-id="${product.id}"
                aria-label="View details for ${escapeHtml(product.name)}"
              >
                View Details
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Attach click handlers to View Details buttons
    productGrid.querySelectorAll('.btn-view-details').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = btn.dataset.id;
        openProductModal(id, btn);
      });
    });
  };

  const updateResultsMeta = () => {
    const total = state.filteredProducts.length;
    resultsCount.textContent = `Showing ${total} ${total === 1 ? 'product' : 'products'}`;
    
    // Show or hide clear button in search input
    if (state.searchQuery.trim().length > 0) {
      searchClearBtn.classList.add('visible');
    } else {
      searchClearBtn.classList.remove('visible');
    }

    // Show or hide global reset button
    const hasFilter = state.selectedCategory !== 'all' || state.searchQuery.trim().length > 0;
    resetFiltersBtn.style.display = hasFilter ? 'inline-flex' : 'none';
  };

  const applyFilters = () => {
    const q = state.searchQuery.trim().toLowerCase();
    
    state.filteredProducts = PRODUCTS_DATA.filter(product => {
      if (!product.active) return false;
      
      const matchesCategory = state.selectedCategory === 'all' || product.category === state.selectedCategory;
      const matchesSearch = !q || 
        product.name.toLowerCase().includes(q) || 
        product.shortDescription.toLowerCase().includes(q) ||
        product.categoryName.toLowerCase().includes(q);

      return matchesCategory && matchesSearch;
    });

    renderCategories();
    renderProducts();
    updateResultsMeta();
  };

  const resetFilters = () => {
    state.selectedCategory = 'all';
    state.searchQuery = '';
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  };

  // Search input listener
  searchInput.addEventListener('input', (e) => {
    state.searchQuery = e.target.value;
    applyFilters();
  });

  searchClearBtn.addEventListener('click', () => {
    state.searchQuery = '';
    searchInput.value = '';
    applyFilters();
    searchInput.focus();
  });

  resetFiltersBtn.addEventListener('click', resetFilters);

  // --------------------------------------------------------------------------
  // Accessible Product Details Modal Dialog
  // --------------------------------------------------------------------------
  const openProductModal = (productId, triggerEl) => {
    const product = PRODUCTS_DATA.find(p => p.id === productId);
    if (!product) return;

    state.activeModalProductId = productId;
    state.lastFocusedElement = triggerEl;

    // Populate Modal Details
    modalImg.src = product.image;
    modalImg.alt = product.imageAlt;
    modalCategory.textContent = product.categoryName;
    modalTitle.textContent = product.name;
    modalPrice.textContent = formatPrice(product.price);
    modalAvailability.textContent = product.availability || 'Contact shop for availability';
    modalDesc.textContent = product.shortDescription;

    // Specifications & Brand
    if (product.specifications && product.specifications.length > 0) {
      modalSpecBlock.style.display = 'block';
      let specsHtml = '';
      if (product.brandModel) {
        specsHtml += `<li><strong>Model:</strong> ${escapeHtml(product.brandModel)}</li>`;
      }
      specsHtml += product.specifications.map(spec => `<li>${escapeHtml(spec)}</li>`).join('');
      modalSpecList.innerHTML = specsHtml;
    } else if (product.brandModel) {
      modalSpecBlock.style.display = 'block';
      modalSpecList.innerHTML = `<li><strong>Model:</strong> ${escapeHtml(product.brandModel)}</li>`;
    } else {
      modalSpecBlock.style.display = 'none';
    }

    // Setup Call Button
    modalCallBtn.href = 'tel:+918876605851';

    // Setup WhatsApp Enquiry with pre-filled message strictly matching PRD:
    // "Hello BJA ENTERPRISE, I would like to know the price and availability of [Product Name]."
    const waMessage = `Hello BJA ENTERPRISE, I would like to know the price and availability of ${product.name}.`;
    modalWhatsappBtn.href = `https://wa.me/918876605851?text=${encodeURIComponent(waMessage)}`;

    // Show Dialog
    productModal.classList.add('active');
    document.body.classList.add('modal-open');
    modalCloseBtn.focus();
  };

  const closeProductModal = () => {
    productModal.classList.remove('active');
    document.body.classList.remove('modal-open');
    state.activeModalProductId = null;

    if (state.lastFocusedElement) {
      state.lastFocusedElement.focus();
    }
  };

  modalCloseBtn.addEventListener('click', closeProductModal);

  // Close modal when clicking outside dialog window
  productModal.addEventListener('click', (e) => {
    if (e.target === productModal) {
      closeProductModal();
    }
  });

  // --------------------------------------------------------------------------
  // Keyboard Accessibility (Esc key handler & Focus Trapping)
  // --------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (productModal.classList.contains('active')) {
        closeProductModal();
      } else if (mobileNavDrawer.classList.contains('open')) {
        closeMobileMenu();
      }
    }

    // Modal Focus Trap
    if (productModal.classList.contains('active') && e.key === 'Tab') {
      const focusableEls = productModal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
      const firstEl = focusableEls[0];
      const lastEl = focusableEls[focusableEls.length - 1];

      if (e.shiftKey) {
        if (document.activeElement === firstEl) {
          e.preventDefault();
          lastEl.focus();
        }
      } else {
        if (document.activeElement === lastEl) {
          e.preventDefault();
          firstEl.focus();
        }
      }
    }
  });

  // Utility to prevent XSS
  function escapeHtml(string) {
    if (!string) return '';
    return String(string)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  // --------------------------------------------------------------------------
  // Full-Width Hero Slider Controller
  // --------------------------------------------------------------------------
  const heroSlider = document.getElementById('heroSlider');
  const heroSlides = document.querySelectorAll('.hero-slide');
  const heroDots = document.querySelectorAll('.hero-dot');
  const heroPrevBtn = document.getElementById('heroPrevBtn');
  const heroNextBtn = document.getElementById('heroNextBtn');
  let currentSlide = 0;
  let slideTimer = null;
  const totalSlides = heroSlides.length;
  const SLIDE_INTERVAL = 5000; // 5 seconds auto-advance

  const goToSlide = (targetIndex) => {
    if (totalSlides === 0) return;
    if (targetIndex < 0) {
      currentSlide = totalSlides - 1;
    } else if (targetIndex >= totalSlides) {
      currentSlide = 0;
    } else {
      currentSlide = targetIndex;
    }

    heroSlides.forEach((slide, idx) => {
      slide.classList.toggle('active', idx === currentSlide);
    });

    heroDots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentSlide);
      dot.setAttribute('aria-selected', idx === currentSlide ? 'true' : 'false');
    });
  };

  const nextSlide = () => goToSlide(currentSlide + 1);
  const prevSlide = () => goToSlide(currentSlide - 1);

  const startAutoSlide = () => {
    stopAutoSlide();
    slideTimer = setInterval(nextSlide, SLIDE_INTERVAL);
  };

  const stopAutoSlide = () => {
    if (slideTimer) {
      clearInterval(slideTimer);
      slideTimer = null;
    }
  };

  if (heroSlider && totalSlides > 0) {
    if (heroPrevBtn) {
      heroPrevBtn.addEventListener('click', () => {
        prevSlide();
        startAutoSlide();
      });
    }

    if (heroNextBtn) {
      heroNextBtn.addEventListener('click', () => {
        nextSlide();
        startAutoSlide();
      });
    }

    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', () => {
        goToSlide(idx);
        startAutoSlide();
      });
    });

    // Pause on hover
    heroSlider.addEventListener('mouseenter', stopAutoSlide);
    heroSlider.addEventListener('mouseleave', startAutoSlide);

    // Touch Swipe Support for Mobile
    let touchStartX = 0;
    let touchEndX = 0;
    heroSlider.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoSlide();
    }, { passive: true });

    heroSlider.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 45) {
        nextSlide();
      } else if (touchEndX - touchStartX > 45) {
        prevSlide();
      }
      startAutoSlide();
    }, { passive: true });

    // Begin Auto-sliding
    startAutoSlide();
  }

  // Initial Initialization
  handleScroll();
  renderCategories();
  renderProducts();
  updateResultsMeta();
});
