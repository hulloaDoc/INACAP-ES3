import { useEffect, useState } from 'react';
import roomService from '../services/roomService';

const emptyEvent = {
    title: '',
    description: '',
    date: '',
    location: '',
    roomId: '',
};

function EventForm({ initialEvent = null, onSubmit, onCancel }) {
    const [formData, setFormData] = useState(emptyEvent);
    const [errors, setErrors] = useState({});
    const [rooms, setRooms] = useState([]);

    useEffect(() => {
        const loadRooms = async () => {
            const data = await roomService.getRooms();
            setRooms(data);
        };

        loadRooms();
    }, []);

    useEffect(() => {
        setFormData(
            initialEvent
                ? {
                    ...emptyEvent,
                    ...initialEvent,
                    roomId: initialEvent.roomId || initialEvent.room?.id || '',
                }
                : emptyEvent
        );
        setErrors({});
    }, [initialEvent]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((current) => ({ ...current, [name]: value }));
    };

    const validate = () => {
        const nextErrors = {};

        if (!formData.title.trim()) {
            nextErrors.title = 'El título es obligatorio';
        }

        if (!formData.date) {
            nextErrors.date = 'La fecha es obligatoria';
        }

        return nextErrors;
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const nextErrors = validate();

        if (Object.keys(nextErrors).length > 0) {
            setErrors(nextErrors);
            return;
        }

        const payload = {
            ...formData,
            title: formData.title.trim(),
            description: formData.description.trim(),
            location: formData.location.trim(),
            roomId: formData.roomId || '',
        };

        if (onSubmit) {
            onSubmit(payload);
        }

        setFormData(emptyEvent);
        setErrors({});
    };

    return (
        <form className="card p-3 mb-4" onSubmit={handleSubmit}>
            <h3 className="h5">{initialEvent ? 'Editar evento' : 'Crear evento'}</h3>
            <div className="row g-3">
                <div className="col-md-6">
                    <label className="form-label">Título</label>
                    <input
                        className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                    />
                    {errors.title ? <div className="invalid-feedback">{errors.title}</div> : null}
                </div>
                <div className="col-md-6">
                    <label className="form-label">Fecha</label>
                    <input
                        className={`form-control ${errors.date ? 'is-invalid' : ''}`}
                        type="date"
                        name="date"
                        value={formData.date}
                        onChange={handleChange}
                    />
                    {errors.date ? <div className="invalid-feedback">{errors.date}</div> : null}
                </div>
                <div className="col-12">
                    <label className="form-label">Descripción</label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Ubicación</label>
                    <input
                        className="form-control"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                    />
                </div>
                <div className="col-12">
                    <label className="form-label">Sala</label>
                    <select className="form-select" name="roomId" value={formData.roomId} onChange={handleChange}>
                        <option value="">Seleccione una sala</option>
                        {rooms.map((room) => (
                            <option key={room.id} value={room.id}>
                                {room.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="mt-3 d-flex gap-2">
                <button className="btn btn-primary" type="submit">
                    {initialEvent ? 'Guardar cambios' : 'Crear evento'}
                </button>
                {initialEvent ? (
                    <button className="btn btn-outline-secondary" type="button" onClick={onCancel}>
                        Cancelar
                    </button>
                ) : null}
            </div>
        </form>
    );
}

export default EventForm;
