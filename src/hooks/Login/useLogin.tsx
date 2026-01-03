import { invoke } from "@tauri-apps/api/core";
import React, { useState } from "react";
import useApp from "../useApp";

function useLogin() {
  const [showSignup, setShowSignup] = useState<boolean>(false);
  const [password, setPassword] = useState<string>('')
  const [username, setUsername] = useState<string>('')
  const [error, setError] = useState('');
  const [loading, setLoading] = useState<boolean>(false);

  const { setIdUser, setIsLoggedIn } = useApp()

  const assignUsername = useApp(state => state.setUsername);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();

    setError('')
    
    if (username.trim().length < 3) {
      setError('El nombre de usuario debe tener al menos 3 caracteres');
      return;
    }
    
    if (password.trim().length < 8) {
      setError('La contraseña debe tener al menos 8 caracteres');
      return;
    }

    setLoading(true);

    if (showSignup) {
      await invoke<{id_user: string, username: string}>('signup', { username, password })
        .then((value) => {
          setIdUser(value.id_user)
          assignUsername(value.username)
          setIsLoggedIn(true)
          setError('');
        })
        .catch((error) => {
          setIdUser('')
          assignUsername('')
          setIsLoggedIn(false)
          setError(error);
        })
      
      setLoading(false)
      return
    } 

    await invoke<{id_user: string, username: string}>('login', { username, password })
      .then((value) => {
        setIdUser(value.id_user)
        assignUsername(value.username)
        setIsLoggedIn(true)
        setError('');
      })
      .catch((error) => {
        setIdUser('')
        assignUsername('')
        setIsLoggedIn(false)
        setError(error);
      })
      
    setLoading(false)
  };

  const changeSignup = () => {
    setShowSignup(state => !state)
    setError('')
    setPassword('')
    setUsername('')
  }

  return {
    showSignup, 
    password, 
    setPassword, 
    username, 
    setUsername, 
    error, 
    loading, 
    handleSubmit,
    changeSignup
  }
}

export default useLogin