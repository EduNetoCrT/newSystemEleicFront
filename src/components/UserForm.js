import { useState } from "react";
import "./UserForm.css";
function UserForm({ onSubmit, initialData = {} }) {
    const [formData, setFormData] = useState({
        name: initialData.name || "",
        email: initialData.email || "",
        password: initialData.password || "",
        role: initialData.role || "mesario",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="user-form">
            <h2>Usuário</h2>
            <label>
                Nome:
                <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Email:
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Senha:
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
            </label>
            <label>
                Função:
                <select name="role" value={formData.role} onChange={handleChange}>
                    <option value="admin">Admin</option>
                    <option value="mesario">Mesário</option>
                </select>
            </label>
            <button type="submit">Salvar</button>
        </form>
    );
}

export default UserForm;