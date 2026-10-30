const menuToggle = document.querySelector("#menuToggle");
const navLinks = document.querySelector("#navLinks");

// Membuka dan menutup menu di HP
menuToggle.addEventListener("click", function () {
  const isOpen = navLinks.classList.toggle("open");

  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.setAttribute(
    "aria-label",
    isOpen ? "Tutup menu navigasi" : "Buka menu navigasi"
  );

  menuToggle.textContent = isOpen ? "✕" : "☰";
});

// Menutup menu setelah salah satu tautan dipilih
navLinks.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", function () {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Buka menu navigasi");
    menuToggle.textContent = "☰";
  });
});

// Tombol mulai belajar menuju bagian fitur
document.querySelectorAll('a[href="#fitur"]').forEach(function (link) {
  link.addEventListener("click", function () {
    console.log("Pengunjung membuka bagian fitur CIVIVERSE.");
  });
});


// ==========================================
// CIVIVERSE - PASALPEDIA
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const searchPasal = document.getElementById("searchPasal");
    const kartuPasal = document.querySelectorAll(".pasal-card");
    const tombolFilter = document.querySelectorAll(".pasal-filter");
    const pesanKosong = document.getElementById("pasalKosong");

    let kategoriAktif = "semua";

    // Fungsi pencarian dan filter pasal
    function filterPasal() {

        const kataKunci = searchPasal.value.toLowerCase().trim();


        const daftarFavorit = JSON.parse(
    localStorage.getItem("civiverseFavorit") || "[]"
);

        let jumlahTampil = 0;

        kartuPasal.forEach(function (kartu) {

            const judul = kartu.querySelector("h3").textContent.toLowerCase();

            const kataKunciTambahan = kartu.dataset.search.toLowerCase();

            const nomorPasal = kartu.querySelector(".pasal-number")
                .textContent.toLowerCase();

            const cocokPencarian =
                judul.includes(kataKunci) ||
                kataKunciTambahan.includes(kataKunci) ||
                nomorPasal.includes(kataKunci);

           const tombolBintang = kartu.querySelector(".pasal-favorite");
const nomorFavorit = tombolBintang
    ? tombolBintang.dataset.favorite
    : "";

const cocokKategori =
    kategoriAktif === "semua" ||
    (
        kategoriAktif === "favorit"
            ? daftarFavorit.includes(nomorFavorit)
            : kartu.dataset.category === kategoriAktif
    );

            const tampil = cocokPencarian && cocokKategori;

            kartu.hidden = !tampil;

            if (tampil) {
                jumlahTampil++;
            }

        });

        pesanKosong.hidden = jumlahTampil > 0;
    }

    // Menjalankan pencarian ketika pengunjung mengetik
    if (searchPasal) {
        searchPasal.addEventListener("input", filterPasal);
    }

    // Mengaktifkan tombol filter kategori
    tombolFilter.forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            kategoriAktif = tombol.dataset.category;

            tombolFilter.forEach(function (item) {
                item.classList.remove("active");
            });

            tombol.classList.add("active");

            filterPasal();

        });

    });

    console.log("PasalPedia berhasil dimuat!");

});


// ========================================
// CIVIVERSE - TOMBOL DETAIL PASALPEDIA
// ========================================

