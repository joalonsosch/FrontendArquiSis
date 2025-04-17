import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SignIn.module.css';

export default function SignIn() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const registros = JSON.parse(localStorage.getItem('registro')) || [];

    const usernameTaken = registros.some((u) => u.username === username);
    const emailTaken = registros.some((u) => u.email === email);

    if (usernameTaken) {
      setError('Nombre de usuario ya utilizado');
      return;
    }

    if (emailTaken) {
      setError('Correo ya utilizado');
      return;
    }

    const nuevoUsuario = { username, email, password };
    const nuevosRegistros = [...registros, nuevoUsuario];
    localStorage.setItem('registro', JSON.stringify(nuevosRegistros));

    navigate('/login');
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2>Registro de nuevo usuario</h2>
        <input
          type="text"
          placeholder="Nombre de usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
          Registrarse
        </button>
      </form>
    </div>
  );
}
