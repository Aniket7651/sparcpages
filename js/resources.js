document.addEventListener('DOMContentLoaded', () => {
  
  
  const pdfResources = [
    { id: "doc1", title: "What is SPARC?", pdfFile: "resource/What is Sparc__compressed.pdf", thumbFile: "thumb/sparc.png", 
        description: "SPARC Project is a European project that brings together patients, clinicians, researchers, policymakers, and innovators to help make personalised cancer care a reality across Europe." },
    { id: "doc2", title: "SPARC PCAG", pdfFile: "resource/SPARC PCAG_compressed.pdf", thumbFile: "thumb/pcag.png", 
        description: "SPARC has established its Patient and Caregiver Advisory Group (PCAG) to ensure that lived experience is meaningfully integrated into personalised cancer care across Europe. " },
    { id: "doc3", title: "SPARC Leaflet", pdfFile: "resource/Sparc leaflet_compressed.pdf", thumbFile: "thumb/leaflet.png", 
        description: "A brief overview of the SPARC initiative." },
    { id: "doc4", title: "SPARC Leaflet 2", pdfFile: "resource/Sparc leaflet 2_compressed.pdf", thumbFile: "thumb/leaflet2.png", 
        description: "Additional information about the SPARC project." },
    
  ];

  const galleryContainer = document.getElementById('scg-pdf-gallery');
  const modal = document.getElementById('scg-pdf-modal');
  const closeBtn = document.getElementById('scg-pdf-close');
  const iframe = document.getElementById('scg-pdf-iframe');
  const downloadBtn = document.getElementById('scg-pdf-download-btn');
  const titleEl = document.getElementById('scg-pdf-title');

  const descriptionEl = document.getElementById('scg-pdf-description');

  // 2. CARDS GENERATE KARNA
  pdfResources.forEach(resource => {
    // HTML Card banana
    const card = document.createElement('div');
    card.className = 'scg-pdf-card';
    card.innerHTML = `
      <img src="docs/${resource.thumbFile}" alt="${resource.title}" class="scg-pdf-thumb" onerror="this.src='https://via.placeholder.com/300x400?text=PDF+Document'">
      <div class="scg-pdf-info">
        <h4>${resource.title}</h4>
      </div>
    `;

    // 3. CARD PAR CLICK EVENT (Popup kholna)
    card.addEventListener('click', () => {
      // Data set karna
      titleEl.innerText = resource.title;
      descriptionEl.innerText = resource.description; // Assuming you have a description property
      iframe.src = `docs/${resource.pdfFile}`;
      downloadBtn.href = `docs/${resource.pdfFile}`;
      downloadBtn.setAttribute('download', resource.title + ".pdf"); // Download name

      // Modal open
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });

    galleryContainer.appendChild(card);
  });

  // 5. MODAL BAND KARNA
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => { iframe.src = ""; }, 300); // Popup band hone ke baad iframe khali karna taaki memory bache
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});