document.addEventListener("DOMContentLoaded", function () {

    const modal = document.getElementById("pasalModal");
    const modalTitle = document.getElementById("pasalModalTitle");
    const modalBody = document.getElementById("pasalModalBody");

    const tombolTutup = document.getElementById("pasalClose");
    const tombolSelesai = document.getElementById("pasalDone");

    const dataPasal = {
        "31": {
            judul: "Pasal 31 — Hak atas Pendidikan",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 31 UUD 1945 membahas hak warga negara
                    atas pendidikan serta tanggung jawab negara
                    dalam penyelenggaraan pendidikan.
                </p>

                <h3>Contoh dalam Kehidupan</h3>
                <p>
                    Siswa mendapatkan kesempatan untuk belajar
                    dan memperoleh pendidikan.
                </p>
            `
        },

        "28A": {
            judul: "Pasal 28A — Hak untuk Hidup",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 28A menjamin hak setiap orang untuk hidup
                    serta mempertahankan hidup dan kehidupannya.
                </p>

                <h3>Contoh dalam Kehidupan</h3>
                <p>
                    Menghormati keselamatan dan hak orang lain.
                </p>
            `
        },

        "28E": {
            judul: "Pasal 28E — Kebebasan dan Hak",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 28E mengatur sejumlah hak dan kebebasan,
                    termasuk kebebasan beragama dan menyatakan
                    pikiran sesuai ketentuan konstitusi.
                </p>

                <h3>Contoh dalam Kehidupan</h3>
                <p>
                    Menghargai perbedaan pendapat dan
                    menyampaikan pendapat dengan sopan.
                </p>
            `
        },

        "1": {
            judul: "Pasal 1 — Bentuk dan Kedaulatan Negara",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 1 mengatur bentuk negara Indonesia,
                    kedaulatan rakyat, dan prinsip negara hukum.
                </p>

                <ul>
                    <li>Indonesia adalah Negara Kesatuan berbentuk Republik.</li>
                    <li>Kedaulatan berada di tangan rakyat dan dilaksanakan menurut UUD.</li>
                    <li>Negara Indonesia adalah negara hukum.</li>
                </ul>
            `
        },

        "30": {
            judul: "Pasal 30 Ayat (1) — Pertahanan dan Keamanan Negara",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 30 ayat (1) mengatur hak dan kewajiban
                    setiap warga negara untuk ikut serta dalam
                    usaha pertahanan dan keamanan negara.
                </p>

                <h3>Contoh dalam Kehidupan</h3>
                <p>
                    Menjaga keamanan dan ketertiban lingkungan,
                    mengikuti kegiatan siskamling sesuai kemampuan,
                    serta mematuhi peraturan yang berlaku.
                </p>
            `
        },

        "28J": {
            judul: "Pasal 28J Ayat (1) — Menghormati Hak Orang Lain",
            isi: `
                <h3>Pokok Materi</h3>
                <p>
                    Pasal 28J ayat (1) menjelaskan bahwa setiap
                    orang wajib menghormati hak asasi manusia
                    orang lain dalam kehidupan bermasyarakat,
                    berbangsa, dan bernegara.
                </p>

                <h3>Contoh dalam Kehidupan</h3>
                <p>
                    Menghargai pendapat teman saat berdiskusi,
                    tidak mengganggu privasi orang lain,
                    dan tidak melakukan perundungan.
                </p>
            `
        }
    };

    // Mengaktifkan tombol Pelajari Pasal
    document.querySelectorAll(".pasal-read").forEach(function (tombol) {

        tombol.addEventListener("click", function () {

            const nomorPasal = tombol.dataset.pasal;
            const data = dataPasal[nomorPasal];

            if (!modal || !modalTitle || !modalBody) {
                console.error("Elemen detail pasal tidak ditemukan di HTML.");
                return;
            }

            if (!data) {
                console.error("Data pasal tidak ditemukan:", nomorPasal);
                return;
            }

            modalTitle.textContent = data.judul;
            modalBody.innerHTML = data.isi;

            modal.classList.add("show");
            modal.setAttribute("aria-hidden", "false");

            document.body.style.overflow = "hidden";
        });

    });

    // Fungsi menutup jendela detail
    function tutupModal() {

        if (!modal) return;

        modal.classList.remove("show");
        modal.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";
    }

    if (tombolTutup) {
        tombolTutup.addEventListener("click", tutupModal);
    }

    if (tombolSelesai) {
        tombolSelesai.addEventListener("click", tutupModal);
    }

    if (modal) {
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                tutupModal();
            }
        });
    }

    document.addEventListener("keydown", function (event) {
        if (
            event.key === "Escape" &&
            modal &&
            modal.classList.contains("show")
        ) {
            tutupModal();
        }
    });

    console.log("CIVIVERSE: Detail PasalPedia siap!");

});


/* =====================================
   CIVIVERSE — FUNGSI PASAL FAVORIT
===================================== */

document.addEventListener("DOMContentLoaded", function () {

    const tombolFavorit = document.querySelectorAll(".pasal-favorite");

    let daftarFavorit = JSON.parse(
        localStorage.getItem("civiverseFavorit") || "[]"
    );

     function perbaruiTampilan() {
        tombolFavorit.forEach(function (tombol) {
            const nomor = tombol.dataset.favorite;
            const aktif = daftarFavorit.includes(nomor);

            tombol.classList.toggle("active", aktif);
            tombol.textContent = aktif ? "★ Favorit" : "☆ Favorit";
            tombol.setAttribute("aria-pressed", String(aktif));
        });

        const penghitung = document.getElementById("jumlahFavorit");

if (penghitung) {
    penghitung.textContent =
        "⭐ " + daftarFavorit.length + " Pasal Favorit";
}
    }

    perbaruiTampilan();


    tombolFavorit.forEach(function (tombol) {
        tombol.addEventListener("click", function () {

            const nomor = tombol.dataset.favorite;

            if (daftarFavorit.includes(nomor)) {
                daftarFavorit = daftarFavorit.filter(
                    item => item !== nomor
                );
            } else {
                daftarFavorit.push(nomor);
            }

            localStorage.setItem(
                "civiverseFavorit",
                JSON.stringify(daftarFavorit)
            );

            perbaruiTampilan();
        });
    });

    perbaruiTampilan();

});


// ==============================
// KUIS CIVIVERSE
// ==============================

const soalKuis = [
    {
        tanya: "Pasal 31 UUD 1945 membahas tentang apa?",
        pilihan: [
            "Hak atas pendidikan",
            "Pertahanan negara",
            "Kebudayaan nasional",
            "Kesejahteraan sosial"
        ],
        jawaban: 0
    },
    {
        tanya: "Pasal 28A mengatur tentang hak untuk ...",
        pilihan: [
            "Bekerja",
            "Hidup",
            "Berpendapat",
            "Mendapat pendidikan"
        ],
        jawaban: 1
    },
    {
        tanya: "Apa bentuk negara Indonesia menurut Pasal 1 ayat (1)?",
        pilihan: [
            "Kerajaan",
            "Federal",
            "Kesatuan berbentuk Republik",
            "Serikat"
        ],
        jawaban: 2
    },
    {
        tanya: "Pasal 32 ayat (1) membahas tentang ...",
        pilihan: [
            "Pertahanan negara",
            "Memajukan kebudayaan nasional",
            "Hak pendidikan",
            "Hak hidup"
        ],
        jawaban: 1
    },
    {
        tanya: "Menurut Pasal 34 ayat (1), siapa yang dipelihara oleh negara?",
        pilihan: [
            "Seluruh wisatawan",
            "Fakir miskin dan anak terlantar",
            "Semua pengusaha",
            "Seluruh pejabat"
        ],
        jawaban: 1
    },
    {
        tanya: "Pasal 28J ayat (1) mengajarkan kita untuk ...",
        pilihan: [
            "Menghormati hak orang lain",
            "Memaksakan pendapat",
            "Mengabaikan aturan",
            "Membatasi pendidikan"
        ],
        jawaban: 0
    },
    {
        tanya: "Pasal 30 ayat (1) mengatur hak dan kewajiban warga negara dalam ...",
        pilihan: [
            "Pendidikan",
            "Kebudayaan",
            "Pertahanan dan keamanan",
            "Perekonomian"
        ],
        jawaban: 2
    },
    {
        tanya: "Pasal 27 ayat (1) menjamin persamaan kedudukan dalam ...",
        pilihan: [
            "Hukum dan pemerintahan",
            "Perdagangan",
            "Kesenian",
            "Olahraga"
        ],
        jawaban: 0
    },
    {
        tanya: "Menghargai teman yang berbeda agama merupakan contoh penerapan ...",
        pilihan: [
            "Pasal 28E",
            "Pasal 31",
            "Pasal 34",
            "Pasal 1"
        ],
        jawaban: 0
    },
    {
        tanya: "Mengapa hak dan kewajiban harus dilaksanakan secara seimbang?",
        pilihan: [
            "Agar bebas melanggar aturan",
            "Agar kehidupan tertib dan saling menghormati",
            "Agar hak orang lain diabaikan",
            "Agar kewajiban tidak perlu dilakukan"
        ],
        jawaban: 1
    }
];

let nomorSekarang = 0;
let skor = 0;
let sudahMenjawab = false;

function tampilkanSoal() {
    sudahMenjawab = false;

    const soal = soalKuis[nomorSekarang];

    document.getElementById("nomorSoal").textContent =
        `Soal ${nomorSekarang + 1} dari ${soalKuis.length}`;

    document.getElementById("pertanyaan").textContent =
        soal.tanya;

    const areaPilihan =
        document.getElementById("pilihanJawaban");

    areaPilihan.innerHTML = "";

    soal.pilihan.forEach((pilihan, index) => {
        const tombol = document.createElement("button");

        tombol.textContent = pilihan;
        tombol.className = "pilihan-kuis";

        tombol.onclick = () => pilihJawaban(index, tombol);

        areaPilihan.appendChild(tombol);
    });

    document.getElementById("tombolSelanjutnya").disabled = true;

    document.getElementById("tombolSelanjutnya").textContent =
        nomorSekarang === soalKuis.length - 1
            ? "Lihat Hasil"
            : "Soal Selanjutnya";
}

function pilihJawaban(index, tombolDipilih) {
    if (sudahMenjawab) return;

    sudahMenjawab = true;

    const soal = soalKuis[nomorSekarang];
    const semuaTombol = document.querySelectorAll(".pilihan-kuis");

    semuaTombol.forEach((tombol, i) => {
        tombol.disabled = true;

        if (i === soal.jawaban) {
            tombol.classList.add("jawaban-benar");
        }
    });

    if (index === soal.jawaban) {
        skor++;
    } else {
        tombolDipilih.classList.add("jawaban-salah");
    }

    document.getElementById("tombolSelanjutnya").disabled = false;
}

function soalBerikutnya() {
    if (!sudahMenjawab) return;

    nomorSekarang++;

    if (nomorSekarang < soalKuis.length) {
        tampilkanSoal();
    } else {
        tampilkanHasil();
    }
}

function tampilkanHasil() {
    document.getElementById("areaKuis").style.display = "none";
    document.getElementById("hasilKuis").style.display = "block";

    const nilai = skor * 10;

    document.getElementById("nilaiKuis").textContent =
        `Jawaban benar: ${skor} dari ${soalKuis.length}. Nilaimu: ${nilai}`;
}

function mulaiKuis() {
    nomorSekarang = 0;
    skor = 0;

    document.getElementById("areaKuis").style.display = "block";
    document.getElementById("hasilKuis").style.display = "none";

    tampilkanSoal();
}

// Jalankan kuis saat halaman dimuat
tampilkanSoal();


// ==============================
// MISI WARGA NEGARA CIVIVERSE
// ==============================

const daftarTugasMisi = [
    {
        judul: "Taat Aturan",
        deskripsi: "Patuhi tata tertib sekolah dan aturan yang berlaku.",
        contoh: "Datang ke sekolah tepat waktu.",
        kategori: "Kedisiplinan"
    },
    {
        judul: "Menghargai Perbedaan",
        deskripsi: "Hormati teman yang memiliki perbedaan agama, suku, dan pendapat.",
        contoh: "Berteman tanpa membeda-bedakan.",
        kategori: "Toleransi"
    },
    {
        judul: "Menjaga Lingkungan",
        deskripsi: "Ikut menjaga kebersihan dan kelestarian lingkungan.",
        contoh: "Membuang sampah pada tempatnya.",
        kategori: "Lingkungan"
    },
    {
        judul: "Menghormati Hak Orang Lain",
        deskripsi: "Jangan mengganggu hak dan privasi orang lain.",
        contoh: "Mendengarkan teman ketika berbicara.",
        kategori: "Hak dan Kewajiban"
    },
    {
        judul: "Cinta Budaya Indonesia",
        deskripsi: "Kenali dan lestarikan kebudayaan bangsa.",
        contoh: "Mempelajari tarian atau lagu daerah.",
        kategori: "Kebudayaan"
    },
    {
        judul: "Gotong Royong",
        deskripsi: "Bekerja sama membantu masyarakat sekitar.",
        contoh: "Ikut kerja bakti membersihkan lingkungan.",
        kategori: "Persatuan"
    }
];

let misiSelesai = JSON.parse(
    localStorage.getItem("civiverseMisiSelesai") || "[]"
);

function tampilkanMisi() {
    const tempatMisi = document.getElementById("daftarMisi");

    tempatMisi.innerHTML = "";

    daftarTugasMisi.forEach((misi, index) => {
        const sudahSelesai = misiSelesai.includes(index);

        const kartu = document.createElement("div");
        kartu.className = "misi-card";

        kartu.innerHTML = `
            <span class="misi-kategori">${misi.kategori}</span>
            <h3>${misi.judul}</h3>
            <p>${misi.deskripsi}</p>
            <p><strong>Contoh:</strong> ${misi.contoh}</p>

            <button
                class="tombol-misi"
                ${sudahSelesai ? "disabled" : ""}
                onclick="selesaikanMisi(${index})"
            >
                ${sudahSelesai ? "✓ Misi Selesai" : "Tandai Selesai"}
            </button>
        `;

        tempatMisi.appendChild(kartu);
    });

    perbaruiProgresMisi();
}

function selesaikanMisi(index) {
    if (misiSelesai.includes(index)) return;

    misiSelesai.push(index);

    localStorage.setItem(
        "civiverseMisiSelesai",
        JSON.stringify(misiSelesai)
    );

    tampilkanMisi();
}

function perbaruiProgresMisi() {
    const total = daftarTugasMisi.length;
    const selesai = misiSelesai.length;
    const persentase = (selesai / total) * 100;

    document.getElementById("progresMisi").textContent =
        `${selesai} dari ${total} misi selesai`;

    document.getElementById("progressBar").style.width =
        `${persentase}%`;
}

tampilkanMisi();