import { ReactNode } from 'react'
import useApp from '../../hooks/useApp'

interface ButtonPageProps {
  sidebarOpen: boolean
  children: ReactNode
  text: string
  page: "passwords" | "contacts" | "notes" | "settings"
}

function LiButtonPage({sidebarOpen, text, page, children}: ButtonPageProps) {

  const { currentPage, changeCurrentPage } = useApp()

  return (
    <li>
    <button
        onClick={() => changeCurrentPage(page)}
        className={`px-2.5 py-2 flex items-center gap-1.5 cursor-pointer rounded-lg overflow-hidden flex-nowrap whitespace-nowrap w-full h-9.5 space-x-3 transition-colors ${
          currentPage === page
            ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
        }`}
      >
        <span className="h-5 w-5">
          { children }
        </span>
        {sidebarOpen && <span>{text}</span>}
      </button>
    </li>

  )
}

export default LiButtonPage