document.addEventListener('DOMContentLoaded', () => {
  
  const pdfjsLib = window['pdfjs-dist/build/pdf'];
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';


  const pdfResources = [
    { id: "doc1", title: "What is SPARC?", pdfFile: "docs/resource/What is Sparc__compressed.pdf", 
        description: "SPARC Project is a European project that brings together patients, clinicians, researchers, policymakers, and innovators to help make personalised cancer care a reality across Europe." },
    { id: "doc2", title: "SPARC PCAG", pdfFile: "docs/resource/SPARC PCAG_compressed.pdf", 
        description: "SPARC has established its Patient and Caregiver Advisory Group (PCAG) to ensure that lived experience is meaningfully integrated into personalised cancer care across Europe. " },
    { id: "doc3", title: "SPARC Leaflet", pdfFile: "docs/resource/Sparc leaflet_compressed.pdf", 
        description: "A brief overview of the SPARC initiative." },
    { id: "doc4", title: "SPARC Leaflet 2", pdfFile: "docs/resource/Sparc leaflet 2_compressed.pdf", 
        description: "Additional information about the SPARC project." },
    
  ];

  const galleryContainer = document.getElementById('scg-pdf-gallery');
  const modal = document.getElementById('scg-pdf-modal');
  const closeBtn = document.getElementById('scg-pdf-close');
  const iframe = document.getElementById('scg-pdf-iframe');
  const downloadBtn = document.getElementById('scg-pdf-download-btn');
  const titleEl = document.getElementById('scg-pdf-title');

  const descriptionEl = document.getElementById('scg-pdf-description');

  
  pdfResources.forEach((resource, index) => {
    // HTML Card
    const card = document.createElement('div');
    card.className = 'scg-pdf-card';
    card.innerHTML = `
    <div class="scg-pdf-thumb-wrapper">
        <canvas id="pdf-canvas-${index}" class="scg-pdf-thumb-canvas"></canvas>
    </div>
    `; 
    // <div class="scg-pdf-info">
    //    <h4>${resource.title}</h4>
    // </div>

    galleryContainer.appendChild(card);

    // ==========================================
    // PDF Thumbnail Render (Use PDF first page to create thumbnail)
    // ==========================================
    const canvas = document.getElementById(`pdf-canvas-${index}`);
    const ctx = canvas.getContext('2d');

    pdfjsLib.getDocument(resource.pdfFile).promise.then(pdf => {
      return pdf.getPage(1); // select first page for thumbnail
    }).then(page => {
      const viewport = page.getViewport({ scale: 1.5 }); // for better resolution, you can adjust the scale
      canvas.width = viewport.width;
      canvas.height = viewport.height;
      
      const renderContext = {
        canvasContext: ctx,
        viewport: viewport
      };
      page.render(renderContext);
    }).catch(err => {
      console.error("Error loading PDF thumbnail:", err);
    });

    // ==========================================
    // Click Event to Open Modal with PDF
    // ==========================================
    card.addEventListener('click', () => {
      titleEl.innerText = resource.title;
      iframe.src = resource.pdfFile + '#toolbar=0&navpanes=0&view=FitH';
      descriptionEl.innerText = resource.description;
      downloadBtn.href = resource.pdfFile;
      downloadBtn.setAttribute('download', resource.title + ".pdf"); 
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  // 5. Close Modal Functionality
  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = 'auto';
    setTimeout(() => { iframe.src = ""; }, 300); // Clear iframe src after modal close to stop PDF rendering and free up memory
  };

  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
});