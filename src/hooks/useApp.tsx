import { create } from 'zustand'
import { TypeContact, TypePassword } from '../types/types'
import { applyTheme, getSystemTheme } from '../lib/theme';

export type ThemeMode = "light" | "dark" | "system";
export type ErrorReceived = { title?: string, message: string }

const THEME_KEY = "app-theme";

type App = {
  theme: ThemeMode
  resolvedTheme: "light" | "dark";
  currentPage: 'passwords' | 'contacts' | 'notes' | 'settings'
  showPasswordModal: boolean
  showContactModal: boolean
  showNoteModal: boolean
  showExportModal: boolean
  showWarningModal: boolean
  editingPassword: TypePassword | null
  editingContact: TypeContact | null
  logged: boolean
  idUser: string
  username: string
  error: ErrorReceived
  showErrorModal: boolean
  
  setTheme: (theme: ThemeMode) => void;
  initTheme: () => void;
  changeCurrentPage: (value: 'passwords' | 'contacts' | 'notes' | 'settings') => void
  changeShowPasswordModal: (value: boolean) => void
  changeShowContactModal: (value: boolean) => void
  changeShowNoteModal: (value: boolean) => void
  changeShowExportModal: (value: boolean) => void
  changeShowWarningModal: (value: boolean) => void
  warningAction: (() => void) | null
  setWarningAction: (value: (() => void | Promise<void>) | null) => void
  changeEditingPassword: (password: TypePassword | null) => void
  changeEditingContact: (contact: TypeContact | null) => void
  setIsLoggedIn: (value: boolean) => void
  setIdUser: (value: string) => void
  setUsername: (value: string) => void
  setError: (value: ErrorReceived) => void
  changeShowErrorModal: (value: boolean) => void
  reset: () => void
}

type TypeInitialState = {
  theme: ThemeMode,
  resolvedTheme: "light" | "dark",
  currentPage: 'passwords' | 'contacts' | 'notes' | 'settings',
  showPasswordModal: boolean,
  showContactModal: boolean,
  showNoteModal: boolean,
  showExportModal: boolean,
  showWarningModal: boolean,
  warningAction: (() => void) | null,
  editingPassword: TypePassword | null,
  editingContact: TypeContact | null,
  logged: boolean,
  idUser: string,
  username: string,
  error: { title: string, message: string },
  showErrorModal: boolean,
}

const initialState: TypeInitialState = {
  idUser: "",
  username: "",
  error: { title: "", message: "" },
  theme: "system",
  resolvedTheme: "light",
  currentPage: 'passwords',
  showPasswordModal: false,
  showContactModal: false,
  showNoteModal: false,
  showExportModal: false,
  showWarningModal: false,
  showErrorModal: false,
  logged: false,
  warningAction: null,
  editingPassword: null,
  editingContact: null,
}

const useApp = create<App>()((set) => ({
  ...initialState,

  setTheme: (theme) => {
    localStorage.setItem(THEME_KEY, theme);

    const resolved =
      theme === "system" ? getSystemTheme() : theme;

    set({ theme, resolvedTheme: resolved });
    applyTheme(resolved);
  },

  initTheme: () => {
    const saved = localStorage.getItem(THEME_KEY) as ThemeMode | null;
    const theme = saved ?? "system";

    const resolved =
      theme === "system" ? getSystemTheme() : theme;

    set({ theme, resolvedTheme: resolved });
    applyTheme(resolved);
  },

  changeCurrentPage: (value) => set(() => ({ currentPage: value })),

  changeShowPasswordModal: (value) => set(() => ({ showPasswordModal: value })),
  changeShowContactModal: (value) => set(() => ({ showContactModal: value })),
  changeShowNoteModal: (value) => set(() => ({ showNoteModal: value })),
  changeShowExportModal: (value) => set(() => ({ showExportModal: value })),

  changeShowWarningModal: (value) => set(() => ({ showWarningModal: value })),

  setWarningAction: (value) => set(() => ({ warningAction: value })),

  changeEditingPassword: (value) => set(() => ({ editingPassword: value })),
  changeEditingContact: (value) => set(() => ({ editingContact: value })),
  
  setIsLoggedIn: (value) => set(() => ({ logged: value })),
  setIdUser: (value) => set(() => ({ idUser: value })),
  setUsername: (value) => set(() => ({ username: value })),

  setError: (value) => set(() => ({ error: value })),
  changeShowErrorModal: (value) => set(() => ({ showErrorModal: value })),

  reset: () => set({ ...initialState }),
    
}))

export default useApp