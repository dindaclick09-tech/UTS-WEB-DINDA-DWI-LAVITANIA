// 1. Modul Kalkulator Estimasi Biaya Proyek (Fungsi & Manipulasi DOM)
function calculateTotal() {
    const basePrice = parseInt(document.getElementById('projectType').value) || 0;
    const pageCount = parseInt(document.getElementById('pageCount').value) || 1;
    const pricePerPage = 100000;

    let featureTotal = 0;
    const featureCheckboxes = document.querySelectorAll('.feature-check:checked');
    featureCheckboxes.forEach(checkbox => {
        featureTotal += parseInt(checkbox.value) || 0;
    });

    const grandTotal = basePrice + (pageCount * pricePerPage) + featureTotal;

    // Tampilkan hasil ke DOM
    const resultBox = document.getElementById('resultBox');
    const totalPriceEl = document.getElementById('totalPrice');
    
    totalPriceEl.textContent = "Rp " + grandTotal.toLocaleString('id-ID');
    resultBox.classList.remove('d-none');
}

// 2. Fitur Live Filter / Search Proyek
const searchProject = document.getElementById('searchProject');

if (searchProject) {
    searchProject.addEventListener('keyup', function () {
        const filterValue = this.value.toLowerCase();
        const projectCards = document.querySelectorAll('.project-card');

        projectCards.forEach(card => {
            const title = card.getAttribute('data-title').toLowerCase();
            const tech = card.getAttribute('data-tech').toLowerCase();

            if (title.includes(filterValue) || tech.includes(filterValue)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// 3. Fitur Dark Mode Toggle (Manipulasi DOM)
const darkModeToggle = document.getElementById('darkModeToggle');

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        // Ganti teks tombol jika perlu
        if (document.body.classList.contains('dark-mode')) {
            darkModeToggle.innerHTML = '☀️ Light';
        } else {
            darkModeToggle.innerHTML = '🌙 Dark';
        }
    });
}

// 4. Validasi Form Kontak
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const message = document.getElementById('contactMessage').value.trim();
    const alertBox = document.getElementById('contactAlert');

    if (!name || !email || !message) {
        alertBox.innerHTML = `
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                Harap isi semua kolom formulir sebelum mengirim!
                <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
            </div>`;
        return;
    }

    alertBox.innerHTML = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
            Terima kasih, <strong>${name}</strong>! Pesan Anda telah berhasil dikirim.
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        </div>`;

    this.reset();
});
// --- Efek Fade-In Hanya Saat Disebut / Discroll (Scroll Reveal) ---
document.addEventListener("DOMContentLoaded", function () {
    const sections = document.querySelectorAll(".fade-in-section");

    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.15 // Animasi mulai berjalan saat section terlihat 15% di layar
    };

    const observer = new IntersectionObserver(function (entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target); // Animasi hanya berjalan sekali per section
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });
});