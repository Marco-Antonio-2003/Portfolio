document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE NAVEGAÇÃO ATIVA ---
    const navScrollLinks = document.querySelectorAll('nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');

    function changeActiveLink() {
        let index = sections.length;
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        navScrollLinks.forEach((link) => link.classList.remove('active'));
        if(navScrollLinks[index]) {
            navScrollLinks[index].classList.add('active');
        }
    }
    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    // --- LÓGICA DO MENU HAMBÚRGUER ---
    const menuToggle = document.getElementById('menu-toggle');
    const nav = document.querySelector('header nav');
    const navMenuLinks = document.querySelectorAll('nav ul a');

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            nav.classList.toggle('active');
        });
    }
    
    // CORREÇÃO: Fecha o menu ao clicar em um link
    navMenuLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (nav.classList.contains('active')) {
                nav.classList.remove('active');
            }
        });
    });

    // --- LÓGICA DO MODAL 1: ZOOM DE IMAGEM ÚNICA (GENÉRICO) ---
    const zoomOverlays = document.querySelectorAll('.zoom-overlay');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    zoomOverlays.forEach(item => {
        item.addEventListener('click', (event) => {
            const imageElement = event.currentTarget.parentElement.querySelector('img');
            if (imageElement) {
                const imgSrc = imageElement.getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
            }
        });
    });

    const closeZoomLightbox = () => {
        if(lightbox) lightbox.classList.remove('active');
    };
    if(closeLightboxBtn) closeLightboxBtn.addEventListener('click', closeZoomLightbox);

    // --- LÓGICA DO MODAL 2: GALERIA DE IMAGENS ---
    const verMaisBtn = document.getElementById('ver-mais-btn');
    const galleryLightbox = document.getElementById('gallery-lightbox');
    const closeGalleryBtn = document.querySelector('.close-gallery-lightbox');

    const openGallery = () => { if(galleryLightbox) galleryLightbox.classList.add('active'); };
    const closeGallery = () => { if(galleryLightbox) galleryLightbox.classList.remove('active'); };
    
    if(verMaisBtn) verMaisBtn.addEventListener('click', openGallery);
    if(closeGalleryBtn) closeGalleryBtn.addEventListener('click', closeGallery);

    // --- FECHAR MODAIS ---
    // Fechar ao clicar fora
    if(lightbox) lightbox.addEventListener('click', e => { if(e.target === lightbox) closeZoomLightbox(); });
    if(galleryLightbox) galleryLightbox.addEventListener('click', e => { if(e.target === galleryLightbox) closeGallery(); });
    
    // Fechar com a tecla 'Escape'
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if (lightbox && lightbox.classList.contains('active')) closeZoomLightbox();
            if (galleryLightbox && galleryLightbox.classList.contains('active')) closeGallery();
        }
    });
});