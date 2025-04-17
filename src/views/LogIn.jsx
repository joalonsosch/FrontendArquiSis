import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LogIn.module.css';

export default function LogIn() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registros = JSON.parse(localStorage.getItem('registro')) || [];

    const usuario = registros.find((u) => u.username === username);

    if (!usuario) {
      setError('Usuario no encontrado');
      return;
    }

    if (usuario.password !== password) {
      setError('Contraseña incorrecta');
      return;
    }

    localStorage.setItem('usuarioActivo', JSON.stringify(usuario));
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Iniciar sesión</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className={styles.input}
        />
        {error && <p className={styles.error}>{error}</p>}
        <button type="submit" className={styles.button}>
          Ingresar
        </button>
      </form>
    </div>
  );
}
