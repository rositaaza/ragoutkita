// public/script.js (atau lokasi script.js Anda)

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageSections = document.querySelectorAll('.page-section');

    // --- Fungsi Pembantu untuk Menampilkan Alert dan Mengarahkan ke Instagram DM ---
    const showProcessingAndRedirectToInstagramDM = () => {
        const instagramUsername = 'mara_ragout'; // Username Instagram Anda
        const instagramUrl = `https://www.instagram.com/${instagramUsername}/`; // Link ke profil Instagram

        // Tampilkan alert
        alert(`Ya, pesanan kamu sedang di proses. Kami akan segera mengarahkanmu ke Instagram @${instagramUsername}.\n\nMohon klik tombol 'Pesan' atau 'Message' setelah sampai di sana untuk melanjutkan pemesanan!`);

        // Tunggu sebentar (misal 500ms) sebelum redirect untuk memberi waktu user membaca alert
        setTimeout(() => {
            window.open(instagramUrl, '_blank');
        }, 500); // 0.5 detik delay
    };

    // --- Navigasi Sidebar ---
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            navLinks.forEach(nav => nav.classList.remove('active'));
            e.currentTarget.classList.add('active');

            pageSections.forEach(section => section.classList.remove('active'));
            
            const targetPageId = e.currentTarget.dataset.page;
            const targetSection = document.getElementById(targetPageId);
            if (targetSection) {
                targetSection.classList.add('active');
            }

            document.querySelector('.content').scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Mengatur section default yang aktif saat halaman pertama kali dimuat
    const initialHash = window.location.hash.substring(1);
    let initialPage = 'dashboard';

    if (initialHash) {
        const foundLink = document.querySelector(`.nav-link[data-page="${initialHash}"]`);
        if (foundLink) {
            initialPage = initialHash;
        }
    }

    const initialNavLink = document.querySelector(`.nav-link[data-page="${initialPage}"]`);
    const initialSection = document.getElementById(initialPage);
    if (initialNavLink && initialSection) {
        initialNavLink.classList.add('active');
        initialSection.classList.add('active');
    } else {
        document.querySelector('.nav-link[data-page="dashboard"]').classList.add('active');
        document.getElementById('dashboard').classList.add('active');
    }

    // --- Fungsionalitas Tombol "Pesan Sekarang" di Halaman Produk ---
    const orderProductButtons = document.querySelectorAll('.btn-order-product');
    orderProductButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Kita tidak lagi mengirim detail produk ke IG DM secara otomatis
            // karena IG DM tidak mendukung pre-filled text semudah WA.
            // Pengguna akan diarahkan ke profil dan harus memulai chat manual.
            showProcessingAndRedirectToInstagramDM();
        });
    });

    // --- Fungsionalitas Submit Formulir Pemesanan ---
    const orderForm = document.querySelector('.order-form');
    if (orderForm) {
        orderForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const nama = document.getElementById('nama').value;
            const telepon = document.getElementById('telepon').value;
            const alamat = document.getElementById('alamat').value;
            const produkSelect = document.getElementById('produk');
            const produk = produkSelect.options[produkSelect.selectedIndex].text;
            const jumlah = document.getElementById('jumlah').value;
            const catatan = document.getElementById('catatan').value;

            // Validasi sederhana: pastikan produk sudah dipilih
            if (produkSelect.value === "") {
                alert("Mohon pilih produk yang ingin dipesan.");
                return;
            }

            // Pesan ini hanya untuk konfirmasi internal Anda atau jika Anda ingin arahkan ke WA lagi
            // Namun, karena sekarang ke IG DM, pesan ini tidak akan terkirim secara otomatis.
            // Anda bisa simpan ini di database jika ada backend, atau hilangkan saja.
            let messageForYourRecord = `*Pesanan Baru (via Formulir Web):*\n\n`;
            messageForYourRecord += `*Nama:* ${nama}\n`;
            messageForYourRecord += `*No. Telepon/WA:* ${telepon}\n`;
            messageForYourRecord += `*Alamat:* ${alamat}\n`;
            messageForYourRecord += `*Produk:* ${produk}\n`;
            messageForYourRecord += `*Jumlah:* ${jumlah} Box/Pack\n`;
            if (catatan) {
                messageForYourRecord += `*Catatan:* ${catatan}\n`;
            }
            messageForYourRecord += `\n_Pelanggan akan dihubungi via IG DM._`;

            // Arahkan ke Instagram DM setelah submit form
            showProcessingAndRedirectToInstagramDM();

            // Reset form setelah submit (setelah alert dan redirect dipicu)
            orderForm.reset();
        });
    }
});