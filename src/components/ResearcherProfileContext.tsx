import React, { createContext, useContext } from 'react'

interface ResearcherProfileContextValue {
  staticDescription?: string
}

const ResearcherProfileContext = createContext<ResearcherProfileContextValue | undefined>(undefined)

export const ResearcherProfileProvider = (
  { value, children }: { value: ResearcherProfileContextValue; children: React.ReactNode }
) => {
  return (
    <ResearcherProfileContext.Provider value={value}>
      {children}
    </ResearcherProfileContext.Provider>
  )
}

export const useResearcherProfile = () => {
  const ctx = useContext(ResearcherProfileContext)
  return ctx ?? { staticDescription: undefined }
}
