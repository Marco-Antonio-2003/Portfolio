document.addEventListener('DOMContentLoaded', function() {

    // --- LÓGICA DE NAVEGAÇÃO ATIVA ---
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('main section[id]');

    function changeActiveLink() {
        let index = sections.length;
        while(--index && window.scrollY + 100 < sections[index].offsetTop) {}
        navLinks.forEach((link) => link.classList.remove('active'));
        if(navLinks[index]) {
            navLinks[index].classList.add('active');
        }
    }
    changeActiveLink();
    window.addEventListener('scroll', changeActiveLink);

    // --- LÓGICA DO MODAL 1: ZOOM DE IMAGEM ÚNICA (AGORA GENÉRICO) ---
    const zoomOverlays = document.querySelectorAll('.zoom-overlay');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightboxBtn = document.querySelector('.close-lightbox');

    zoomOverlays.forEach(item => {
        item.addEventListener('click', (event) => {
            // Pega a imagem que é irmã do overlay ou está dentro do mesmo container
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