import React from "react";
import AramaCubugu from "./AramaCubugu.jsx";
import KategoriFiltre from "./KategoriFiltre";
import KitapListe from "./KitapListe";
import FavoriPaneli from "./FavoriPaneli";


const baslangicKitaplar = [
  {
    id: 401,
    baslik: "Görsel Sanatlar Tarihi",
    yazar: "E.H. Gombrich",
    kategori: "Sanat Tarihi",
    favorideMi: true,
  },
  {
    id: 402,
    baslik: "Müzikte Biçimler",
    yazar: "A. Schaeffer",
    kategori: "Müzik Teorisi",
    favorideMi: false,
  },
  {
    id: 403,
    baslik: "Rönesans Ustaları",
    yazar: "Giorgio Vasari",
    kategori: "Sanat",
    favorideMi: true,
  },
  {
    id: 404,
    baslik: "Cazın Yüz Yılı",
    yazar: "Ted Gioia",
    kategori: "Müzik",
    favorideMi: false,
  },
  {
    id: 405,
    baslik: "Fotoğrafın Felsefesi",
    yazar: "Vilém Flusser",
    kategori: "Felsefe",
    favorideMi: false,
  },
];

const getStorageItem = (key, defaultValue) => {
  const savedItem = localStorage.getItem(key);
  return savedItem ? JSON.parse(savedItem) : defaultValue;
};

function App() {
  const [kitaplar, setKitaplar] = React.useState(
    getStorageItem("kitaplar_v4", baslangicKitaplar)
  );

  const [aramaMetni, setAramaMetni] = React.useState(
    getStorageItem("aramaMetni_v4", "")
  );

  const [kategori, setKategori] = React.useState("Tümü");

  React.useEffect(() => {
    localStorage.setItem("aramaMetni_v4", JSON.stringify(aramaMetni));
  }, [aramaMetni]);

  React.useEffect(() => {
    localStorage.setItem("kitaplar_v4", JSON.stringify(kitaplar));
  }, [kitaplar]);

  const handleArama = (event) => {
    setAramaMetni(event.target.value);
  };

  const handleKategori = (event) => {
    setKategori(event.target.value);
  };

  const handleFavoriToggle = (id) => {
    setKitaplar(
      kitaplar.map((kitap) =>
        kitap.id === id ? { ...kitap, favorideMi: !kitap.favorideMi } : kitap
      )
    );
  };

  const filtrelenmisKitaplar = kitaplar.filter((kitap) => {
    const aramaKosulu =
      kitap.baslik.toLowerCase().includes(aramaMetni.toLowerCase()) ||
      kitap.yazar.toLowerCase().includes(aramaMetni.toLowerCase());

    const kategoriKosulu = kategori === "Tümü" || kitap.kategori === kategori;

    return aramaKosulu && kategoriKosulu;
  });

  const favoriKitaplar = kitaplar.filter((kitap) => kitap.favorideMi);

  return (
    <>
      <h1>Sanat ve Müzik Kitaplığı</h1>

      <div className="kontrol-paneli">
        <AramaCubugu aramaMetni={aramaMetni} onSearch={handleArama} />
        <KategoriFiltre
          kategori={kategori}
          onKategoriChange={handleKategori}
        />
      </div>

      <div className="ana-icerik">
        <KitapListe
          kitaplar={filtrelenmisKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />
        <FavoriPaneli
          favoriler={favoriKitaplar}
          onFavoriToggle={handleFavoriToggle}
        />
      </div>
    </>
  );
}

export default App;