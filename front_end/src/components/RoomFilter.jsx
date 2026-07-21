export default function RoomFilter({ salas, salaSeleccionada, onChange }) {
  return (
    <div className="room-filter">
      <label htmlFor="room-select">Sala: </label>
      <select
        id="room-select"
        value={salaSeleccionada}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="todas">Todas</option>
        {salas.map((sala) => (
          <option key={sala} value={sala}>
            {sala}
          </option>
        ))}
      </select>
    </div>
  );
}
