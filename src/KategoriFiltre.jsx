import React from "react";

function KategoriFiltre({ kategori, onKategoriChange }) {
  return (
    <div>
      <label htmlFor="kategori">Kategoriye göre filtrele:</label>
      <select id="kategori" value={kategori} onChange={onKategoriChange}>
        <option value="Tümü">Tümü</option>
        <option value="Sanat Tarihi">Sanat Tarihi</option>
        <option value="Müzik Teorisi">Müzik Teorisi</option>
        <option value="Sanat">Sanat</option>
        <option value="Müzik">Müzik</option>
        <option value="Felsefe">Felsefe</option>
      </select>
    </div>
  );
}

export default KategoriFiltre;