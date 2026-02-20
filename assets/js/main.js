/**
* Template Name: Restaurantly
* Template URL: https://bootstrapmade.com/restaurantly-restaurant-template/
* Updated: Mar 17 2024 with Bootstrap v5.3.3
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/

(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /**
   * Easy on scroll event listener 
   */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select('#navbar .scrollto', true)
  const navbarlinksActive = () => {
    let position = window.scrollY + 200
    navbarlinks.forEach(navbarlink => {
      if (!navbarlink.hash) return
      let section = select(navbarlink.hash)
      if (!section) return
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        navbarlink.classList.add('active')
      } else {
        navbarlink.classList.remove('active')
      }
    })
  }
  window.addEventListener('load', navbarlinksActive)
  onscroll(document, navbarlinksActive)

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select('#header')
    let offset = header.offsetHeight

    let elementPos = select(el).offsetTop
    window.scrollTo({
      top: elementPos - offset,
      behavior: 'smooth'
    })
  }

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select('#header')
  let selectTopbar = select('#topbar')
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.add('topbar-scrolled')
        }
      } else {
        selectHeader.classList.remove('header-scrolled')
        if (selectTopbar) {
          selectTopbar.classList.remove('topbar-scrolled')
        }
      }
    }
    window.addEventListener('load', headerScrolled)
    onscroll(document, headerScrolled)
  }

  /**
   * Mobile nav toggle
   */
  on('click', '.mobile-nav-toggle', function(e) {
    select('#navbar').classList.toggle('navbar-mobile')
    this.classList.toggle('bi-list')
    this.classList.toggle('bi-x')
  })

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on('click', '.scrollto', function(e) {
    if (select(this.hash)) {
      e.preventDefault()

      let navbar = select('#navbar')
      if (navbar.classList.contains('navbar-mobile')) {
        navbar.classList.remove('navbar-mobile')
        let navbarToggle = select('.mobile-nav-toggle')
        navbarToggle.classList.toggle('bi-list')
        navbarToggle.classList.toggle('bi-x')
      }
      scrollto(this.hash)
    }
  }, true)

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  window.addEventListener('load', () => {
    if (window.location.hash) {
      if (select(window.location.hash)) {
        scrollto(window.location.hash)
      }
    }
  });

  /**
   * Menu isotope and filter
   */
  window.addEventListener('load', () => {
    let menuContainer = select('.menu-container');
    if (menuContainer) {
      let menuIsotope = new Isotope(menuContainer, {
        itemSelector: '.menu-item',
        layoutMode: 'fitRows'
      });

      let menuFilters = select('#menu-flters li', true);

      on('click', '#menu-flters li', function(e) {
        e.preventDefault();
        menuFilters.forEach(function(el) {
          el.classList.remove('filter-active');
        });
        this.classList.add('filter-active');

        menuIsotope.arrange({
          filter: this.getAttribute('data-filter')
        });
        menuIsotope.on('arrangeComplete', function() {
          AOS.refresh()
        });
      }, true);
    }

  });

  /**
   * Testimonials slider
   */
  new Swiper('.testimonials-slider', {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    breakpoints: {
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },

      1200: {
        slidesPerView: 3,
        spaceBetween: 20
      }
    }
  });

  /**
   * Initiate gallery lightbox 
   */
  const galleryLightbox = GLightbox({
    selector: '.gallery-lightbox'
  });

  /**
   * Animation on scroll
   */
  window.addEventListener('load', () => {
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    })
  });
  /**
   * ==========================================
   * FITUR KERANJANG BELANJA (CART TO WHATSAPP)
   * Oleh: System Analyst & Lead Developer
   * ==========================================
   */
  let cart = [];
  const noWhatsApp = "628983721933";

  // 1. OTOMATIS membuat tombol "Tambah" di semua Menu
  window.addEventListener('load', () => {
    document.querySelectorAll('.menu-item').forEach(item => {
      // Baca nama dan harga langsung dari desain HTML
      let name = item.querySelector('.menu-content a').innerText.trim();
      let priceText = item.querySelector('.menu-content span').innerText.trim();
      // Ubah teks "Rp10.000" jadi angka murni 10000
      let price = parseInt(priceText.replace(/[^0-9]/g, ''));

      // tombol keranjang
      let btn = document.createElement('button');
      btn.className = 'btn-add-cart';
      btn.innerHTML = '<i class="bi bi-cart-plus"></i> Tambah';
      
      // Aksi jika tombol ditekan
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        addToCart(name, price);
        
        // Animasi Sukses
        let originalText = btn.innerHTML;
        btn.innerHTML = '<i class="bi bi-check2"></i> Masuk Keranjang';
        btn.style.background = '#2E8B57';
        btn.style.color = '#fff';
        setTimeout(() => {
          btn.innerHTML = originalText;
          btn.style.background = 'transparent';
          btn.style.color = '#2E8B57';
        }, 1000);
      });

      // Tampilkan tombol di bawah teks resep
      let ingredientsDiv = item.querySelector('.menu-ingredients');
      ingredientsDiv.appendChild(document.createElement('br'));
      ingredientsDiv.appendChild(btn);
    });
  });

  // 2. Fungsi Menambah Barang ke Sistem
  function addToCart(name, price) {
    let existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.qty += 1; // Jika barang sudah ada, tambah jumlahnya
    } else {
      cart.push({ name: name, price: price, qty: 1 }); // Jika belum ada, masukkan baru
    }
    updateCartUI();
  }

  // 3. Fungsi Tambah/Kurang (+ / -) di panel keranjang
  window.changeQty = function(index, delta) {
    cart[index].qty += delta;
    if (cart[index].qty <= 0) {
      cart.splice(index, 1); // Hapus jika jumlahnya 0
    }
    updateCartUI();
  }

  // 4. Update Tampilan Keranjang & Harga Total
  function updateCartUI() {
    let cartItemsContainer = document.getElementById('cart-items');
    let cartBadge = document.getElementById('cart-badge');
    let cartTotalEl = document.getElementById('cart-total');

    let totalHarga = 0;
    let totalItems = 0;
    let html = '';

    if (cart.length === 0) {
      html = '<p class="text-center text-muted mt-4">Keranjang masih kosong</p>';
    } else {
      cart.forEach((item, index) => {
        totalHarga += item.price * item.qty;
        totalItems += item.qty;

        html += `
          <div class="cart-item">
            <div>
              <div class="cart-item-title">${item.name}</div>
              <div class="cart-item-price">Rp ${item.price.toLocaleString('id-ID')}</div>
            </div>
            <div class="d-flex align-items-center">
              <button class="cart-qty-btn me-2" onclick="changeQty(${index}, -1)">-</button>
              <span class="fw-bold px-2">${item.qty}</span>
              <button class="cart-qty-btn ms-2" onclick="changeQty(${index}, 1)">+</button>
            </div>
          </div>
        `;
      });
    }

    cartItemsContainer.innerHTML = html;
    cartBadge.innerText = totalItems;
    cartTotalEl.innerText = 'Rp ' + totalHarga.toLocaleString('id-ID');
  }

  // 5. Checkout, Rakit Pesan & Pindah ke WA
  window.addEventListener('load', () => {
    let btnCheckout = document.getElementById('btn-checkout-wa');
    if(btnCheckout) {
      btnCheckout.addEventListener('click', () => {
        if (cart.length === 0) {
          Toastify({
            text: "⚠️ Keranjang masih kosong! Pilih minuman dulu ya.",
            duration: 3000, // Hilang otomatis dalam 3 detik
            close: true,    // Ada tombol X untuk menutup
            gravity: "top", // Melayang di atas
            position: "center", // Posisi di tengah layar
            style: {
              background: "#e74c3c", // Warna merah agar terlihat sebagai peringatan
              color: "#ffffff",
              borderRadius: "10px",
              fontWeight: "bold"
            }
          }).showToast();
          return;
        }

        // Ambil nama pelanggan dari input
        let customerName = document.getElementById('customer-name').value.trim();
        
        // Cek apakah nama kosong
        if (customerName === "") {
          Toastify({
            text: "Mohon isi nama Anda agar pesanan tidak tertukar!",
            duration: 3000,
            close: true,
            gravity: "top",
            position: "center",
            style: {
              background: "#ff0000", // Warna oranye untuk informasi
              color: "#ffffff",
              borderRadius: "10px",
              fontWeight: "bold"
            }
          }).showToast();
          
          // Setelah notifikasi muncul, otomatis arahkan kursor ke kolom nama
          document.getElementById('customer-name').focus(); 
          return; // Hentikan proses jika nama belum diisi
        }

        let totalHarga = 0;
        // Masukkan nama pelanggan ke sapaan awal
        let textWA = `Halo mimin *Teh Kita*, atas nama *${customerName}* ingin memesan:\n\n`;
        
        cart.forEach((item, index) => {
          let subtotal = item.price * item.qty;
          totalHarga += subtotal;
          textWA += `> ${item.qty}x ${item.name}\n   (Rp ${subtotal.toLocaleString('id-ID')})\n`;
        });

        textWA += `\n*Total Tagihan: Rp ${totalHarga.toLocaleString('id-ID')}*\n\n`;
        textWA += `Tolong info QRIS untuk pembayarannya ya kak. Terima kasih!`;

        let encodedText = encodeURIComponent(textWA);
        let waLink = `https://wa.me/${noWhatsApp}?text=${encodedText}`;
        
        window.open(waLink, '_blank');
      });
    }
  });

})()