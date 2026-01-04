# Secret Vault - Gestor Seguro de Contraseñas, Contactos y Notas 

**Secret Vault** es una aplicación de escritorio multiplataforma desarrollada con **Tauri**, **React**, **TypeScript**, **TailwindCSS** y **SQLCipher**. Permite gestionar contraseñas, notas y contactos de manera segura, con autenticación de usuario y operaciones CRUD completas. Todos los datos se almacenan cifrados localmente.

---

## Características principales

* **Autenticación segura**
  * Registro y login.
  * Validación de credenciales antes de acceder a la app.

* **Gestión de contraseñas**

  * Crear, leer, actualizar y eliminar registros.
  * Generador de contraseñas seguras.
  * Búsqueda avanzada.

* **Gestión de notas**

  * CRUD completo de notas privadas.
  * Edición y eliminación segura.

* **Gestión de contactos**

  * CRUD completo de contactos con teléfono y email.

* **Seguridad**

  * Cifrado de datos con **SQLCipher**.
  * Contraseña maestra.
  * Operaciones locales, sin dependencia de servidores externos.

* **Interfaz moderna**

  * UI responsiva con **TailwindCSS**.
  * Modo claro y oscuro.
  * Multiplataforma: Windows, macOS y Linux.

---

## Tecnologías

* **Frontend:** React, TypeScript, TailwindCSS
* **Backend:** Rust + Tauri
* **Base de datos:** SQLCipher (SQLite cifrado)
* **Gestión de estado:** Zustand o Context API

---

## Requisitos
  * Rust (estable)
  * Cargo
  * SQLCipher instalado o compilado en el sistema.
  * Windows: `libsqlcipher-sys` y OpenSSL correctamente configurados.

---

## Configuración de la contraseña maestra

La aplicación necesita una **contraseña maestra** para acceder a la base de datos cifrada. Esta contraseña se define en un archivo Rust llamado `secret.rs`.

### Cómo usarlo

1. Crea el archivo `src-tauri/secret.rs`.
2. Define la contraseña dentro del archivo así:

```rust
pub const MASTER_PASSWORD: &str = "cambia-esta-clave";
```

3. Guarda el archivo. La app lo leerá automáticamente al iniciar.

### Por qué este método

* Garantiza que la contraseña siempre esté disponible en **desarrollo y producción**.
* Evita que la app se cierre de forma inesperada por variables faltantes.
* Mantiene la contraseña fuera de git y del repositorio, protegiendo tu seguridad.
* Facilita que cualquiera que clone el proyecto sepa cómo configurarlo correctamente.

---

## Base de datos
* SQLCipher (SQLite cifrado)
* La base de datos se crea automáticamente en `%APPDATA%/<identificado>/Secret Vault/database/Database.db`.
* Si la DB no existe, se crea y se aplican los PRAGMAs de seguridad.

## Consideraciones de seguridad

* Se usa `SecretString` para manejar la contraseña en memoria.
* Se aplican los PRAGMAs:

  * `cipher_memory_security = ON`
  * `journal_mode = WAL`
  * `foreign_keys = ON`
  * `secure_delete = ON`
* La contraseña se deriva con Argon2 usando un salt persistente.

---

## Estructura del proyecto

```
secret-vault/
│
├─ public/                    # Recursos estáticos
│
├─ src/                       # Frontend (React + TypeScript)
│   ├─ assets/
│   │    └─ icons/                         
│   ├─ components/            # Componentes reutilizables
│   ├─ hooks/                 # Custom hooks y Zustand 
│   ├─ lib/                 
│   ├─ types/                 # Type e Interface
│   ├─ App.css                # TailwindCSS
│   ├─ App.tsx
│   └─ main.tsx
│
│
├─ src-tauri/                 # Código Rust de Tauri
│   └─ src
│       ├─ commands/          # Funciones Rust expuestas a JS
│       ├─ db/                # Configuración de la DB
│       ├─ models/            # Manejo de SQLCipher y CRUD
│       ├─ security/          # Funciones de seguridad
│       ├─ lib.rs
│       ├─ main.rs            # Punto de entrada
│       ├─ secret.rs
│       ├─ state.rs           # Estado en Tauri
│       ├─ Cargo.toml         
│       └─ tauri.conf.json    # Configuración de Tauri    
│
├─ package.json
└─ README.md
```

---

## Instalación

```bash
# Instalar dependencias del proyecto
npm install

# Instalar dependencias de tauri en /src-tauri
cargo build
```

### Ejecución en desarrollo

```bash
# Ejecutar la aplicación en modo desarrollo
npm run tauri dev
```

### Build para producción

```bash
# Generar ejecutables multiplataforma
npm run tauri build
```

---

## Acceso rápido a comandos
- [Abrir VSCode](vscode.cmd)
- [Ejecución en desarrollo](tauri-dev.cmd)
- [Build para producción](tauri-dev.cmd)
- [Eliminar los archivos compilados](src-tauri/cargo-clean.cmd)
- [Compila el proyecto Rust](src-tauri/cargo-build.cmd)

---

## Galería

---

## Contribuciones

Las contribuciones son bienvenidas.
Proceso recomendado:

1. Haz un fork del proyecto.
2. Crea una rama de feature: `git checkout -b feature/nueva-funcionalidad`.
3. Haz commit de tus cambios: `git commit -m "Agrega nueva funcionalidad"`.
4. Haz push a tu rama: `git push origin feature/nueva-funcionalidad`.
5. Abre un Pull Request.

---

## Licencia

[Creative Commons Attribution-NonCommercial-NoDerivatives 4.0](LICENSE)